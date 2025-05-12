const playlists = [];

function creaetePlaylist(){
    const nameInput = document.getElementById('playlist-name');
    const name = nameInput.value.trim();

    if (name) {
        const newPlaylist = {
            name: name,
            songs: [],
            genre :"",
            artist: ""
        }
};
        playlists.push(newPlaylist);
        nameInput.value = '';
        renderPlaylists();
    }

function renderPlaylists() {
    const container = document.getElementById('playlistsContainer');
    container.innerHTML = '';

    playlists.forEach((playlist, index) => {
        const div = document.createElement('div');
        div.className = 'playlist';
        div.innerHTML = `
            <h3>${playlist.name}</h3>
            <p>Genre: ${playlist.genre}</p>
            <p>Artist: ${playlist.artist}</p>
            <button onclick="deletePlaylist(${index})">Delete</button>
        `;
        container.appendChild(div);
    }
    );
}