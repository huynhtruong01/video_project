const ulElement = document.querySelector('.videos');
const listVideo = ulElement.querySelectorAll('li');
const totalTime = document.querySelector('.total-time');
const video = document.querySelector('#video');
const backgroundVideo = video.querySelector('.video__background');
const videoPlay = video.querySelector('.video__play');
const videoSrc = document.querySelector('video');
const videoButtonClose = video.querySelector('.video__close');

const arrVideo = Array.from(listVideo);
const listVideoPlay = [
  'Drink .mp4',
  'Luffy-Festival.mp4',
  'haki-ba-vuong-luffy.mp4',
  'Zoro.mp4',
  'Luffy-vs-Kaido.mp4',
  'Zoro-vs-Killer.mp4',
];

const dataTime = arrVideo.map((arr) => arr.dataset.time);
const times = dataTime.map((time) => {
  const [minutes, seconds] = time.split(':').map(parseFloat);
  const timeVideo = minutes * 60 + seconds;
  return timeVideo;
});

const totalTimeVideo = times.reduce((totalVideo, itemVideo) => {
  return totalVideo + itemVideo;
});

let hours = Math.floor(totalTimeVideo / 3600);
let minutes = Math.floor((totalTimeVideo % 3600) / 60);
let seconds = Math.floor(minutes % 60);

hours = hours > 10 ? hours : `0${hours}`;
minutes = minutes > 10 ? minutes : `0${minutes}`;
seconds = seconds > 10 ? seconds : `0${seconds}`;

totalTime.innerText = `${hours}:${minutes}:${seconds}`;

const insertTimeVideo = arrVideo.map((video) => {
  const spanElement = document.createElement('span');
  const timeSplit = video.dataset.time;
  const [minutes, seconds] = timeSplit.split(':');
  spanElement.innerText = `${
    minutes > 10 ? minutes : 0 + minutes
  } : ${seconds}`;
  video.append(spanElement);
});

const closeVideo = () => {
  video.classList.remove('active');
  videoPlay.classList.remove('active');
  videoSrc.src = '';
};

function showVideo(e) {
  const indexVideo = e.target.dataset.index;
  videoSrc.src = `./videos/${listVideoPlay[indexVideo - 1]}`;
  video.classList.add('active');
  videoPlay.classList.add('active');
  videoSrc.play();
  videoSrc.addEventListener('loadedmetadata', () => {
    console.log(
      `${Math.floor(videoSrc.duration / 60)}:${Math.floor(
        videoSrc.duration % 60
      )}`
    );
  });
}

listVideo.forEach((videoItem) =>
  videoItem.addEventListener('click', showVideo)
);
videoButtonClose.addEventListener('click', closeVideo);
