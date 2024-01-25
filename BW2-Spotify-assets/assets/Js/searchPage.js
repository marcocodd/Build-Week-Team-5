// riferimento row

const rowSearch = document.getElementById("row-search");

// creo un array con le immagini per velocizzare

const arraySearchImg = [
 "BW2-Spotify-assets/assets/imgs/search/image-1.jpeg",
 "BW2-Spotify-assets/assets/imgs/search/image-2.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-3.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-4.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-5.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-6.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-7.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-8.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-9.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-10.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-11.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-12.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-13.jpeg",
 "BW2-Spotify-assets/assets/imgs/search/image-14.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-15.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-16.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-17.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-18.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-19.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-20.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-22.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-23.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-24.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-25.jpeg",
 "BW2-Spotify-assets/assets/imgs/search/image-26.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-27.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-28.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-29.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-30.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-31.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-32.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-33.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-34.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-35.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-36.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-38.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-39.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-40.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-41.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-42.png",
 "BW2-Spotify-assets/assets/imgs/search/image-43.png",
 "BW2-Spotify-assets/assets/imgs/search/image-44.png",
 "BW2-Spotify-assets/assets/imgs/search/image-45.png",
 "BW2-Spotify-assets/assets/imgs/search/image-46.jpeg",
 "BW2-Spotify-assets/assets/imgs/search/image-47.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-48.jpeg",
 "BW2-Spotify-assets/assets/imgs/search/image-49.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-50.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-51.jpg",
 "BW2-Spotify-assets/assets/imgs/search/image-52.jpg",
];

const creatSearchCards = function () {
 for (let i = 0; i < arraySearchImg.length; i++) {
  const colImg = document.createElement("div");
  colImg.classList.add("col-6", "col-md-4", "col-lg-2");

  colImg.innerHTML = `
    <img src=${arraySearchImg[i]} class="img-thumbnail pointer" style= min-width:-webkit-fill-available alt="immagine search">
`;
  rowSearch.appendChild(colImg);
 }
};

creatSearchCards();

// Dichiarazioni di variabili
const inputSearch = document.getElementById("search-bar");
const urlFetch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// funzione rimozione caratteri speciali ricerca
const removeAccents = function (str) {
  let accents = str.split('')
  let accentsOut = []
  let accentsLength = str.length
  const accentedChars =
    'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëÇçðÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž'
  const normalChars =
    'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeCcdDIIIIiiiiUUUUuuuuNnSsYyyZz'
  for (let i = 0; i < accentsLength; i++) {
    if (accentedChars.indexOf(accents[i]) !== -1) {
      accentsOut[i] = normalChars.substr(accentedChars.indexOf(accents[i]), 1)
    } else {
      accentsOut[i] = accents[i]
    }
  }
  accentsOut = accentsOut.join('')
  return accentsOut
}


// Funzione di ricerca


const searchFunction = function () {
 const searchWord = removeAccents(inputSearch.value);
 console.log(searchWord);
 if (searchWord === "") {
  return;
 }
 fetch(urlFetch + searchWord)
  .then((response) => {
   if (response.ok) {
    return response.json();
   } else {
    throw new Error(response.status);
   }
  })
  .then((result) => {
   console.log(result);
   for (let i = 0; i < result.data.length; i++) {
    const Newcol = document.createElement("div");
    Newcol.classList.add("col-6", "col-md-4", "col-lg-4", "col-xl-3");

    Newcol.innerHTML = `<div class="card h-100">
        <div class= "position-relative">
        <img src= ${result.data[i].album.cover_xl} id =${result.data[i].album.id} onclick='saveIdSessionStorage(${result.data[i].album.id})' class="card-img-top" alt="image playlist">
        <a href="#" class="btn btn-success rounded-5 d-flex justify-content-center align-items-center p-0 play-button position-absolute bottom-5 end-5 opacity-0"><i class="fas fa-play text-black fs-5"></i></a>
        </div>
        <div class="card-body">
        <h6 class="card-title">${result.data[i].artist.name}</h6>
        <p class="card-text">${result.data[i].title}</p>`;
    rowSearch.appendChild(Newcol);
   }
   hoverButtonPlay();
  })
  .catch((error) => {
   console.log(error);
  });
};

// salvo l' id delle card (album) nel session storage con il click
const saveIdSessionStorage = function (id) {
 sessionStorage.setItem("albumid", id);
 window.location.href = "./Album.html";
};


//funzione hover play buttons

const hoverButtonPlay = function () {
 const cards = document.getElementsByClassName("card");
 const buttonsPlay = document.getElementsByClassName("play-button");

 for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("mouseover", function () {
   buttonsPlay[i].classList.add("opacity-100", "fade");
  });

  cards[i].addEventListener("mouseout", function () {
   buttonsPlay[i].classList.remove("opacity-100", "fade");
  });
 }
};

// aggiunta pressione invio per ricerca

inputSearch.addEventListener("keyup", function (event) {
 if (event.key === "Enter") {
  rowSearch.innerHTML = "";
  searchFunction();
 }
});
