const urlMainAlbum = new URLSearchParams(window.location.search);
const idMainAlbum = urlMainAlbum.get("id");
const urlMainFetch = "https://striveschool-api.herokuapp.com/api/deezer/album/";

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
    <div class="col-8 col-lg-3 py-4 text-center align-self-center mx-auto mx-lg-0">
    <a href="./Album.html?id=${albumData.id}">
      <img src="${albumData.cover_xl}" alt="${
      albumData.md5_image
    }" class="w-100">
    </a>
  </div>
  <div class="col-lg-9 py-3 d-flex flex-column justify-content-center align-items-start">
    <div>
      <p class="m-0 d-none d-md-block">ALBUM</p>
    </div>
    <h1 class="fw-bold">
      <a href="./Album.html?id=${
        albumData.id
      }" class="text-white link-underline link-underline-opacity-0">${
      albumData.title
    }</a>
    </h1>
    <div>
      <img src="${
        albumData.artist.picture_small
      }" alt="Foto Gruppo" class="rounded-circle" width="30" height="30">
      <p class="badge text-white text-white">
        <span>${getContributors()}</span> &middot;
        <span>${albumData.release_date.slice(0, 4)}</span> &middot;
        <span>${albumData.nb_tracks} brani,</span>
        <span class="opacity-50 ms-2">${calcolaMinutiTotali(
          albumData.tracks.data
        )} min</span>
      </p>
    </div>
  </div>

    `;
  })
  .catch((error) => {
    console.log(error);
  });

//////////////////////////////CODICE FUNZIONANTE
