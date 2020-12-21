const image = document.querySelector('img');
const title = document.getElementById('title');
const artistEl = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Darling - Darling',
        artist: 'Satbir Aujia',
    },
    {
        name: 'jacinto-2',
        displayName: 'Mummy Kassam (Coolie No.1)',
        artist: 'Javed-Mohsin',
    },
    {
        name: 'jacinto-3',
        displayName: 'Badrinath ki Dulhania',
        artist: 'Amaal Malik'
    },
    {
        name: 'metric-1',
        displayName: 'Everybody Wants You',
        artist: 'Johnny Orlando'
    }
]

// check if playing
let isPlaying = false;

//  play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    playBtn.setAttribute('title', 'Play');
    music.pause()
}


// PLay or pause listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// update DOM
function loadSong(song) {
    const {displayName, artist, name} = song;
    title.textContent = displayName;
    artistEl.textContent = artist;
    music.src = `music/${name}.mp3`;
    image.src = `img/${song.name}.jpg`; // music and image names are same
}


// current song
let songIndex = 0;

// Next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex)
    loadSong(songs[songIndex]);
    playSong();
}

// Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    console.log(songIndex)
    loadSong(songs[songIndex]);
    playSong();
}

// On load - select first song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.target;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration event to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration; // set the seconds to currentTime prop.
    
}

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);