const slides = document.querySelectorAll('.slide');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');

upButton.addEventListener('click', () => changeSlide('up'));
downButton.addEventListener('click', () => changeSlide('down'));

const changeSlide = (direction) => {
    const activeSlide = document.querySelector('.slide.active');
    const activeSlideRight = activeSlide.querySelector('.right-slide');
    const activeSlideLeft = activeSlide.querySelector('.left-slide');
    let indexActiveSlide = [...activeSlide.parentElement.children].indexOf(activeSlide);

    if(direction === 'up') {
        indexActiveSlide++;
        activeSlideRight.style.transform = 'translateY(-100%)'
        activeSlideLeft.style.transform = 'translateY(100%)'
        if(indexActiveSlide >= slides.length) {
            indexActiveSlide = 0;
        }
    } else if (direction === 'down') {
        indexActiveSlide--;
        activeSlideRight.style.transform = 'translateY(100%)'
        activeSlideLeft.style.transform = 'translateY(-100%)'
        if(indexActiveSlide < 0) {
            indexActiveSlide = slides.length - 1;
        }
    }

    activeSlide.classList.remove('active');
    slides[indexActiveSlide].classList.add('active');
    // slides[indexActiveSlide].style.transform = 'translateY(0)';
    // slides[indexActiveSlide].style.transform = 'translateY(0)';
}