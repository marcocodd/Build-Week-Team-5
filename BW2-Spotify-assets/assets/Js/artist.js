// Riferimenti DOM

const artistTitle = document.getElementById('artist-title')
const fansText = document.getElementById('fans')
const songContainer = document.getElementById('songs')
const main = document.getElementById('artist-main')
const artistSpan = document.getElementById('artist-like')
const artistImg = document.getElementById('img-like')
const audioSrc = document.getElementsByTagName('source')[0]

// Variabili

const artistId = new URLSearchParams(location.search).get('id')
let songs = []

// Funzioni

const pageLoad = function () {
  artistTitle.innerText = ''
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      console.log(data)
      artistTitle.innerText = data.name
      artistSpan.innerText = data.name
      artistImg.setAttribute('src', `${data.picture_xl}`)
      fansText.innerText = putDots(data.nb_fan)
      main.style.background = `url(${data.picture_xl})`
    })
    .catch((err) => {
      console.log(err)
    })
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`
  )
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      console.log(data.data)
      songGen(data.data, 5)
      const seeMore = document.createElement('div')
      seeMore.classList.add('col-12', 'p-0')
      seeMore.innerHTML = `<p style="cursor: pointer" class="m-0 badge">VISUALIZZA ALTRO</p>`
      songContainer.appendChild(seeMore)
      seeMore.addEventListener('click', function () {
        seeMore.classList.add('d-none')
        songGen(data.data, data.data.length, 5)
      })
      songs = [...data.data]
    })
    .catch((err) => {
      console.log(err)
    })
}

const secToMin = function (num) {
  const minutes = Math.floor(num / 60)
  let remainingSec = num % 60
  if (remainingSec < 10) {
    remainingSec += '0'
  }
  return minutes + ':' + remainingSec
}

const putDots = function (num) {
  let string = String(num)
  let first
  let second
  let third
  let fourth
  if (string.length === 4) {
    first = string.slice(0, 1)
    second = string.slice(string.length - 3)
    return first + '.' + second
  } else if (string.length === 5) {
    first = string.slice(0, 2)
    second = string.slice(string.length - 3)
    return first + '.' + second
  } else if (string.length === 6) {
    first = string.slice(0, 3)
    second = string.slice(string.length - 3)
    return first + '.' + second
  } else if (string.length === 7) {
    first = string.slice(0, 1)
    second = string.slice(1, 4)
    third = string.slice(string.length - 3)
    return first + '.' + second + '.' + third
  } else if (string.length === 8) {
    first = string.slice(0, 2)
    second = string.slice(2, 5)
    third = string.slice(string.length - 3)
    return first + '.' + second + '.' + third
  } else if (string.length === 9) {
    first = string.slice(0, 3)
    second = string.slice(3, 6)
    third = string.slice(string.length - 3)
    return first + '.' + second + '.' + third
  } else if (string.length === 10) {
    first = string.slice(0, 1)
    second = string.slice(1, 4)
    third = string.slice(4, 7)
    fourth = string.slice(string.length - 3)
    return first + '.' + second + '.' + third + '.' + fourth
  }
}

const songGen = function (array, length, n = 0) {
  for (let i = n; i < length; i++) {
    const songNumber = document.createElement('div')
    songNumber.classList.add(
      'col-3',
      'col-sm-2',
      'd-flex',
      'align-items-center',
      'justify-content-between',
      'text-secondary'
    )
    const songTitle = document.createElement('div')
    songTitle.classList.add('col-5', 'col-sm-6', 'col-xl-7', 'col-xxl-6')
    const songRank = document.createElement('div')
    songRank.classList.add('col-3', 'col-xl-2', 'col-xxl-3', 'text-secondary')
    const songDuration = document.createElement('div')
    songDuration.classList.add('col-1', 'text-secondary')
    songNumber.innerHTML = `
      <span>${i + 1}</span>
      <a href="./Album.html?id=${array[i].album.id}">
        <img src="${array[i].album.cover_xl}" alt="${
      array[i].album.md5_image
    }" height="40px" />
      </a>
    `
    songTitle.innerHTML = `<a href="#" onclick="loadSong('${array[i].preview}', ${i})" class="link-underline link-underline-opacity-0 text-white">${array[i].title}</a>`
    songRank.innerText = putDots(array[i].rank)
    songDuration.innerText = secToMin(array[i].duration)
    songContainer.appendChild(songNumber)
    songContainer.appendChild(songTitle)
    songContainer.appendChild(songRank)
    songContainer.appendChild(songDuration)
  }
}

// Caricamento pagina

pageLoad()
