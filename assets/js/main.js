
let slideItems = document.querySelectorAll('.slide');
let indContainer = document.querySelector('.indicators');
let indItems = document.querySelectorAll('.indicator')
let slidelength = slideItems.length;
let currentSlide = 0;
let carouselInterval = 5000;

const LEFT_ARROW = 'ArrowLetf';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';

document.querySelector('.controls').style.display = 'inline-block';
indContainer.style.display = 'inline-block';

function gotoNSlide(n) {
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (n + slidelength) % slidelength;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
}

let gotoNextSlide = () => gotoNSlide(currentSlide +1);

let gotoPrevSlide = () =>   gotoNSlide(currentSlide -1);


let playbackStatus = true;
let pauseBtn = document.querySelector('#pause');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');

let pauseSlideShow = () => {
  if (playbackStatus){ 
    clearInterval(slideInterval);
    pauseBtn.innerHTML = 'Play'
    playbackStatus = !playbackStatus;
  }
}

let playSlideShow = () => {
  slideInterval = setInterval(gotoNextSlide, carouselInterval);
  pauseBtn.innerHTML = 'Pause';
  playbackStatus = !playbackStatus;
}

let clickPausePlayBtn = () => {
  playbackStatus ? pauseSlideShow() : playSlideShow();
};

let clickPrevBtn = () => {
  pauseSlideShow();
  gotoPrevSlide(); 
};

let clickNextBtn = () => {
  pauseSlideShow();
  gotoNextSlide(); 
};

pauseBtn.addEventListener('click', clickPausePlayBtn);
prevBtn.addEventListener('click', clickPrevBtn);
nextBtn.addEventListener('click', clickNextBtn);

function clickIndicatorBtn(e) {
  let target = e.target;

  if (target.classList.contains('indicator')) {
  pauseSlideShow();
  gotoNSlide(+target.getAttribute('data-slide-to'));
  }
}

indContainer.addEventListener('click', clickIndicatorBtn);

function pressKeyControl(e){
  if (e.key === LEFT_ARROW) clickPrevBtn();
  if (e.key === RIGHT_ARROW) clickNextBtn();
  if (e.key === SPACE) clickPausePlayBtn();
}

document.addEventListener('keydown', pressKeyControl)
slideInterval = setInterval(gotoNextSlide, carouselInterval);