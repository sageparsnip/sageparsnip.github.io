const progressBar = $("#progressBar");
const currentTimeEl = $("#currentTime");
const durationEl = $("#duration");

let allTracks = [];
let currentFlatIndex = null;
let playlists = [];
let currentPlaylistIndex = null;
let currentTrackIndex = null;
let isPlaying = false;

const audio = $("#audioPlayer")[0];

$(document).ready(function () {
  loadPlaylists();
  bindControls();
});

function loadPlaylists() {
  $.getJSON("playlists.json?foo=" + new Date().getSeconds, function (data) {
    playlists = data.playlists;
    renderPlaylists();
  });
}

function renderPlaylists() {
  const container = $("#playlistContainer");

  playlists.forEach((playlist, pIndex) => {
    const card = $(`
      <div class="card bg-secondary mb-3">
        <div class="card-header fw-bold">
          ${playlist.title}
        </div>
        <ul class="list-group list-group-flush"></ul>
      </div>
    `);

    const list = card.find(".list-group");

    // ROOT TRACKS
    (playlist.tracks || []).forEach((track, tIndex) => {
      addTrackRow({
        playlistIndex: pIndex,
        trackIndex: list.children().length,
        display: `${track.artist} – ${track.title}`,
        file: track.file,
        tag: null
      }, list);
    });

    // SUB-PLAYLISTS
    (playlist.subplaylists || []).forEach(sub => {
      sub.tracks.forEach(track => {
        addTrackRow({
          playlistIndex: pIndex,
          trackIndex: list.children().length,
          display: `[${sub.title}] ${track.artist} – ${track.title}`,
          file: track.file,
          tag: sub.title
        }, list);
      });
    });

    container.append(card);
  });
}


function playTrack(pIndex, tIndex) {
  currentPlaylistIndex = pIndex;
  currentTrackIndex = tIndex;

  const track = playlists[pIndex].tracks[tIndex];
  audio.src = track.file;
  audio.play();

  isPlaying = true;
  $("#playPauseBtn").text("⏸");
  $("#nowPlaying").text(`Now Playing: ${track.title}`);

  $(".track-row").removeClass("active-track");
  $(".card").eq(pIndex)
    .find(".track-row").eq(tIndex)
    .addClass("active-track");
}

function bindControls() {
  $("#playPauseBtn").on("click", function () {
    if (!audio.src) return;

    if (isPlaying) {
      audio.pause();
      $(this).text("▶️");
    } else {
      audio.play();
      $(this).text("⏸");
    }
    isPlaying = !isPlaying;
  });

  $("#prevBtn").on("click", function () {
    if (currentPlaylistIndex === null) return;

    currentTrackIndex--;
    if (currentTrackIndex < 0) {
      currentTrackIndex = playlists[currentPlaylistIndex].tracks.length - 1;
    }
    playTrack(currentPlaylistIndex, currentTrackIndex);
  });

  $("#nextBtn").on("click", function () {
    if (currentPlaylistIndex === null) return;

    currentTrackIndex++;
    if (currentTrackIndex >= playlists[currentPlaylistIndex].tracks.length) {
      currentTrackIndex = 0;
    }
    playTrack(currentPlaylistIndex, currentTrackIndex);
  });

  $("#volumeSlider").on("input", function () {
    audio.volume = this.value;
  });

  audio.onended = function () {
    $("#nextBtn").click();
  };
}

function addTrackRow(trackData, list) {
  const item = $(`
    <li class="list-group-item bg-dark text-light d-flex justify-content-between align-items-center track-row">
      <span class="track-title text-truncate">${trackData.display}</span>
      <button class="btn btn-sm btn-outline-light">▶️</button>
    </li>
  `);

  const flatIndex = allTracks.push(trackData) - 1;

  item.find("button").on("click", function () {
    playFlatTrack(flatIndex);
  });

  list.append(item);
}

function playFlatTrack(index) {
  currentFlatIndex = index;
  const track = allTracks[index];

  audio.src = encodeURI(track.file);
  console.log("Attempting to play: " + audio.src);
  audio.play();

  progressBar.val(0);
  currentTimeEl.text("0:00");
  durationEl.text("0:00");


  isPlaying = true;
  $("#playPauseBtn").text("⏸");
  $("#nowPlaying").text(`Now Playing: ${track.display}`);

  $(".track-row").removeClass("active-track");
  $(".track-row").eq(index).addClass("active-track");
}

$("#prevBtn").on("click", function () {
  if (currentFlatIndex === null) return;

  currentFlatIndex =
    (currentFlatIndex - 1 + allTracks.length) % allTracks.length;

  playFlatTrack(currentFlatIndex);
});

$("#nextBtn").on("click", function () {
  if (currentFlatIndex === null) return;

  currentFlatIndex =
    (currentFlatIndex + 1) % allTracks.length;

  playFlatTrack(currentFlatIndex);
});

audio.onended = () => $("#nextBtn").click();

audio.ontimeupdate = function () {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.val(percent);

  currentTimeEl.text(formatTime(audio.currentTime));
};

audio.onloadedmetadata = function () {
  durationEl.text(formatTime(audio.duration));
};

progressBar.on("input", function () {
  if (!audio.duration) return;

  const seekTime = (this.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
