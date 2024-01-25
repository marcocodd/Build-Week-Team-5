const urlAlbum = new URLSearchParams(window.location.search);

let idAlbum = urlAlbum.get("id");

const urlFetch = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const rowSongs = document.getElementById("songs");

const secToMin = function (num) {
 const minutes = Math.floor(num / 60);
 let remainingSec = num % 60;
 if (remainingSec < 10) {
  remainingSec += "0";
 }
 return minutes + ":" + remainingSec;
};

if (sessionStorageKey) {
 idAlbum = sessionStorageKey;
}
  
fetch(urlFetch + idAlbum)
 .then((response) => {
  if (response.ok) {
   return response.json();
  } else {
   throw new Error(response.status);
  }
 })
 .then((data) => {
  const arrayTracks = data.tracks.data;

  console.log("tracce", arrayTracks);

  for (let i = 0; i < arrayTracks.length; i++) {
   const newCol1 = document.createElement("div");
   const newCol2 = document.createElement("div");
   const newCol2_5 = document.createElement("div");
   const newCol3 = document.createElement("div");
   const newCol4 = document.createElement("div");
   newCol1.classList.add("col-1");
   newCol2.classList.add("col-6");
   newCol3.classList.add("col-4");
   newCol4.classList.add("col-1");
   newCol1.textContent = i + 1;
   newCol2.textContent = arrayTracks[i].title;
   newCol2_5.textContent = arrayTracks[i].artist.name;
   newCol3.textContent = arrayTracks[i].rank;
   newCol4.textContent = secToMin(arrayTracks[i].duration);

   rowSongs.appendChild(newCol1);
   rowSongs.appendChild(newCol2);
   newCol2.appendChild(newCol2_5);
   rowSongs.appendChild(newCol3);
   rowSongs.appendChild(newCol4);
  }
 })
 .catch((error) => {
  console.log(error);
 });
