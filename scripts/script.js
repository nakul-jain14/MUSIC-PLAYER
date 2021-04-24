const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs 
const songs = [
    {
        title: 'Aaja we mahiya',
        artist: 'Imran khan',
        coverPath: 'assets/images/cover1.jpg',
        discPath: 'assets/music/music1.mp3',
        duration: '3:50',
    },
    {
        title: 'Amplifire',
        artist: 'imran khan',
        coverPath: 'assets/images/cover2.jpg',
        discPath: 'assets/music/music2.mp3',
        duration: '3:50',
    },
    {
        title: 'Be intehaan',
        artist: 'Atif Aslam',
        coverPath: 'assets/images/cover3.jpg',
        discPath: 'assets/music/music3.mp3',
        duration: '4:50',
    },
    {
        title: 'Ghatal fehmi X jo tu na mila',
        artist: 'jalraj',
        coverPath: 'assets/images/cover4.jpg',
        discPath: 'assets/music/music4.mp3',
        duration: '4:30',
    },
    {
        title: 'Tune mere jaana',
        artist: 'Gajendra verma',
        coverPath: 'assets/images/cover5.jpg',
        discPath: 'assets/music/music5.mp3',
        duration: '4:05',
    },
    {
        title: 'Shaam',
        artist: 'Amit Trivedi',
        coverPath: 'assets/images/cover6.jpg',
        discPath: 'assets/music/music6.mp3',
        duration: '4:44',
    },
];

loadSong(songs[songIndex]);

// play and pause
function playPauseMedia() {
    if (disc.paused) {
        disc.play();
    } else {
        disc.pause();
    }
}


// Load given song
function loadSong(song) {
    cover.src = song.coverPath;
    disc.src = song.discPath;
    title.textContent = song.title;
    artist.textContent = song.artist;
    duration.textContent = song.duration;
}


// Update icon
function updatePlayPauseIcon() {
    if (disc.paused) {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    } else {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
}

// Update progress bar
function updateProgress() {
    progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
}

// Go to previous song
function gotoPreviousSong() {
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow) {
        playPauseMedia();
    }
}

// Reset the progress
function resetProgress() {
    progress.style.width = 0 + '%';
    timer.textContent = '0:00';
}


// Go to next song
function gotoNextSong(playImmediately) {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex = songIndex + 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow || playImmediately) {
        playPauseMedia();
    }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
    const totalWidth = this.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause 
play.addEventListener('click', playPauseMedia);

// Various events (updates)
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song 
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song 
next.addEventListener('click', gotoNextSong.bind(null, false));

// Go to different place in the song
progressContainer.addEventListener('click', setProgress);
