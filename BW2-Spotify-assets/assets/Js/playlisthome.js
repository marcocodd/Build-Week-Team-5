const rowPlaylist = document.getElementById("row-playlist");

const arrayImg = [
 "BW2-Spotify-assets/assets/imgs/main/image-1.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-2.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-3.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-4.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-5.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-6.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-7.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-8.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-9.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-10.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-11.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-12.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-13.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-14.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-15.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-16.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-17.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-18.jpg",
 "BW2-Spotify-assets/assets/imgs/main/image-19.jpg",
];

console.log(arrayImg);

const createPlaylistImg = function () {
 for (let i = 0; i < 6; i++) {
  const Newcol = document.createElement("div");
  Newcol.classList.add("col");
  const imgElement = document.createElement("img");
  imgElement.classList.add("img-fluid");
  randomIndex = Math.floor(Math.random() * arrayImg.length);
  imgElement.src = arrayImg[randomIndex];
  arrayImg.splice(randomIndex, 1);
  Newcol.appendChild(imgElement);
  rowPlaylist.appendChild(Newcol);
 }
};

createPlaylistImg();
