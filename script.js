const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist');
const cd = $('.cd');
const heading = $('h2');
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progressRange = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const repeatBtn = $('.btn-repeat');
const randomBtn = $('.btn-random');
const playlist = $('.playlist');
const PlAYER_STORAGE_KEY = "F8_PLAYER";

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  randomIndexes: [],
  config: {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  loadConfig: function () {
    const savedConfig = JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY));
    if (savedConfig) {
      this.config = savedConfig;
      this.isRandom = this.config.isRandom;
      this.isRepeat = this.config.isRepeat;
      randomBtn.classList.toggle('active', this.isRandom);
      repeatBtn.classList.toggle('active', this.isRepeat);
    }
  },
  songs: [
    {
      name: "I Wish",
      singer: "Maimie",
      path: "./Song/I Wish.mp3",
      image: "https://p2.bahamut.com.tw/S/2KU/30/3cd2e5086b21b29e207573a86a1o8ji5.JPG"
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
      path:
        "./Song/BUỒN HAY VUI.mp3",
      image: "https://i1.sndcdn.com/artworks-N12oCUcbMlkSzA6M-VO3OdQ-t500x500.jpg"
    },
    {
      name: "Một phần hai ½",
      singer: "Anh Tú x OgeNus",
      path: "./Song/một phần hai ½.mp3",
      image:
        "https://i.scdn.co/image/ab67616d00001e02f11ac8ea745b88173b716f73"
    },
    {
      name: "Đậm Sâu Chẳng Được Gì",
      singer: "Hoài Lâm",
      path: "./Song/ĐẬM SÂU CHẲNG ĐƯỢC GÌ.mp3",
      image:
        "https://i.scdn.co/image/ab67616d00001e0263e4bbaa3b7a7a86c64fcf47"
    },
    {
      name: "CHỊU CÁCH MÌNH NÓI THUA",
      singer: "RHYDER ft. BAN x COOLKID",
      path:
        "./Song/CHỊU CÁCH MÌNH NÓI THUA.mp3",
      image:
        "https://i.scdn.co/image/ab67616d00001e023687e8b4ade89380cb3d27c6"
    },
    {
      name: "Lỡ Làng Duyên Em",
      singer: "Thành Đạt",
      path: "./Song/LoLangDuyenEm-ThanhDat-12751167.mp3",
      image:
        "https://i.scdn.co/image/ab67616d00001e02f5be56eef070318cb4f34e40"
    }],
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      }
    })
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path;
  },
  nextSong: function() {
    // Xóa lớp 'active' ở bài hát cũ
    const currentSongNode = document.querySelector(`.song[data-index="${this.currentIndex}"]`);
    currentSongNode.classList.remove('active');
  
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    
    // Thêm lớp 'active' cho bài hát mới
    const newSongNode = document.querySelector(`.song[data-index="${this.currentIndex}"]`);
    newSongNode.classList.add('active');
  
    this.loadCurrentSong();
  
    // Gọi phương thức render để cập nhật giao diện
    this.render();
  },
  prevSong: function() {
    // Xóa lớp 'active' ở bài hát cũ
    const currentSongNode = document.querySelector(`.song[data-index="${this.currentIndex}"]`);
    currentSongNode.classList.remove('active');
    this.currentIndex--;
    if(this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    // Thêm lớp 'active' cho bài hát mới
    const newSongNode = document.querySelector(`.song[data-index="${this.currentIndex}"]`);
    newSongNode.classList.add('active');

    this.loadCurrentSong();

    this.render();
  },
  handleEvent: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    // Xử lý phóng to / thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    }

    // Xử lý nút play
    playBtn.onclick = function () {
      if (!_this.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    // Khi bài hát được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.remove('pause')
      player.classList.add('playing');
      cdThumbAnimate.play();
    }
    // Khi bài hát bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.add('pause');
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }

    //Khi bấm next
    nextBtn.onclick = function() {
      if(!_this.isRandom) {
        _this.nextSong();
      } else {
        _this.playRandomSong();
      }
      audio.play();
    }

    // Khi bấm prev
    prevBtn.onclick = function() {
      if(!_this.isRandom) {
      _this.prevSong();
      } else {
      _this.playRandomSong();
      }
      audio.play();
    }

    //Cập nhật thanh thời gian
    audio.ontimeupdate = function () {
      if (audio.duration > 0) {
      const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
      progressRange.value = progressPercent;
      }
    }

    // Xử lý khi người dùng thay đổi giá trị của thanh thời gian
    progressRange.oninput = function () {
      const seekTime = (audio.duration / 100) * progressRange.value;
      audio.currentTime = seekTime;
    };

    // Bật/Tắt loop
    repeatBtn.onclick = function() {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle('active', _this.isRepeat);
      _this.setConfig("isRepeat", _this.isRepeat);
    }

    // Bật/Tắt Random
    randomBtn.onclick = function() {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle('active', _this.isRandom);
      _this.setConfig("isRandom", _this.isRandom);
    }

    // Xử lý khi bật loop
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Xử lý CD xoay, dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 giây
      iterations: Infinity,
    })
    cdThumbAnimate.pause();

    
    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  // Render Song
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index = ${index}> 
            <div class="thumb" style="background-image: url('${song.image}')"></div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`;
    })
    playList.innerHTML = htmls.join("");
  },
  playRandomSong: function() {
    if (this.songs.length === 0) {
      console.error("No songs available.");
      return;
    }
  
    // Nếu mảng chỉ số trống, tạo lại với tất cả các chỉ số
    if (this.randomIndexes.length === 0) {
      this.randomIndexes = Array.from({ length: this.songs.length }, (_, index) => index);
    }
  
    // Random một chỉ số từ mảng chỉ số và lấy giá trị tương ứng
    const randomIndex = this.randomIndexes.splice(Math.floor(Math.random() * this.randomIndexes.length), 1)[0];
    this.currentIndex = randomIndex;
  
    // Nếu mảng chỉ số đã random hết, reset nó để bắt đầu lại
    if (this.randomIndexes.length === 0) {
      this.randomIndexes = Array.from({ length: this.songs.length }, (_, index) => index);
    }
  
    this.loadCurrentSong();
  
    // Gọi phương thức render để cập nhật giao diện
    this.render();
  },  
  // Start ứng dụng
  start: function () {
    // Render danh sách bài hát
    this.render();
    //Xử lý các sự kiện
    this.handleEvent();
    // Định nghĩa thuộc tính cho object
    this.defineProperties();
    // Load bài hát hiện tại
    this.loadCurrentSong();
    // Random bài hát
    if (this.isRandom) {
      this.playRandomSong();
    }
    this.loadConfig();
  }
}

app.start();


