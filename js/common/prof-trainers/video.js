const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const lazyElements = [
  {
    img: document.querySelector('#intro-image'),
    container: document.querySelector('#intro-cover'),
    video: '/i/media/stat/prof-trains/video/main-cover.mp4',
    poster: '/i/media/stat/prof-trains/img/intro/poster-desk.jpg',
    alt: 'Все для фитнес-залов'
  },
  {
    img: document.querySelector('#projects-image'),
    container: document.querySelector('#projects-cover'),
    video: '/i/media/stat/prof-trains/video/projects/cover.mp4',
    poster: '/i/media/stat/prof-trains/img/projects/poster-desk.jpg',
    alt: 'Фитнесс единица',
    loop: true
  }
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const properties = lazyElements.find((element) => element.img === entry.target);
      const { img, container, video, poster, alt, loop = false } = properties;
      const videoElement = document.createElement('video');

      container.innerHTML = '';
      videoElement.src = video;
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
