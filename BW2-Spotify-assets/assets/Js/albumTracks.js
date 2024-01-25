const urlAlbum = new URLSearchParams(window.location.search)

let idAlbum = urlAlbum.get('id')

const urlFetch = 'https://striveschool-api.herokuapp.com/api/deezer/album/'

const rowSongs = document.getElementById('songs')

let songs = []

const secToMin = function (num) {
  const minutes = Math.floor(num / 60)
  let remainingSec = num % 60
  if (remainingSec < 10) {
    remainingSec += '0'
  }
  return minutes + ':' + remainingSec
}

if (sessionStorageKey) {
  idAlbum = sessionStorageKey
}

fetch(urlFetch + idAlbum)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.status)
    }
  })
  .then((data) => {
    songs = data.tracks.data

    console.log('tracce', songs)

    for (let i = 0; i < songs.length; i++) {
      const newCol1 = document.createElement('div')
      const newCol2 = document.createElement('div')
      const newCol2_5 = document.createElement('div')
      const newCol3 = document.createElement('div')
      const newCol4 = document.createElement('div')
      newCol1.classList.add('col-1')
      newCol2.classList.add('col-6')
      newCol3.classList.add('col-4')
      newCol4.classList.add('col-1')
      newCol1.textContent = i + 1
      newCol2.innerHTML = `<a href="#" onclick="loadSong('${songs[i].preview}', ${i})" class="link-underline link-underline-opacity-0 text-white">${songs[i].title}</a>`
      newCol2_5.innerHTML = `<a href="./Artist.html?id=${songs[i].artist.id}" class="text-white link-underline link-underline-opacity-0">${songs[i].artist.name}</a>`
      newCol3.textContent = songs[i].rank
      newCol4.textContent = secToMin(songs[i].duration)

      rowSongs.appendChild(newCol1)
      rowSongs.appendChild(newCol2)
      newCol2.appendChild(newCol2_5)
      rowSongs.appendChild(newCol3)
      rowSongs.appendChild(newCol4)
    }
  })
  .catch((error) => {
    console.log(error)
  })
