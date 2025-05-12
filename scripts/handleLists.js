let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
let currentPlaylistIndex = null;

renderPlaylists();

function createPlaylist() {
  const nameInput = document.getElementById('playlistName');
  const name = nameInput.value.trim();

  if (name) {
    playlists.push({ name, songs: [] });
    localStorage.setItem("playlists", JSON.stringify(playlists));
    nameInput.value = "";
    renderPlaylists();
  }
}

function renderPlaylists() {
  const container = document.getElementById("playlistsContainer");
  container.innerHTML = "";

  playlists.forEach((playlist, index) => {
    const div = document.createElement("div");
    div.className = "playlist";
    div.innerHTML = `
      <strong>${playlist.name}</strong>
      <button onclick="selectPlaylist(${index})">Välj</button>
      <button onclick="deletePlaylist(${index})">🗑️</button>
      <ul>
        ${playlist.songs.map(song => `<li>${song.title} - ${song.artist} (${song.genre})</li>`).join("")}
      </ul>
    `;
    container.appendChild(div);
  });
}

function selectPlaylist(index) {
  currentPlaylistIndex = index;
  localStorage.setItem("currentPlaylistIndex", index);
  alert(`Du har valt spellistan: ${playlists[index].name}`);
}

function deletePlaylist(index) {
  if (confirm("Är du säker på att du vill ta bort denna spellista?")) {
    playlists.splice(index, 1);
    localStorage.setItem("playlists", JSON.stringify(playlists));
    renderPlaylists();
  }
}
