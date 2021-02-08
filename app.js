document.getElementById('search-btn').addEventListener('click', async () => {
    const searchText = document.getElementById('search-text').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMusic(data.data);
})

const displayMusic = (musics) => {
    const musicSection = document.getElementById('music-section');
    musicSection.innerHTML = '';
    musics.forEach(music => {
        const div = document.createElement('div');
        div.className = "single-result row align-items-center my-3 p-3";
        div .innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${music.title}</h3>
                <p class="author lead">Album by <span>${music.artist.name}</span></p>
                <audio controls>
                    <source src="${music.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics(event)" data-artist="${music.artist.name}" data-title="${music.title}" class="btn btn-success">Get Lyrics</button>
            </div>
        `;

        musicSection.appendChild(div)
        
    });
}


const getLyrics = async (event) => {
    const dataSet = event.target.dataset;
    const url = `https://api.lyrics.ovh/v1/${dataSet.artist}/${dataSet.title}}`;
    const res = await fetch(url);
    const data = res.json();
    data.then(data => {
        const lyricsSection = document.getElementById('lyrics-section');
        if (data.lyrics) {
            lyricsSection.innerText = data.lyrics;
        }else{
            lyricsSection.innerText = "Lyrics not available";
        }
    })
}