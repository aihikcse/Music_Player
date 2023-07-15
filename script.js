console.log("Welcome to beatScope");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Aabad Barbaad",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Pyaar Hota Kayi Baar Hai",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Kesariya",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Deva Deva",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Apna Bana Le",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Tera Yaar Hoon Main",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Khairiyat",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Ghungroo",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Phir Bhi Tumko Chaahunga",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Qaafirana",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  let idx = parseInt(songIndex);
  let song = document.getElementById(idx);
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    makeAllPlays();
    song.classList.remove("fa-play");
    song.classList.add("fa-pause");
    song.style.color = "#ff00a6";
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
    
  } else {
    audioElement.pause();
    // //makeAllPlays();
    song.style.color = "#ff00a6";
    song.classList.remove("fa-pause");
    song.classList.add("fa-play");
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
      element.style.color="white";
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      songIndex = parseInt(e.target.id);
      if (audioElement.paused) {
        makeAllPlays();
        e.target.style.color="#ff00a6";
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        //audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
      } else {
        
        e.target.classList.remove("fa-pause");
        e.target.classList.add("fa-play");
        // audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
        // audioElement.src = `songs/${songIndex+1}.mp3`;
        // masterSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
        audioElement.pause();
        e.target.style.color="#ff00a6";
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  let idx = parseInt(songIndex);
  let song = document.getElementById(idx);
  audioElement.play();
  makeAllPlays();
  song.style.color = "#ff00a6";
  song.classList.remove("fa-play");
  song.classList.add("fa-pause");
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  let idx = parseInt(songIndex);
  let song = document.getElementById(idx);
  audioElement.play();
  makeAllPlays();
  song.style.color = "#ff00a6";
  song.classList.remove("fa-play");
  song.classList.add("fa-pause");
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
