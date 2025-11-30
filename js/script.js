const images = [
    'https://wp-socialnation-assets.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/05/25185045/Money-Heist-1152x759.png',
    'https://images2.alphacoders.com/134/1345084.jpeg',
    'https://1.bp.blogspot.com/-MqMTmWfp7ls/X-ngGrN96ZI/AAAAAAAAZsg/wnzSatIi5lsB7_GujOSN4fcbSUmk8BIzQCPcBGAYYCw/s2460/Bridgerton-Season-1-poster-simon-basset-43618722-2460-1080.jpg'
];

const slideDuration = 9000; // 9 seconds
const sliderWrapper = document.getElementById('slider-wrapper');

let currentIndex = 0;
let autoSlideInterval;

function initSlider() {
    images.forEach((imageUrl, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.backgroundImage = `url('${imageUrl}')`;
        sliderWrapper.appendChild(slide);
    });
    moveSlider(currentIndex);
}

function moveSlider(index) {
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    moveSlider(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    moveSlider(currentIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideDuration);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.querySelector('.arrow.left').addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

document.querySelector('.arrow.right').addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

let touchStartX = 0;

sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoSlide();
});

sliderWrapper.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }

    startAutoSlide();
});
document.addEventListener('DOMContentLoaded', function() {
    const scrollAreas = document.querySelectorAll('.scroll-area');
    
    scrollAreas.forEach(scrollArea => {
        const leftArrow = scrollArea.parentElement.querySelector('.arrow.left');
        const rightArrow = scrollArea.parentElement.querySelector('.arrow.right');
        
        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => {
                scrollArea.scrollBy({
                    left: -300, // Adjust scroll distance as needed
                    behavior: 'smooth'
                });
            });
            
            rightArrow.addEventListener('click', () => {
                scrollArea.scrollBy({
                    left: 300, // Adjust scroll distance as needed
                    behavior: 'smooth'
                });
            });
        }
    });
});

initSlider();
startAutoSlide();
