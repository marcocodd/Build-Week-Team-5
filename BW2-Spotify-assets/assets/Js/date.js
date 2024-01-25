const friendlist = document.getElementById("friendlist");
const friendlistBtn = document.getElementById("friendlist-btn");
const contentPage = document.getElementsByTagName("main")[0];

friendlistBtn.addEventListener("click", function () {
  friendlist.classList.toggle("d-lg-none");
  friendlist.classList.toggle("d-lg-block");
  contentPage.classList.toggle("col-lg-7");
  contentPage.classList.toggle("col-lg-9");
  console.log(contentPage);
});

document.getElementById("go-back").addEventListener("click", () => {
  console.log("indietro");
  history.back(); // Torna alla pagina precedente
});

document.getElementById("go-forward").addEventListener("click", () => {
  console.log("avanti");
  history.forward(); // Ricarica la pagina corrente
});
