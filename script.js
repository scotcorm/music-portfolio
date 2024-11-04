const menuBtn = document.querySelector('.menu-btn'),
  container = document.querySelector('.music-container');

const progressBar = document.querySelector('.bar'),
  progressDot = document.querySelector('.dot'),
  currentTimeEl = document.querySelector('.current-time'),
  durationEl = document.querySelector('.duration');

menuBtn.addEventListener('click', () => {
  container.classList.toggle('active');
});

let playing = false,
  currentSong = 0,
  shuffle = false,
  repeat = false,
  // favorites = [0],
  audio = new Audio();

const songs = [
  {
    title: 'Pick Up',
    artist: 'Adam MacDougall',
    img_src: 'noun-music-7282489.png',
    src: 'Pick Up - Adam MacDougall.mp3',
  },
  {
    title: 'Satin Moonrise',
    artist: 'Adam MacDougall',
    img_src: 'noun-music-7322300.png',
    src: 'Satin Moonrise - Adam MacDougall.mp3',
  },
];

const playlistContainer = document.querySelector('#playlist'),
  infoWrapper = document.querySelector('.info'),
  coverImage = document.querySelector('.cover-image'),
  currentSongTitle = document.querySelector('.current-song-title'),
  currentFavorite = document.querySelector('#current-favorite');

function init() {
  updatePlaylist(songs);
  loadSong(currentSong);
}

init();

function updatePlaylist(songs) {
  //remove any existing elements
  playlistContainer.innerHTML = '';

  // use forEach on songs array

  songs.forEach((song, index) => {
    // extract data from song

    const { title, src } = song;

    // check if in favorites array
    // const isFavorite = favorites.includes(index);

    // create a tr to wrap song

    const tr = document.createElement('tr');
    tr.classList.add('song');
    tr.innerHTML = `
      <td class="no">
        <h6>${index + 1}</h6>
      </td>
      <td class="title">
        <h6>${title}</h6>
      </td>
      <td class="length">
        <h6>2:30</h6>
      </td>
 
    `;

    //    <td>
    //   <i class="fa-regular fa-heart ${
    //     isFavorite ? 'fa-solid fa-heart' : ''
    //   }"></i>
    // </td>

    playlistContainer.appendChild(tr);

    // play song when playlist is clicked

    tr.addEventListener('click', (e) => {
      //   // add to favorites

      //   if (e.target.classList.contains('fa-regular')) {
      //     addToFavorites(index);
      //     e.target.classList.toggle('active');
      //     // if heart is clicked add to favs dont play
      //     return;
      //   }

      currentSong = index;
      loadSong(currentSong);
      audio.play();
      container.classList.remove('active');
      playPauseBtn.classList.replace('fa-play', 'fa-pause');
      playing = true;
    });

    const audioForDuration = new Audio(`resources/${src}`);
    audioForDuration.addEventListener('loadedmetadata', () => {
      const duration = audioForDuration.duration;

      let songDuration = formatTime(duration);
      tr.querySelector('.length h6').innerText = songDuration;
    });
  });
}

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

// add play functionality

function loadSong(num) {
  // change titles and times to current song

  infoWrapper.innerHTML = `
    <h2>${songs[num].title}</h2>
    <h3>${songs[num].artist}</h3>
  `;

  currentSongTitle.innerHTML = songs[num].title;

  // change the cover image
  coverImage.style.backgroundImage = `url(resources/${songs[num].img_src})`;

  // add source of current song to audio variable
  audio.src = `resources/${songs[num].src}`;

  // if song is in favorites highlight

  // if (favorites.includes(num)) {
  //   currentFavorite.classList.add('active');
  // } else {
  //   currentFavorite.classList.remove('active');
  // }
}

// add play/pause functionality

const playPauseBtn = document.querySelector('#playpause'),
  nextBtn = document.querySelector('#next'),
  prevBtn = document.querySelector('#prev');

playPauseBtn.addEventListener('click', () => {
  if (playing) {
    // pause if already playing
    playPauseBtn.classList.replace('fa-pause', 'fa-play');
    playing = false;
    audio.pause();
  } else {
    //if not playing play
    playPauseBtn.classList.replace('fa-play', 'fa-pause');
    playing = true;
    audio.play();
  }
});

function nextSong() {
  // shuffle
  if (shuffle) {
    shuffleFunc();
    loadSong(currentSong);
  }

  // if current song is not last on playlist
  else if (currentSong < songs.length - 1) {
    //load the next song
    currentSong++;
  } else {
    //if it is the last song then play first
    currentSong = 0;
  }
  loadSong(currentSong);
  // after load if song was playing keep playing current

  // we need to play if playing is true

  if (playing) {
    audio.play();
  }
}

nextBtn.addEventListener('click', nextSong);

function prevSong() {
  // shuffle
  if (shuffle) {
    shuffleFunc();
    loadSong(currentSong);
  }

  // if current song is not last on playlist
  else if (currentSong > 0) {
    //load the prev song
    currentSong--;
  } else {
    //if it is the last song then play first
    currentSong = songs.length - 1;
  }
  loadSong(currentSong);
  // after load if song was playing keep playing current

  if (playing) {
    audio.play();
  }
}

