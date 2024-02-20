
// MENGGUNAKAN JQUERY


//KETIKA USER SEARCH DAN MENAMPILKAN HASIL CARDS

// $('.src-btn').on('click', function(){
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=77b053eb&s=' + $('.input-keyword').val(),
//     success: (result) => {
//       const movies = result.Search;
//       let cards = '';
//       movies.forEach((m) => {
//         cards += showcard(m);
//       });
  
//       $('.movie-container').html(cards);
  


// //KETIKA TOMBOL DETAIL DI KLIK


//       $('.modal-detail-button').on('click', function () {
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=77b053eb&i=' + $(this).data('imdbid'),
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);
  
//             $('.modal-body').html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });

// });






//MENGGUNAKAN FETCH


//ambil element tombol search

// const SearchBtn = document.querySelector('.src-btn');

// lalu kasih event

// SearchBtn.addEventListener('click',function(){


//   // MENGAMBIL DATA ATAU INPUTAN DARI USER


//   const inputKeyword = document.querySelector('.input-keyword');
// fetch('http://www.omdbapi.com/?apikey=77b053eb&s=' + inputKeyword.value)
// .then(response => response.json())
// .then(response => {
// const movies = response.Search;
// let cards ='';
// movies.forEach(m =>  cards += showcard(m));
// const movieContainer = document.querySelector('.movie-container');
// movieContainer.innerHTML = cards;


// //KETIKA TOMBOL DETAIL DI KLIK

// const modalDetail = document.querySelectorAll('.modal-detail-button');
// modalDetail.forEach(btn => {
// btn.addEventListener('click', function(){

// const imdbid = this.dataset.imdbid;
// fetch('http://www.omdbapi.com/?apikey=77b053eb&i=' + imdbid)
// .then(response => response.json())
// .then(m => {

//   const movieDetail = showMovieDetail(m); 
//   const modalBody = document.querySelector('.modal-body');
// modalBody.innerHTML = movieDetail;

  

// });
// });
// });

// });
// });
//menyimpan data ke card 















// //FETCH ASYNC DAN AWAIT


// //1.ambil element search btn

//KETIKA TOMBOL CARI DI KLIK



const listFilm = document.getElementById('list-film');

const SearchBtn = document.querySelector('.src-btn');
SearchBtn.addEventListener('click', async function(){
  try{const inputKeyword = document.querySelector('.input-keyword');

//2.buat var yang isinya mengambil data menggunakan fetch ke API omdb
//js ngga tau dibawah ini itu fungsi yang async atau bukan,jadi kita bisa memanfaatkan keyword async dan await
//caranya: kita kasih tau js dulu kalo func ini didalamnya bakalan ada sesuatu yang async,
//kalo ngga ngasih tau js menganggap kodenya sync semua

//buat var berisi func yang mengambil isi value
const movies = await getMovies(inputKeyword.value);

//buat lagi function untuk looping card/menumpuk card lalu simpan ke container
updateUI(movies);
listFilm.style.display = 'none';
} catch (err)   {
  alert(err);
}
});

// if Searchbtn === true maka, function beranda display none


// MENAMPILKAN FILM LIST DI BERANDA

// CARA
// 1.karena mau ambil data dari API jadi pake async func dan await 
// 2.hubungkan js dengan elemen di html tempat dimana menampilkan isi dengan DOM
// 3.buat perulangan dengan forEach untuk card 
// async function beranda() {
//   try {
//     let response = await fetch('http://www.omdbapi.com/?apikey=77b053eb&s=harry+potter');
//     let data = await response.json();
//     let display = document.getElementById("list-film");

//       data.Search.forEach((film) => {
//         // buat var untuk menyimpan card
//         let filmCard = `
//           <div class="col-md-4 mb-4 mt-5">
//             <div class="card">
//               <img src="${film.Poster}" class="card-img-top" alt="...">
//               <div class="card-body">
//                 <h5 class="card-title">${film.Title}</h5>
//                 <p class="card-text">${film.Plot}</p>
//                 <a href="#" class="btn btn-primary">Go somewhere</a>
//               </div>
//             </div>
//           </div>`;
//           // tampilkan di dalam html 
//         display.innerHTML += filmCard;
//       });
    
