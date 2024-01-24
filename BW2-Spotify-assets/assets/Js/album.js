const urlAlbum = new URLSearchParams(window.location.search);

const idAlbum = urlAlbum.get("id");

const urlFetch = "https://striveschool-api.herokuapp.com/api/deezer/album/";

fetch(urlFetch + idAlbum)
 .then((response) => {
  if (response.ok) {
   return response.json();
  } else {
   throw new Error(response.status);
  }
 })
 .then((data) => {
  console.log("oggetti Artista", data);
 })
 .catch((error) => {
  console.log(error);
 });
