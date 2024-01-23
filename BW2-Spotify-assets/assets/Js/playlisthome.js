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

const arrayTitlePlaylist = [
 "Top 50",
 "Indie",
 "This is Artist",
 "Ascoltato di recente",
 "Best of 2023",
];

console.log(arrayImg);

const createPlaylistImg = function () {
 for (let i = 0; i < 5; i++) {
  const Newcol = document.createElement("div");
  Newcol.classList.add("col-6", "col-md-3", "col-lg-3");
  //const imgElement = document.createElement("img");
  //imgElement.classList.add("img-fluid");
  randomIndex = Math.floor(Math.random() * arrayImg.length);
  //imgElement.src = arrayImg[randomIndex];
  //Newcol.appendChild(imgElement);
  Newcol.innerHTML = `<div class="card h-100">
  <div class= "position-relative">
  <img src= ${arrayImg[randomIndex]} class="card-img-top img-fluid" alt="image playlist">
  <a href="#" class="btn btn-primary btn-sm btn-success position-absolute bottom-0 end-0 rounded-4"><i class="fas fa-play text-black p-1"></i></a>
  </div>
  <div class="card-body">
  <h5 class="card-title">${arrayTitlePlaylist[i]}</h5>
  <p class="card-text">playlist più calda</p>`;
  arrayImg.splice(randomIndex, 1);

  rowPlaylist.appendChild(Newcol);
 }
};

createPlaylistImg();


