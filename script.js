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
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const app = {
  currentIndex: 0,
  isPlaying: false,
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
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path:
        "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path:
        "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
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
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    } this.loadCurrentSong();
  },
  prevSong: function() {
    this.currentIndex--;
    if(this.currentIndex = 0) {
      this.currentIndex = this.songs.length -1;
    } this.loadCurrentSong();
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
      _this.nextSong();
      audio.play();
    }

    // Khi bấm prev
    prevBtn.onclick = function() {
      _this.prevSong();
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
    progressRange.onchange = function () {
      const seekTime = (audio.duration / 100) * progressRange.value;
      audio.currentTime = seekTime;
    };

    // Xử lý CD xoay, dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 giây
      iterations: Infinity,
    })
    cdThumbAnimate.pause();
  },
  // Render Song
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song">
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
  }
}

app.start();


