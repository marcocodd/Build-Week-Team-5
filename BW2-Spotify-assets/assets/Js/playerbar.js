// Riferimenti DOM

const audio = document.getElementsByTagName('audio')[0]

const playBtn = document.getElementById('playerbar-play')
const playIcon = document.getElementById('playerbar-playicon')

const randomizeBtn = document.getElementById('randomize')
const randomizeDot = document.getElementsByClassName('active-dot')[0]
const repeatBtn = document.getElementById('repeat')
const repeatDot = document.getElementsByClassName('active-dot')[1]

const currentTime = document.getElementById('current-time')
const totalTime = document.getElementById('total-time')
const progressBar = document.getElementById('progress-bar-inner')
const progressBarContainer = document.getElementById('progress-bar')

const volumeBar = document.getElementById('volume-bar-inner')
const volumeBarContainer = document.getElementById('volume-bar')
const volumeIcon = document.getElementById('volume-icon')

// Variabili

let isPlaying = false
let played
let volume = 100

// Funzioni

const timerInMinutes = function (num) {
  const minutes = Math.floor(num / 60)
  let remainingSec = num % 60
  if (remainingSec < 10) {
    remainingSec = '0' + remainingSec
  }
  return minutes + ':' + remainingSec
}

// Event-listeners

audio.addEventListener('timeupdate', function () {
  currentTime.innerText = timerInMinutes(Math.floor(audio.currentTime))
  totalTime.innerText = timerInMinutes(Math.floor(audio.duration))
  played = (audio.currentTime / audio.duration) * 100
  progressBar.style.width = `${played}%`
})

audio.onloadedmetadata = () => {
  currentTime.innerText = timerInMinutes(Math.floor(audio.currentTime))
  totalTime.innerText = timerInMinutes(Math.floor(audio.duration))
}

playBtn.addEventListener('click', function () {
  if (!isPlaying) {
    audio.play()
    isPlaying = true
  } else if (isPlaying) {
    audio.pause()
    isPlaying = false
  }
  playIcon.classList.toggle('fa-play')
  playIcon.classList.toggle('fa-pause')
})

progressBarContainer.addEventListener('click', function (e) {
  let bcr = this.getBoundingClientRect()
  progressBar.style.width = `${((e.clientX - bcr.left) / bcr.width) * 100}%`
  played = ((e.clientX - bcr.left) / bcr.width) * 100
  audio.currentTime = (played / 100) * audio.duration
})

volumeBarContainer.addEventListener('click', function (e) {
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
  console.log(volume, audio.volume)
})

volumeIcon.addEventListener('click', function () {
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
