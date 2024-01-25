// id="search-container">
// id="row-search">

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
    <img src=${arraySearchImg[i]} class="img-thumbnail" alt="immagine search">
`;
  rowSearch.appendChild(colImg);
 }
};

creatSearchCards();