prevBtn.addEventListener('click', prevSong);

// function addToFavorites(index) {
//   // check if already in favs then remove
//   if (favorites.includes(index)) {
//     favorites = favorites.filter((item) => item !== index);
//     // looked like item with a line through a three bar equal sign then index
//     // if current playing song is removed also remove favs
//       currentFavorite.classList.remove("active")
//   } else {
//     // if not already in favs add
//     favorites.push(index)
//   //if current favorite and index are equals
//   if(index === currentSong) {
//     currentFavorite.classList.add("active")}
//   }
// }
//   // after adding favs rerender the list to show new favs
//    updatePlaylist(songs)
// }
// currentFavorite.addEventListener("click", () => {
//   addToFavorites(currentSong);
//   currentFavorite.classList.toggle("active")
// })

// add shuffle functionality

const shuffleBtn = document.querySelector('#shuffle');

function shuffleSongs() {
  // if shuffle is true make it false
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('active');
}

shuffleBtn.addEventListener('click', shuffleSongs);

function shuffleFunc() {
  if (shuffle) {
    // select a random song
    currentSong = Math.floor(Math.random() * songs.length);
  }
}

// repeat functionality

const repeatBtn = document.querySelector('#repeat');

function repeatSong() {
  if (repeat === 0) {
    // if repeat is off then repeat current song
    repeat = 1;
    // if repeat on, make the button active
    repeatBtn.classList.add('active');
  } else if (repeat === 1) {
    // repeat
    repeat = 2;
    repeatBtn.classList.add('active');
  } else {
    // turn off repeat
    repeat = 0;
    repeatBtn.classList.remove('active');
  }
}

repeatBtn.addEventListener('click', repeatSong);
// one click repeat ===1 2nd is repeat ===2 third repeat === 0

// repeat on audio
audio.addEventListener('ended', () => {
  if (repeat === 1) {
    //load current song
    loadSong(currentSong);

    audio.play();
  } else if (repeat === 2) {
    // load next song
    nextSong();
    audio.play();
  } else {
    if (currentSong === songs.length - 1) {
      audio.pause();
      playPauseBtn.classList.replace('fa-pause', 'fa-play');
      playing = false;
    } else {
      // if not last then continue to next song
      nextSong();
      audio.play();
    }
  }
});

function progress() {
  let { duration, currentTime } = audio;
  isNaN(duration) ? (duration = 0) : duration;
  isNaN(currentTime) ? (currentTime = 0) : currentTime;

  // update time elements

  currentTimeEl.innerHTML = formatTime(currentTime);
  durationEl.innerHTML = formatTime(duration);

  // move the progress dot

  let progressPercentage = (currentTime / duration) * 100;
  progressDot.style.left = `${progressPercentage}%`;
}

// update progress
audio.addEventListener('timeupdate', progress);

// change progress when the bar is clicked
function setProgress(e) {
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressBar.addEventListener('click', setProgress);

// =====================================================

let wavesurfers = [];
// Function to create a WaveSurfer instance for a player
function createwaveSurfer(containerId, trackUrl, playPauseId) {
  // Select the play/pause button and WaveSurfer container

  let wavesurfer = WaveSurfer.create({
    container: container,
    waveColor: '#FFFFFF',
    progressColor: '#6191FB',
    height: '30',
    cursorWidth: '0',
    hideScrollbar: 'true',
    backend: 'MediaElement',
  });
  wavesurfers.push(wavesurfer);

  // Load the audio track
  wavesurfer.load(trackUrl);
  return wavesurfer;
}

window.onload = (event) => {
  console.log('page is fully loaded');
  wavesurferObjects.map((item, indx) => {
    let indexToKeep = indx;
    let waveSurfer = createwaveSurfer(
      item.container,
      item.audioURL,
      item.playPauseButton
    );
    let playPause = document.querySelector(item.playPauseButton);
    // Add click event to play/pause button
    playPause.addEventListener('click', function (e) {
      wavesurfers.forEach((wavesfr, index) => {
        if (index !== indexToKeep && wavesfr.isPlaying()) {
          wavesfr.stop();
          wavesfr.seekTo(0);
          const icons = document.querySelectorAll('.fas');

          icons.forEach((icon) => {
            if (icon.classList.contains('fa-pause')) {
              icon.classList.remove('fa-pause');
              icon.classList.add('fa-play');
            }
          });
        }
      });

      // Toggle play/pause state and update button icon accordingly
      waveSurfer.isPlaying()
        ? (waveSurfer.pause(),
          playPause.classList.remove('fa-pause'),
          playPause.classList.add('fa-play'))
        : (waveSurfer.play(),
          playPause.classList.remove('fa-play'),
          playPause.classList.add('fa-pause'));
    });

    waveSurfer.on('finish', function () {
      waveSurfer.seekTo(0);
      playPause.classList.remove('fa-pause');
      playPause.classList.add('fa-play');
    });
  });
};
