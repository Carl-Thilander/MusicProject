let allTracks = [];
let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
let selectedTrackIndex = null;


// Hämta och visa alla låtar
fetch("../tracks.json")
  .then(res => res.json())
  .then(data => {
    allTracks = data;
    renderTracks();
  });

function renderTracks() {
  const container = document.getElementById("trackContainer");
  container.innerHTML = "";

  allTracks.forEach((track, index) => {
    const div = document.createElement("div");
    div.className = "track-card";
    div.innerHTML = `
      <h3>${track.title}</h3>
      <p><strong>Artist:</strong> ${track.artist}</p>
      <p><strong>Genre:</strong> ${track.genre}</p>
      <button onclick="addToUserPlaylist(${index})">Lägg till i spellista</button>
    `;
    container.appendChild(div);
  });
}

function addToUserPlaylist(trackIndex) {
  if (playlists.length === 0) {
    alert("Du måste först skapa eller välja en spellista på 'Mina listor'-sidan.");
    return;
  }

  selectedTrackIndex = trackIndex;
  showPlaylistModal();
}



function showPlaylistModal() {
  const modal = document.getElementById("playlistModal");
  const list = document.getElementById("playlistList");
  list.innerHTML = "";

  playlists.forEach((playlist, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button onclick="addTrackToPlaylist(${selectedTrackIndex}, ${index})">
        ${playlist.name}
      </button>
    `;
    list.appendChild(li);
  });

  modal.style.display = "block";
}

function addTrackToPlaylist(trackIndex, playlistIndex) {
  playlists[playlistIndex].songs.push(allTracks[trackIndex]);
  localStorage.setItem("playlists", JSON.stringify(playlists));
  closePlaylistModal();
  alert(`Låten har lagts till i "${playlists[playlistIndex].name}"`);
}

function closePlaylistModal() {
  document.getElementById("playlistModal").style.display = "none";
}

