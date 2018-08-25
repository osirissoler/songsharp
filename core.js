const fs = require('fs');
const $ = require('jQuery');
var remote = require('electron').remote
const app = remote.app;

const documents = app.getPath("documents");
const songsDir = `${documents}/songsharp/songs`;

fs.readdir(documents, (_, dir) => {
    if (dir.indexOf('songsharp') < 0) {
        fs.mkdir(`${documents}/songsharp`);
        fs.mkdir(songsDir);
    }
});

const initSongs = () => {
    const template = (name) =>
        `<li class="nav-item"><a class="nav-link song" href="#">${name}</a></li>`;

    fs.readdir(songsDir, (_, dir) => {
        const songList = dir.map(name => template(name));
        $('#songsList').append(songList.join(''));
    });
};

setTimeout(initSongs, 100);

const displaySong = (name) => {
    fs.readFile(`${songsDir}/${name}`, 'utf8', (err, data) => {
        const xmlSong = $.parseXML(data);
        const $song = $xml = $(xmlSong);
        $('#songTitle').html($song.find('title').text());
        $('#songBody').val($song.find('lyrics').text());
    });
};

$(() => {
    $(document).on('click', '.song', (event) => {
        const name = $(event.target).text();
        displaySong(name);
    });

    setTimeout(() => $('.song').click(), 300);
});
