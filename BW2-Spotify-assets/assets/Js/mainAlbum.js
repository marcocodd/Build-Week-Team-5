const urlAlbum = new URLSearchParams(window.location.search);
const idAlbum = urlAlbum.get("id");
const urlFetch = "https://striveschool-api.herokuapp.com/api/deezer/album/";

// Funzione per calcolare il colore medio di un'immagine
const getAverageColor = function (img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Ottieni l'immagine dei dati pixel
  const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

  // Calcola il colore medio
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    totalR += imageData[i];
    totalG += imageData[i + 1];
    totalB += imageData[i + 2];
  }

  const avgR = Math.floor(totalR / (imageData.length / 4));
  const avgG = Math.floor(totalG / (imageData.length / 4));
  const avgB = Math.floor(totalB / (imageData.length / 4));

  return `rgb(${avgR}, ${avgG}, ${avgB})`;
};

fetch(urlFetch + idAlbum)
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
  <div class="col-3 py-4 text-center align-self-center">
    <a href="./Album.html?id=${albumData.id}">
      <img id="album-image" src="${albumData.cover_xl}" alt="${
      albumData.md5_image
    }" class="w-100">
    </a>
  </div>
  <div class="col-9 py-3 d-flex flex-column justify-content-center align-items-start">
    <div>
      <p class="m-0 badge ">ALBUM</p>
    </div>
    <h1 class="fw-bold">
      <a href="./Album.html?id=${
        albumData.id
      }" class="text-white link-underline link-underline-opacity-0">${
      albumData.title
    }</a>
    </h1>
    <div class="text-end">
      <img src="${
        albumData.artist.picture_small
      }" alt="Foto Gruppo" class="rounded-circle" width="30" height="30">
      <p class="badge bg-dark text-white text-white smaller-text badge-sm">
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
    // Ottieni il colore medio dell'immagine e imposta lo sfondo della pagina
    const albumImage = document.getElementById("album-image");
    albumImage.onload = function () {
      const averageColor = getAverageColor(albumImage);
      document.body.style.background = averageColor;
    };
  })
  .catch((error) => {
    console.log(error);
  });

//////////////////////////////CODICE FUNZIONANTE
