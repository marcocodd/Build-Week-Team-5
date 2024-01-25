// Riferimenti DOM

const audio = document.getElementsByTagName('audio')[0]
const songData = document.getElementById('song-data')

const playBtn = document.getElementById('playerbar-play')
const playIcon = document.getElementById('playerbar-playicon')
const mainPlayBtn = document.getElementById('main-play-button')
const mainPlayIcon = document.getElementById('main-playicon')

const randomizeBtn = document.getElementById('randomize')
const randomizeDot = document.getElementsByClassName('active-dot')[0]
const repeatBtn = document.getElementById('repeat')
const repeatDot = document.getElementsByClassName('active-dot')[1]

const playerbarBack = document.getElementById('playerbar-back')
const playerbarNext = document.getElementById('playerbar-next')

const currentTime = document.getElementById('current-time')
const totalTime = document.getElementById('total-time')
const progressBar = document.getElementById('progress-bar-inner')
const progressBarContainer = document.getElementById('progress-bar')

const volumeBar = document.getElementById('volume-bar-inner')
const volumeBarContainer = document.getElementById('volume-bar')
const volumeBtn = document.getElementById('volume-button')
const volumeIcon = document.getElementById('volume-icon')

// Variabili

let isPlaying = false
let played
let volume = 100
let index = 0

// Funzioni

const timerInMinutes = function (num) {
  const minutes = Math.floor(num / 60)
  let remainingSec = num % 60
  if (remainingSec < 10) {
    remainingSec = '0' + remainingSec
  }
  return minutes + ':' + remainingSec
}

const loadSong = function (mp3, i) {
  playBtn.disabled = false
  mainPlayBtn.disabled = false
  randomizeBtn.disabled = false
  repeatBtn.disabled = false
  playerbarBack.disabled = false
  playerbarNext.disabled = false
  volumeBtn.disabled = false
  if (audio.muted) {
    volumeBar.style.width = `0%`
  } else {
    volumeBar.style.width = `${volume}%`
  }

  audioSrc.setAttribute('src', mp3)
  audio.load()
  if (!isPlaying) {
    playIcon.classList.add('fa-play')
    playIcon.classList.remove('fa-pause')
    mainPlayIcon.classList.add('fa-play')
    mainPlayIcon.classList.remove('fa-pause')
    audio.pause()
  } else {
    playIcon.classList.add('fa-pause')
    playIcon.classList.remove('fa-play')
    mainPlayIcon.classList.add('fa-pause')
    mainPlayIcon.classList.remove('fa-play')
    audio.play()
  }
  progressBar.style.width = '0%'
  console.log(songs[i])
  songData.innerHTML = `
    <div class="h-100 d-flex w-100">
      <a href="./Album.html?id=${songs[i].album.id}">
        <img
          src="${songs[i].album.cover_xl}"
          alt="${songs[i].album.md5_image}"
          class="h-100"
      /></a>
      <div
        class="d-flex flex-column align-items-start justify-content-center ms-2"
      >
        <p class="m-0 mb-1 d-inline">
        ${songs[i].title}
        </p>
        <p class="m-0 p-0 fw-normal badge opacity-75 d-inline">
          <a
            href=".Artist.html?id=${songs[i].artist.id}"
            class="text-white link-underline link-underline-opacity-0"
            >${songs[i].artist.name}</a
          >
        </p>
      </div>
    </div>
    <a href="#" class="text-white">
      <i class="bi bi-suit-heart"></i>
    </a>
  `
  songData.classList.remove('d-none')
  songData.classList.add('d-flex')
  index = i
}

// Event-listeners

audio.addEventListener('timeupdate', function () {
  currentTime.innerText = timerInMinutes(Math.floor(audio.currentTime))
  totalTime.innerText = timerInMinutes(Math.floor(audio.duration))
  played = (audio.currentTime / audio.duration) * 100
  progressBar.style.width = `${played}%`
  if (audio.ended) {
    progressBar.style.width = '0%'
    if (randomizeBtn.classList.contains('text-success')) {
      index = Math.floor(Math.random() * songs.length)
      loadSong(songs[index].preview, index)
    } else if (index === songs.length - 1) {
      index = 0
      loadSong(songs[index].preview, index)
    } else {
      index++
      loadSong(songs[index].preview, index)
    }
    audio.play()
  }
})

audio.onloadedmetadata = () => {
  currentTime.innerText = timerInMinutes(Math.floor(audio.currentTime))
  totalTime.innerText = timerInMinutes(Math.floor(audio.duration))
}

playBtn.addEventListener('click', function () {
  if (!isPlaying) {
    audio.play()
    isPlaying = true
  } else {
    audio.pause()
    isPlaying = false
  }
  playIcon.classList.toggle('fa-play')
  playIcon.classList.toggle('fa-pause')
  mainPlayIcon.classList.toggle('fa-play')
  mainPlayIcon.classList.toggle('fa-pause')
})

