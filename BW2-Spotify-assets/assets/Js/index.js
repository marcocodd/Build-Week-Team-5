// Riferimenti DOM

const firstContainer = document.getElementById('first-container')

// Variabili

let album = {}

// Funzioni

const pageLoad = function () {
  fetch('https://striveschool-api.herokuapp.com/api/deezer/album/7562962')
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      album = { ...data }
      firstContent(data)
      console.log(album)
    })
    .catch((err) => {
      console.log(err)
    })
}

const firstContent = function (album) {
  const contributors = function () {
    for (let i = 0; i < album.contributors.length; i++) {
      if (i === 0) {
        console.log(album.contributors[i].id)
        return `<a href="./Artist.html?id=${album.contributors[i].id}" class="text-white">${album.contributors[i].name}</a>`
      } else {
        return `, <a href="./Artist.html?id=${album.contributors[i].id}" class="text-white">${album.contributors[i].name}</a>`
      }
    }
  }
  const genres = function () {
    for (let i = 0; i < album.genres.data.length; i++) {
      if (i === 0) {
        console.log(album.genres.data[i].name)
        return album.genres.data[i].name
      } else {
        return ', ' + album.genres.data[i].name
      }
    }
  }
  const col3 = document.createElement('div')
  const col9 = document.createElement('div')
  col3.classList.add('col-3', 'py-4')
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
    <p class="m-0 badge">ALBUM</p>
    <h1 class="display-3 fw-bold">
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
      >
        Play
      </button>
      <button class="btn btn-dark rounded-5 px-4 py-2 me-4">
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
