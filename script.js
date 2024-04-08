const audio = document.querySelector(".audio");
const cdThumb = document.querySelector(".main__disc-side img");
const trackTitle = document.querySelector(".disc__title");
const trackAuthor = document.querySelector(".track__author");
const playBtn = document.querySelector('.fa-play')
const pauseBtn = document.querySelector('.fa-pause')
const randomBtn = document.querySelector('.btn-random')
const loopBtn = document.querySelector('.btn-repeat');
const nextBtn = document.querySelector('.btn-next')
const prevBtn = document.querySelector('.btn-prev')
const progressRange = document.getElementById('progress')
const nowProgress = document.querySelector('.now-progress')
const totalTime = document.querySelector('.total-time')

let currentSongIndex = 0;

const songs = [
  {
    name: "I Wish",
    singer: "Maimie",
    path: "./Song/I Wish.mp3",
    image:
      "https://p2.bahamut.com.tw/S/2KU/30/3cd2e5086b21b29e207573a86a1o8ji5.JPG",
  },
  {
    name: "Anemone",
    singer: "Title song【Memento Mori】",
    path: "./Song/Anemone.mp3",
    image:
      "https://play-lh.googleusercontent.com/OI51wmewoxY-Ygp4RDOFS3nZH866g3sh56c1qEGWPmIZ0vFyAs_1FnWhckPV8rj6DP4=w240-h480-rw",
  },
  {
    name: "Buồn Hay Vui",
    singer: "VSOUL x MCK x Obito x Ronboogz x Boyzed",
    path: "./Song/BUỒN HAY VUI.mp3",
    image:
      "https://i1.sndcdn.com/artworks-N12oCUcbMlkSzA6M-VO3OdQ-t500x500.jpg",
  },
  {
    name: "Một phần hai ½",
    singer: "Anh Tú x OgeNus",
    path: "./Song/một phần hai ½.mp3",
    image: "https://i.scdn.co/image/ab67616d00001e02f11ac8ea745b88173b716f73",
  },
  {
    name: "Đậm Sâu Chẳng Được Gì",
    singer: "Hoài Lâm",
    path: "./Song/ĐẬM SÂU CHẲNG ĐƯỢC GÌ.mp3",
    image: "https://i.scdn.co/image/ab67616d00001e0263e4bbaa3b7a7a86c64fcf47",
  },
  {
    name: "CHỊU CÁCH MÌNH NÓI THUA",
    singer: "RHYDER ft. BAN x COOLKID",
    path: "./Song/CHỊU CÁCH MÌNH NÓI THUA.mp3",
    image: "https://i.scdn.co/image/ab67616d00001e023687e8b4ade89380cb3d27c6",
  },
  {
    name: "Lỡ Làng Duyên Em",
    singer: "Thành Đạt",
    path: "./Song/LoLangDuyenEm-ThanhDat-12751167.mp3",
    image: "https://i.scdn.co/image/ab67616d00001e02f5be56eef070318cb4f34e40",
  },
];

function render() {
  const playlist = document.querySelector(".main__track-side");
  const html = songs.map((song, index) => {
    return `<div class="track" onclick="playTrack(${index})">
              <div class="track_thumb">
                <img
                    src="${song.image}"
                    alt="/"
                />
              </div>

              <div class="track__info">
                  <div class="track__title">${song.name}</div>
                  <div class="track__author">${song.singer}</div>
              </div>

              <div class="track__time">
                  <p>6:05</p>
              </div>
            </div>`;
  });
  playlist.innerHTML = html.join("");
}

function loadCurrentSong(index) {
  const currentSong = songs[index];

  audio.src = currentSong.path;
  cdThumb.src = currentSong.image;
  trackTitle.textContent = currentSong.name;
}

function playTrack(index) {
  loadCurrentSong(index);
  audio.play();
}

function handlePlay() {
  audio.play();
  playBtn.classList.add('isnone');
  pauseBtn.classList.remove('isnone');
}

function handleStop() {
  audio.pause();
  playBtn.classList.remove('isnone');
  pauseBtn.classList.add('isnone');
}

let isLoop = false;
let isRandom = false;



// Xử lý sự kiện khi bài hát kết thúc
function randomClick() {
  if (isRandom) {
    isRandom = false;
    randomBtn.classList.remove('active');
  } else {
    isRandom = true;
    randomBtn.classList.add('active');
  }
}




audio.onended = function () {
  if (isRandom) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    loadCurrentSong(randomIndex);
    audio.play();
  } else {
    nextBtn.click();
  }
};

function loopClick() {
  if (isLoop) {
    isLoop = false;
    loopBtn.classList.remove('active');
  } else {
    isLoop = true;
    loopBtn.classList.add('active');
  }
}

function playNextSong() {
  currentSongIndex++; // Tăng index lên 1
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0; // Nếu đang ở bài hát cuối cùng, quay lại bài hát đầu tiên
  }
  loadCurrentSong(currentSongIndex); // Load bài hát mới
  audio.play(); // Phát bài hát mới
}

function playPrevSong() {
  currentSongIndex--; // Giảm index đi 1
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1; // Nếu đang ở bài hát đầu tiên, quay lại bài hát cuối cùng
  }
  loadCurrentSong(currentSongIndex); // Load bài hát mới
  audio.play(); // Phát bài hát mới
}

audio.onloadedmetadata = function() {
  const minutes = Math.floor(audio.duration / 60);
  const seconds = Math.floor(audio.duration % 60);
  totalTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

audio.ontimeupdate = function() {
  if (audio.duration > 0) {
    const currentTime = Math.floor(audio.currentTime);
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    nowProgress.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
    const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
    progressRange.value = progressPercent;
  }
};

// Xử lý sự kiện tua trên thanh input
progressRange.addEventListener('input', function() {
  const seekTime = (audio.duration / 100) * progressRange.value;
  audio.currentTime = seekTime;
});

// Update current time khi tua thanh input
progressRange.addEventListener('mousedown', function() {
  audio.pause();
});

progressRange.addEventListener('mouseup', function() {
  audio.play();
});


// Event listeners
playBtn.addEventListener('click', handlePlay);
pauseBtn.addEventListener('click', handleStop);
loopBtn.addEventListener('click', loopClick);
randomBtn.addEventListener('click', randomClick);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);

// Chọn bài hát hiện tại (ví dụ: bài hát đầu tiên trong danh sách)
loadCurrentSong(0);

// Đảm bảo render được gọi sau khi loadCurrentSong
render();