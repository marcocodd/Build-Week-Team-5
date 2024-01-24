const friendlist = document.getElementById('friendlist')
const friendlistBtn = document.getElementById('friendlist-btn')
const contentPage = document.getElementsByTagName('main')[0]

friendlistBtn.addEventListener('click', function () {
  friendlist.classList.toggle('d-lg-none')
  friendlist.classList.toggle('d-lg-block')
  contentPage.classList.toggle('col-lg-7')
  contentPage.classList.toggle('col-lg-9')
  console.log(contentPage)
})
