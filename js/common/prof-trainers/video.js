const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const lazyElements = [
  {
    img: document.querySelector('#intro-image'),
    container: document.querySelector('#intro-cover'),
    video: '@@pathi/media/stat/prof-trains/video/main-cover.mp4',
    poster: '@@pathi/media/stat/prof-trains/img/intro/poster-desk.jpg',
    alt: 'Все для фитнес-залов'
  },
  {
    img: document.querySelector('#projects-image'),
    container: document.querySelector('#projects-cover'),
    video: '@@pathi/media/stat/prof-trains/video/projects/projects-cover.mp4',
    videoDesk: '@@pathi/media/stat/prof-trains/video/projects/projects-cover-desk.mp4',
    poster: '@@pathi/media/stat/prof-trains/img/projects/poster-desk.jpg',
    alt: 'Фитнесс единица',
    loop: true
  }
];


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const properties = lazyElements.find((element) => element.img === entry.target);
      const { img, container, video, poster, alt, loop = false, videoDesk } = properties;
      const videoElement = document.createElement('video');

      if (videoDesk) {
        if (window.innerWidth < 768) {
          videoElement.src = video;
        } else {
          videoElement.src = videoDesk;
        }

        window.addEventListener('resize', () => {
          if (window.innerWidth < 768) {
            videoElement.src = video;
          } else {
            videoElement.src = videoDesk;
          }
        });
      } else {
        videoElement.src = video;
      }

      container.innerHTML = '';
      videoElement.alt = alt;
      videoElement.poster = poster;
      videoElement.controls = false;
      videoElement.preload = 'none';
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.loop = loop;


      container.appendChild(videoElement);
      videoElement.load();
      observer.unobserve(img);
    }
  });
}, options);

lazyElements.forEach((element) => {
  observer.observe(element.img);
});
