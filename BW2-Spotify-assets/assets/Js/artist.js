// Riferimenti DOM

const artistTitle = document.getElementById('artist')
const fansText = document.getElementById('fans')
const songContainer = document.getElementById('songs')
const main = document.getElementById('artist-main')

// Variabili

const artistId = new URLSearchParams(location.search).get('id')

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
      fansText.innerText = data.nb_fan
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
      console.log(data.data.length)
      songGen(data.data)
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

const songGen = function (array) {
  for (let i = 0; i < array.length; i++) {
    const songNumber = document.createElement('div')
    songNumber.classList.add(
      'col-3',
      'col-sm-2',
      'd-flex',
      'align-items-center',
      'justify-content-between'
    )
    const songTitle = document.createElement('div')
    songTitle.classList.add('col-5', 'col-sm-6', 'col-xl-7', 'col-xxl-6')
    const songRank = document.createElement('div')
    songRank.classList.add('col-3', 'col-xl-2', 'col-xxl-3')
    const songDuration = document.createElement('div')
    songDuration.classList.add('col-1')
    songNumber.innerHTML = `<span>${i + 1}</span><img src="${
      array[i].album.cover_xl
    }" alt="test" height="40px" />`
    songTitle.innerText = array[i].title
    songRank.innerText = array[i].rank
    songDuration.innerText = secToMin(array[i].duration)
    songContainer.appendChild(songNumber)
    songContainer.appendChild(songTitle)
    songContainer.appendChild(songRank)
    songContainer.appendChild(songDuration)
  }
}

// Caricamento pagina

pageLoad()
