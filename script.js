const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song Title Array
const songs = ['Brown_Rang', 'Chandigarh', 'Gaddi Moudan Ge'];

//keep track of song
let songIndex = 1;



//Update Song Details
const loadSong = (song) => {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

//initially load song deatils into DOM
loadSong(songs[songIndex]);

// Play Song
const playSong = () => {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause Song
const pauseSong = () => {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

//Previous Song
const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;

    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    //console.log(duration, currentTime);
    
    const progressPercent = (currentTime/duration)*100;
    //console.log(progressPercent);
    progress.style.width = `${progressPercent}%`;
    
}

// Set Progress Bar
const setProgress = (e) => {
    const widthOfBar = progressContainer.clientWidth;
    const clickPosX = e.offsetX;
    //console.log(clickPosX);
    const durationOfSong = audio.duration;
    //console.log(durationOfSong,widthOfBar,clickPosX);
    audio.currentTime = (clickPosX / widthOfBar) * durationOfSong;
}
// Event Listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


//Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// SOng Ends
audio.addEventListener('ended', nextSong);