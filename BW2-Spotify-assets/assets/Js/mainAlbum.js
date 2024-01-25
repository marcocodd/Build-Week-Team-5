// Funzione per la media dei colori

function getAverageColor(imageUrl, callback) {
  let img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageUrl;

  img.onload = function () {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let sumRed = 0,
      sumGreen = 0,
      sumBlue = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      sumRed += imageData[i];
      sumGreen += imageData[i + 1];
      sumBlue += imageData[i + 2];
    }

    let pixelCount = imageData.length / 4;
    let averageRed = sumRed / pixelCount;
    let averageGreen = sumGreen / pixelCount;
    let averageBlue = sumBlue / pixelCount;

    let averageColor = {
      red: Math.round(averageRed),
      green: Math.round(averageGreen),
      blue: Math.round(averageBlue),
    };

    callback(averageColor);
  };
}

// Funzione per applicare lo sfondo

function applyBackgroundColor(albumContainer, averageColor) {
  albumContainer.style.transition = "background-color 0.5s ease";
  albumContainer.style.backgroundColor = `rgb(${averageColor.red}, ${averageColor.green}, ${averageColor.blue})`;
}

// id e url per fetch e recupero id session storage se esistente
const urlMainAlbum = new URLSearchParams(window.location.search);
let idMainAlbum = urlMainAlbum.get("id");
const urlMainFetch = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const sessionStorageKey = sessionStorage.getItem('albumid')

if (sessionStorageKey){
  idMainAlbum = sessionStorageKey
}
fetch(urlMainFetch + idMainAlbum)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  .then((albumData) => {
    console.log(albumData);
    // Funzione per ottenere gli artisti dal formato dell'API
    const getContributors = function () {
      let text = "";
      for (let i = 0; i < albumData.contributors.length; i++) {
        if (i === 0) {
          text = `<a href="./Artist.html?id=${albumData.contributors[i].id}" class="text-capitalize text-white link-underline link-underline-opacity-0">${albumData.contributors[i].name}</a>`;
        } else {
          text += `, <a href="./Artist.html?id=${albumData.contributors[i].id}" class="text-capitalize text-white link-underline link-underline-opacity-0">${albumData.contributors[i].name}</a>`;
        }
      }
      return text;
    };

    // Funzione per ottenere i generi dal formato dell'API
    const getGenres = function () {
      let text = "";
      if (albumData.genres.data.length === 0) {
        text = `<a href="#" class="text-capitalize text-white link-underline link-underline-opacity-0">Altro</a>`;
      } else {
        for (let i = 0; i < albumData.genres.data.length; i++) {
          if (i === 0) {
            text = `<a href="#" class="text-capitalize text-white link-underline link-underline-opacity-0">${albumData.genres.data[i].name}</a>`;
          } else {
            text += `, <a href="#" class="text-capitalize text-white link-underline link-underline-opacity-0">${albumData.genres.data[i].name}</a>`;
          }
        }
      }
      return text;
    };

    // Funzione per calcolare la durata totale in minuti
    const calcolaMinutiTotali = function (tracks) {
      let totalDuration = 0;
      tracks.forEach((track) => {
        totalDuration += track.duration;
      });
      return Math.floor(totalDuration / 60);
    };

    // Popolare dinamicamente la pagina ALBUM
    const albumContainer = document.getElementById("main-card");
    albumContainer.innerHTML = `
    <div class="col-8 col-lg-3 py-4 text-center mx-auto mx-lg-0">
    <a href="./Album.html?id=${albumData.id}">
      <img src="${albumData.cover_xl}" alt="${
      albumData.md5_image
    }" class="w-100">
    </a>
  </div>
  <div class="col-lg-9 py-3 d-flex flex-column">
  <div class="d-flex flex-column flex-grow-1 justify-content-center">
    <div>
      <p class="m-0 d-none d-md-block">ALBUM</p>
    </div>
    <div>
    <h1 class="fw-bold">
      <a href="./Album.html?id=${
        albumData.id
      }" class="text-white link-underline link-underline-opacity-0">${
      albumData.title
    }</a>
    </h1>
    </div>
    </div>
    <div class="d-flex">
      <img src="${
        albumData.artist.picture_small
      }" alt="Foto Gruppo" class="rounded-circle me-2" width="30" height="30">
      <div class="d-flex">
        <p>${getContributors()} &middot;</p>
        <p>${albumData.release_date.slice(0, 4)} &middot;</p>
        <p>${albumData.nb_tracks} brani,</p>
        <p class="opacity-50 ms-2">${calcolaMinutiTotali(
          albumData.tracks.data
        )} min</p>
    </div>
  </div>
  </div>
  </div>
  </div>`;

    const albumImage = document.getElementById("albumImage");

    // Chiamata alla funzione per ottenere la media dei colori e applicare lo sfondo al main
    getAverageColor(albumData.cover_xl, function (averageColor) {
      // Applica lo sfondo al main
      const mainElement = document.getElementById("background-avg");
      applyBackgroundColor(mainElement, averageColor);
    });

    // // Chiamata alla funzione per ottenere la media dei colori e applicare lo sfondo
    // getAverageColor(albumData.cover_xl, function (averageColor) {
    //  applyBackgroundColor(albumContainer, averageColor);
    // });
  })
  .catch((error) => {
    console.log(error);
  });

document.getElementById("go-back").addEventListener("click", () => {
  console.log("indietro");
  history.back(); // Torna alla pagina precedente
});

document.getElementById("go-forward").addEventListener("click", () => {
  console.log("avanti");
  history.forward(); // Ricarica la pagina corrente
});

// //////////////////////////////CODICE FUNZIONANTE

// const urlMainAlbum = new URLSearchParams(window.location.search);
// const idMainAlbum = urlMainAlbum.get("id");
// const urlMainFetch = "https://striveschool-api.herokuapp.com/api/deezer/album/";

// // Caricamento dei dati dell'album
// fetch(urlMainFetch + idMainAlbum)
//  .then((response) => {
//   if (response.ok) {
//    return response.json();
//   } else {
//    throw new Error(response.status);
//   }
//  })
//  .then((albumData) => {
//   // Popolare dinamicamente la pagina ALBUM
//   const albumContainer = document.getElementById("main-card");
//   albumContainer.innerHTML = `
//       <div class="col-3 py-4 text-center align-self-center">
//         <a href="./Album.html?id=${albumData.id}">
//           <img src="${albumData.cover_xl}" alt="${albumData.md5_image}" class="w-100">
//         </a>
//       </div>
//       <div class="col-9 py-3 d-flex flex-column justify-content-center align-items-start">
//         <!-- Resto del codice... -->
//       </div>
//     `;

//   // Chiamata alla funzione per ottenere la media dei colori e applicare lo sfondo
//   getAverageColor(albumData.cover_xl, function (averageColor) {
//    applyBackgroundColor(albumContainer, averageColor);
//   });
//  })
//  .catch((error) => {
//   console.log(error);
//  });