//     }
//   catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// // Panggil fungsi beranda setelah DOM selesai dimuat
// document.addEventListener("DOMContentLoaded", beranda);


//NOTE:HANDLING ERROR DI FETCH MENGGUNAKAN TRY DAN CATCH,



// AWAL UNTUK MENANGKAP VALUE DARI USER DAN MENAMPILKAN CARD


// 3.fungsi menyimpan fetch dan ketika func dijalankan akan mengembalikan objek berupa data

// DI FUNCTION KALO MENGEMBALIKAN NILAI PAKAI RETURN


// START







// END


// 4.DAN FUNGSI MENAMPILKAN CARD
// MEMANGGIL API

function getMovies(keyword){
  return fetch('http://www.omdbapi.com/?apikey=77b053eb&s=' + keyword)
  .then(response => {
 if(!response.ok){
  throw new Error(response.statusText);
 }
 return response.json();
  })
  .then(response =>{
   

    //NOTE: throw untuk melempar error ke catch
if(response.Response === 'False'){
  throw new Error (response.Error);
}
return response.Search;
   });
}


function updateUI(movies){
  let cards ='';
movies.forEach(m =>  cards += showcard(m));
const movieContainer = document.querySelector('.movie-container');
movieContainer.innerHTML = cards;

}




//MENAMPILKAN DETAIL KETIKA TOMBOL DETAIL DI KLIK

//EVENT BINDING: NGASIH EVENT KE ELEMENT YANG AWALNYA BELUM ADA,TAPI KETIKA DIA ADA EVENTNYA TETAP BISA BERJALAN
//caranya:simpan event ke element document



document.addEventListener('click',async function(e){
if(e.target.classList.contains('modal-detail-button')){
  //dapetin dulu detailnya,lalu tampilkan ke dalam func updateuidetail
  const imdbid = e.target.dataset.imdbid;
  const movieDetail = await getMoviesDetail(imdbid);
  updateUIDetail(movieDetail);
}
});


function getMoviesDetail (imdbid){
   return fetch('http://www.omdbapi.com/?apikey=77b053eb&i=' + imdbid)
.then(response => response.json())
.then(m => m);
}



function updateUIDetail(m){
  const movieDetail = showMovieDetail(m); 
  const modalBody = document.querySelector('.modal-body');
modalBody.innerHTML = movieDetail;
}








function showcard(m) {
  return `<div class="col-md-4 my-3">

    <div class="card">
        <img src="${m.Poster}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetail" data-imdbid="${m.imdbID}">show details</a>
        </div>
      </div>
</div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${m.Poster}" class="img-fluid" />
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item active"><h4>${m.Title} (${m.Year}(2023)</h4></li>
                <li class="list-group-item"><strong>Author:</strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Plot:</strong> ${m.Plot}</li>
                <li class="list-group-item"><strong>Genre:</strong> ${m.Genre}</li>
                <li class="list-group-item"><strong>Actor:</strong> ${m.Actors}</li>
              </ul>
            </div>
          </div>
        </div>`;
}








//CONTOH ASYNC DAN AWAIT,kita ngga bisa pakai then di async func 
//DENGAN PROMISE





// function cobaPromise(){
//   return new Promise ( (resolve, reject) => {
//     const waktu = 5000;

//     if(waktu < 5000){
//     setTimeout(()=>{
//       resolve('selesai')
//     }, waktu);
//     } else{
//       reject('kelamaan');
//     }
//   });
// }

// const coba = cobaPromise();

// ERROR HANDLING DENGAN THEN CATCH/DENGAN TRY DAN CATCH

// .then(() => console.log(coba))
// .catch(() => console.log(coba));



//ERROR HANDLING 
//TRY = RESOLVE
//CATCH = REJECT
//MENGGUNKANA KEDUANYA KETIKA DI FUNC ADA ASYNC DAN AWAIT

//   async function cobaasync(){
//     try{
//   const coba = await cobaPromise();
//   console.log(coba);}
//   catch(err){
//     console.error(err);
//   }
// }

// cobaasync();