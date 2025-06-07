const musicButton = document.getElementById('musicButton');
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
audioPlayer.loop = true;

const click = document.getElementById('click');
const trash = document.getElementById('trash');
const download = document.getElementById('download')
const alarmSound = document.getElementById('alarmSound');
const stopSound = document.getElementById('alarmSoundStop');
const beginSound = document.getElementById('alarmSoundBegin');
const selectSound = document.getElementById('selectSound');

const songs = [
  '../sounds_and_songs/songs/Crinoline Dreams (1).mp3',
  '../sounds_and_songs/songs/Jazz Brunch.mp3',
  '../sounds_and_songs/songs/Night in Venice.mp3',
  '../sounds_and_songs/songs/Airport-Lounge(chosic.com).mp3',
  '../sounds_and_songs/songs/Past Sadness.mp3',
  '../sounds_and_songs/songs/Space Jazz.mp3',
  '../sounds_and_songs/songs/Avant Jazz.mp3',
];

let currentSongIndex = songs.length - 1;

musicButton.addEventListener('click', () => {
    click.play();

    currentSongIndex = (currentSongIndex + 1) % songs.length;
    
    audioSource.src = songs[currentSongIndex];
    audioPlayer.load();
    if (songs[currentSongIndex]) {
      audioPlayer.play().catch(e => console.log('Playback prevented', e));
    } else {
      audioPlayer.pause();
    }
});
