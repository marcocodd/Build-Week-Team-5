const rowPlaylist = document.getElementById('row-playlist')

const arrayImg = [
  'BW2-Spotify-assets/assets/imgs/main/image-1.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-2.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-3.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-4.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-5.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-6.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-7.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-8.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-9.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-10.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-11.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-12.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-13.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-14.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-15.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-16.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-17.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-18.jpg',
  'BW2-Spotify-assets/assets/imgs/main/image-19.jpg',
]

const arrayTitlePlaylist = [
 "Top 50",
 "Indie",
 "This is Artist",
 "Ascoltato di recente",
 "Best of 2023",
 "Estate",
 "Sotto la doccia",
 "Caffè????",
];

// const hoverIn = function (event) {
//  const buttonPlay = event.querySelector("play-button");
//  console.log(event);
//  console.log(buttonPlay);
//  buttonPlay.classList.add("opacity-100");
//  buttonPlay.classList.remove("opacity-0");
// };

// const hoverOut = function (event) {
//  const buttonPlay = event.querySelector("play-button");
//  console.log(event);
//  console.log(buttonPlay);
//  buttonPlay.classList.remove("opacity-100");
//  buttonPlay.classList.add("opacity-0");
// };

const createPlaylistImg = function () {
 for (let i = 0; i < arrayTitlePlaylist.length; i++) {
  const Newcol = document.createElement("div");
  Newcol.classList.add("col-6", "col-md-4", "col-lg-3");
  // randomIndex = Math.floor(Math.random() * arrayImg.length);

  Newcol.innerHTML = `<div class="card h-100">
        <div class= "position-relative">
        <img src= ${arrayImg[i]} class="card-img-top" alt="image playlist">
        <a href="#" class="btn btn-success rounded-5 d-flex justify-content-center align-items-center p-0 play-button position-absolute bottom-5 end-5 opacity-0"><i class="fas fa-play text-black fs-5"></i></a>
        </div>
        <div class="card-body">
        <h6 class="card-title">${arrayTitlePlaylist[i]}</h6>
        <p class="card-text">playlist</p>`;
  // arrayImg.splice(randomIndex, 1);

  rowPlaylist.appendChild(Newcol);
 }
};

createPlaylistImg()

const hoverButtonPlay = function () {
  const cards = document.getElementsByClassName('card')
  const buttonsPlay = document.getElementsByClassName('play-button')

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mouseover', function () {
      buttonsPlay[i].classList.add('opacity-100', 'fade')
    })

    cards[i].addEventListener('mouseout', function () {
      buttonsPlay[i].classList.remove('opacity-100', 'fade')
    })
  }
}

hoverButtonPlay()
