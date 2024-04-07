console.log("Welcome to JUcify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "No Issue", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Already Dead", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Hate-Me", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "PTSD", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Over and Over", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Who Shot Cupid", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Roses", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Syphilis", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tell Me U Love Me", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Suicidal", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

myProgressBar.addEventListener('input', () => {
    const seekTime = audioElement.duration * (myProgressBar.value / 100);
    audioElement.currentTime = seekTime;
});


audioElement.addEventListener('timeupdate', () => { 
    
    const progress = (audioElement.currentTime / audioElement.duration) * 100; 
    myProgressBar.value = progress;

    
    const currentMinutes = Math.floor(audioElement.currentTime / 60);
    const currentSeconds = Math.floor(audioElement.currentTime % 60);
    document.getElementById('timePlayed').innerText = `${currentMinutes}:${currentSeconds}`;
});


audioElement.addEventListener('ended', () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
        playSong(songIndex);
    } else {
        songIndex = 0;
        playSong(songIndex);
    }
});


function playSong(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    makeAllPlays();
}


function makeAllPlays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}


function playClickedSong(e) {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    playSong(songIndex);
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', playClickedSong);
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;
    }
    playSong(songIndex);
});


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1;
    }
    playSong(songIndex);
});