mainPlayBtn.addEventListener('click', function () {
  if (playBtn.disabled) {
    loadSong(songs[index].preview, index)
    isPlaying = true
    audio.play()
  } else if (!isPlaying) {
    audio.play()
    isPlaying = true
  } else {
    audio.pause()
    isPlaying = false
  }
  playIcon.classList.toggle('fa-play')
  playIcon.classList.toggle('fa-pause')
  mainPlayIcon.classList.toggle('fa-play')
  mainPlayIcon.classList.toggle('fa-pause')
})

progressBarContainer.addEventListener('click', function (e) {
  if (!playBtn.disabled) {
    let bcr = this.getBoundingClientRect()
    progressBar.style.width = `${((e.clientX - bcr.left) / bcr.width) * 100}%`
    played = ((e.clientX - bcr.left) / bcr.width) * 100
    audio.currentTime = (played / 100) * audio.duration
  }
})

volumeBarContainer.addEventListener('click', function (e) {
  if (!playBtn.disabled) {
    let bcr = this.getBoundingClientRect()
    if (Math.round(((e.clientX - bcr.left) / bcr.width) * 100) === -0) {
      volume = 0
      volumeBar.style.width = `0%`
    } else {
      volume = Math.round(((e.clientX - bcr.left) / bcr.width) * 100)
      volumeBar.style.width = `${((e.clientX - bcr.left) / bcr.width) * 100}%`
    }
    if (volume <= 50 && volume > 20) {
      volumeIcon.classList.remove('fa-volume-high')
      volumeIcon.classList.add('fa-volume-low')
      volumeIcon.classList.remove('fa-volume-off')
      volumeIcon.classList.remove('fa-volume-xmark')
    } else if (volume <= 20 && volume > 0) {
      volumeIcon.classList.remove('fa-volume-high')
      volumeIcon.classList.remove('fa-volume-low')
      volumeIcon.classList.add('fa-volume-off')
      volumeIcon.classList.remove('fa-volume-xmark')
    } else if (volume === 0) {
      volumeIcon.classList.remove('fa-volume-high')
      volumeIcon.classList.remove('fa-volume-low')
      volumeIcon.classList.remove('fa-volume-off')
      volumeIcon.classList.add('fa-volume-xmark')
    } else {
      volumeIcon.classList.add('fa-volume-high')
      volumeIcon.classList.remove('fa-volume-low')
      volumeIcon.classList.remove('fa-volume-off')
      volumeIcon.classList.remove('fa-volume-xmark')
    }
    audio.volume = volume / 100
  }
})

volumeBtn.addEventListener('click', function () {
  if (!audio.muted) {
    audio.muted = true
    volumeIcon.classList.remove('fa-volume-high')
    volumeIcon.classList.remove('fa-volume-low')
    volumeIcon.classList.remove('fa-volume-off')
    volumeIcon.classList.add('fa-volume-xmark')
    volumeBar.style.width = `0%`
  } else {
    audio.muted = false
    volumeBar.style.width = `${volume}%`
    if (volume <= 50 && volume > 20) {
      volumeIcon.classList.remove('fa-volume-high')
      volumeIcon.classList.add('fa-volume-low')
      volumeIcon.classList.remove('fa-volume-off')
      volumeIcon.classList.remove('fa-volume-xmark')
    } else if (volume <= 20 && volume > 0) {
      volumeIcon.classList.remove('fa-volume-high')
      volumeIcon.classList.remove('fa-volume-low')
      volumeIcon.classList.add('fa-volume-off')
      volumeIcon.classList.remove('fa-volume-xmark')
    } else if (volume === 0) {
      volumeIcon.classList.remove('fa-volume-high')
      volumeIcon.classList.remove('fa-volume-low')
      volumeIcon.classList.remove('fa-volume-off')
      volumeIcon.classList.add('fa-volume-xmark')
    } else {
      volumeIcon.classList.add('fa-volume-high')
      volumeIcon.classList.remove('fa-volume-low')
      volumeIcon.classList.remove('fa-volume-off')
      volumeIcon.classList.remove('fa-volume-xmark')
    }
  }
})

repeatBtn.addEventListener('click', function () {
  repeatBtn.classList.toggle('text-success')
  repeatBtn.classList.toggle('opacity-100')
  repeatDot.classList.toggle('d-none')
  if (!audio.loop) {
    audio.loop = true
  } else {
    audio.loop = false
  }
})

randomizeBtn.addEventListener('click', function () {
  randomizeBtn.classList.toggle('text-success')
  randomizeBtn.classList.toggle('opacity-100')
  randomizeDot.classList.toggle('d-none')
})

playerbarNext.addEventListener('click', function () {
  if (randomizeBtn.classList.contains('text-success')) {
    index = Math.floor(Math.random() * songs.length)
    loadSong(songs[index].preview, index)
  } else if (index === songs.length - 1) {
    index = 0
    loadSong(songs[index].preview, index)
  } else {
    index++
    loadSong(songs[index].preview, index)
  }
})

playerbarBack.addEventListener('click', function () {
  if (index === 0) {
    loadSong(songs[index].preview, index)
  } else {
    index--
    loadSong(songs[index].preview, index)
  }
})
