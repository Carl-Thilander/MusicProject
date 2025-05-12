let playlists = [];
let currentPlaylistIndex = null;

function createPlaylist(){
    const nameInput = document.getElementById('playlistName');
    const name = nameInput.value.trim();
    

    if (name) {
        playlists.push({
          name,
          songs: []
        });
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
            <button onclick="openSongForm(${index})">Lägg till låt</button>
            <ul>
              ${playlist.songs.map(song => `<li>${song.title} - ${song.artist} (${song.genre})</li>`).join("")}
            </ul>
          `;
          container.appendChild(div);
        });
      }

      function openSongForm(index) {
        currentPlaylistIndex = index;
        const playlist = playlists[index];
        document.getElementById("currentPlaylistName").innerText = playlist.name;
        document.getElementById("songForm").style.display = "block";
      }

      function addSong() {
        const title = document.getElementById("songTitle").value.trim();
        const artist = document.getElementById("songArtist").value.trim();
        const genre = document.getElementById("songGenre").value.trim();
      
        if (title && artist && genre) {
          playlists[currentPlaylistIndex].songs.push({ title, artist, genre });
      
          // Rensa formulär
          document.getElementById("songTitle").value = "";
          document.getElementById("songArtist").value = "";
          document.getElementById("songGenre").value = "";
      
          renderPlaylists();
        }
      }