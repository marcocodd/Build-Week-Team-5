// Riferimenti DOM

const firstContainer = document.getElementById('first-container')

// Variabili

const artists = [
  'pink-floyd',
  'scorpion',
  'jennifer lopez',
  'europe',
  'metallica',
  'guns-n-roses',
  'ac-dc',
  'massimo-ranieri',
  'riccardo-cocciante',
  'claudio-baglioni',
  'slipknot',
  'shakira',
  'eminem',
  'busta-rhymes',
  'nwa',
  'queen',
  'linkin-park',
  'bullet-for-my-valentine',
  'gorgoroth',
  'iron-maiden',
  'cardi-b',
  '50-cents',
  'achille lauro',
  'martin-garrix',
  'gigi-dagostino',
  'bon-jovi',
  'daft-punk',
]

let songs = []

// Funzioni

const randomAlbum = function () {
  const randomIndex = Math.floor(Math.random() * artists.length)
  return artists[randomIndex]
}

const pageLoad = function () {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${randomAlbum()}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.data.length)
      fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${data.data[randomIndex].album.id}`
      )
        .then((result) => {
          if (result.ok) {
            return result.json()
          } else {
            throw new Error(result.status)
          }
        })
        .then((obj) => {
          firstContent(obj)
          songs = [...obj.tracks.data]
          console.log(obj.tracks.data[0].preview)
          console.log(songs)
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

const firstContent = function (album) {
  const contributors = function () {
    let text
    for (let i = 0; i < album.contributors.length; i++) {
      if (i === 0) {
        text = `<a href="./Artist.html?id=${album.contributors[i].id}" class="text-capitalize text-white link-underline link-underline-opacity-0">${album.contributors[i].name}</a>`
      } else {
        text += `, <a href="./Artist.html?id=${album.contributors[i].id}" class="text-capitalize text-white link-underline link-underline-opacity-0">${album.contributors[i].name}</a>`
      }
    }
    return text
  }
  const genres = function () {
    let text
    if (album.genres.data.length === 0) {
      text = `<a href="#" class="text-capitalize text-white link-underline link-underline-opacity-0">Altro</a>`
    } else {
      for (let i = 0; i < album.genres.data.length; i++) {
        if (i === 0) {
          text = `<a href="#" class="text-capitalize text-white link-underline link-underline-opacity-0">${album.genres.data[i].name}</a>`
        } else {
          text += `, <a href="#" class="text-capitalize text-white link-underline link-underline-opacity-0">${album.genres.data[i].name}</a>`
        }
      }
    }
    return text
  }
  const col3 = document.createElement('div')
  const col9 = document.createElement('div')
  col3.classList.add('col-3', 'py-4', 'align-self-center')
  col9.classList.add(
    'col-9',
    'py-3',
    'd-flex',
    'flex-column',
    'justify-content-between',
    'align-items-start'
  )
  col3.innerHTML = `
    <a href="./Album.html?id=${album.id}">
      <img src="${album.cover_xl}" alt="${album.md5_image}" class="w-100">
    </a>
  `
  col9.innerHTML = `
    <div class="d-flex justify-content-between align-self-stretch">
      <p class="m-0 badge">ALBUM</p>
      <a 
        href="#" 
        class="
          m-0
          badge
          bg-secondary-subtle
          text-secondary
          link-underline
          link-underline-opacity-0
        "
      >NASCONDI ANNUNCI</a>
    </div>
    <h1 class="display-custom fw-bold">
      <a 
        href="./Album.html?id=${album.id}"
        class="text-white link-underline link-underline-opacity-0"
      >${album.title}
      </a>
    </h1>
    <p>${contributors()}</p>
    <p>Genere: ${genres()}</p>
    <div class="d-flex align-items-center">
      <button
        class="btn btn-success text-black rounded-5 px-4 py-2 me-4"
        id="main-play-button"
        onclick="loadSong('${album.tracks.data[0].preview}', 0)"
      >
        Carica
      </button>
      <button class="btn-custom rounded-5 px-4 py-2 me-4">
        Salva
      </button>
      <a href="#" class="text-secondary"
        ><i class="fa-solid fa-ellipsis fs-4"></i
      ></a>
    </div>
  `
  firstContainer.appendChild(col3)
  firstContainer.appendChild(col9)
}

// Caricamento pagina

pageLoad()

document.getElementById('go-back').addEventListener('click', () => {
  console.log('indietro')
  history.back() // Torna alla pagina precedente
})

document.getElementById('go-forward').addEventListener('click', () => {
  console.log('avanti')
  history.forward() // Ricarica la pagina corrente
})
