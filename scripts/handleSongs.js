let allTracks = [];
let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
let currentPlaylistIndex = localStorage.getItem("currentPlaylistIndex");

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
  if (currentPlaylistIndex === null || playlists.length === 0) {
    alert("Du måste först skapa eller välja en spellista på 'Mina listor'-sidan.");
    return;
  }

  playlists[currentPlaylistIndex].songs.push(allTracks[trackIndex]);
  localStorage.setItem("playlists", JSON.stringify(playlists));
  alert(`Låten "${allTracks[trackIndex].title}" har lagts till i spellistan "${playlists[currentPlaylistIndex].name}".`);
}
