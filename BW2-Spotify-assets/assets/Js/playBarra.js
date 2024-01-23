///////////////// BARRA RIPRODUZIONE /////////////////

const progressBar = document.getElementById("progress-bar-inner");
const playPauseButton = document.getElementById("play-pause");
const currentTimeElement = document.getElementById("current-time");
const timerElement = document.getElementById("timer");
let isPlaying = false;
let totalTime = 222;
let currentTime = 0;

// Funzione per alternare tra play e pausa
const togglePlayPause = function () {
  isPlaying = !isPlaying;

  if (isPlaying) {
    play();
  } else {
    pause();
  }
};

// Funzione per simulare la riproduzione della canzone
const play = function () {
  progressBar.style.animationPlayState = "running";
  progressBar.style.width = "0";
  updateTimer(); // Inizia a monitorare il tempo trascorso
  playPauseButton.innerHTML = '<i class="fas fa-pause-circle mx-2"></i>';
};
progressBar.style.width = "0";

// Funzione per simulare la pausa della canzone
const pause = function () {
  progressBar.style.animationPlayState = "paused";
  playPauseButton.innerHTML = '<i class="fas fa-play-circle mx-2"></i>';
};

// Funzione per riavvolgere la canzone
const rewind = function () {
  currentTime = 0;
  updateTimerDisplay();
  progressBar.style.width = "0";
  progressBar.style.animationPlayState = "paused";
};

// Funzione per avanzare velocemente la canzone
const fastForward = function () {
  currentTime = totalTime;
  updateTimerDisplay();
  progressBar.style.width = "100%";
  progressBar.style.animationPlayState = "paused";
};

// Funzione per aggiornare il timer in base al tempo trascorso
const updateTimer = function () {
  let lastFrameTime = performance.now();

  const animate = function () {
    let currentTimeMillis = performance.now();
    let elapsedMillis = currentTimeMillis - lastFrameTime;
    let framesPerSecond = 1000 / elapsedMillis;

    if (isPlaying && currentTime < totalTime) {
      let timeIncrement = 1 / framesPerSecond;
      currentTime += timeIncrement;
      updateTimerDisplay();
      requestAnimationFrame(animate);
    }

    lastFrameTime = currentTimeMillis;
  };

  animate();
};

// Funzione per aggiornare la visualizzazione del timer
const updateTimerDisplay = function () {
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  currentTimeElement.innerHTML = formatTime(currentMinutes, currentSeconds);
  updateProgressBar();
};

// Funzione per aggiornare la barra di avanzamento
const updateProgressBar = function () {
  let progress = (currentTime / totalTime) * 100;
  progressBar.style.width = progress + "%";
};

// Funzione per formattare il tempo in minuti e secondi
const formatTime = function (minutes, seconds) {
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

///////////////// BARRA RIPRODUZIONE /////////////////
