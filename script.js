const container = document.querySelector('.container');
const count=document.getElementById('count');
const price=document.getElementById('price');
const select=document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');

       calculateTotal();
       
    }
});

select.addEventListener('change',function(e){
    calculateTotal();
})

function calculateTotal(){
    let selectedSeats=container.querySelectorAll('.seat.selected'); // Seçili seatler

    const selectedSeatsArray=[...selectedSeats];
    const allSeatsArray=[...seats];

    // map() metodu, bir dizinin her bir elemanı için belirli bir işlem yapmak ve bu işlem sonucunda yeni bir dizi oluşturmak için kullanılır. Bu metot, orijinal diziyi değiştirmez, sadece yeni bir dizi döndürür.
    // Seçilen elemanların listesini almak için:
    let selectedSeatIndexes=selectedSeatsArray.map(function(seat){
        return allSeatsArray.indexOf(seat); //[1,3,5] gibi indeks değerleri yazar.
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText=selectedSeatCount; // count spanına seçili seat sayısını gönderdik.
    price.innerText=selectedSeatCount*select.value; // price spanına seçili filme göre (select.value 'den hangi film seçili olduğunu aldık) fiyat bilgisi gönderdik.
    
    saveToLocalStorage(selectedSeatIndexes);
}

function Price(count, moviePrice) {
 let totalPrice=0;
    if (count == 1) {
        totalPrice = moviePrice;
    } else {
        for (let i = 0; i < count; i++) {
            totalPrice = totalPrice + moviePrice;
        }
    }
    return totalPrice;
}

function disableSelect(selectedSeatCount){
    if(selectedSeatCount>0){
        document.getElementById('movie').disabled=true;
    }else{
        document.getElementById('movie').disabled=false;
    }
}

function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex!=null){
        select.selectedIndex=selectedMovieIndex;
    }

    if(selectedSeats!=null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }
}

function saveToLocalStorage(indexes){
    localStorage.setItem('selectedSeats',JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}