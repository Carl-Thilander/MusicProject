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

  playlists.forEach((playlist, playlistIndex) => {
  const div = document.createElement("div");
  div.className = "playlist";
  div.innerHTML = `
    <strong>${playlist.name}</strong>
    <button onclick="deletePlaylist(${playlistIndex})">Delete playlist🗑️</button>
    <ul>
      ${playlist.songs.map((song, songIndex) => `
        <li>
          ${song.title} - ${song.artist} (${song.genre})
          <button onclick="removeSongFromPlaylist(${playlistIndex}, ${songIndex})">Remove</button>
        </li>
      `).join("")}
    </ul>
  `;
  container.appendChild(div);
});
}
function removeSongFromPlaylist(playlistIndex, songIndex) {
  playlists[playlistIndex].songs.splice(songIndex, 1);
  localStorage.setItem("playlists", JSON.stringify(playlists));
  renderPlaylists();
}


function deletePlaylist(index) {
  if (confirm("Är du säker på att du vill ta bort denna spellista?")) {
    playlists.splice(index, 1);
    localStorage.setItem("playlists", JSON.stringify(playlists));
    renderPlaylists();
  }
}
