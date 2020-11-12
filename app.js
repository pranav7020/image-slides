const image = document.querySelectorAll('.img');
const pic = document.querySelectorAll('.image');
const swipe = document.querySelector('.swipe');
const images = document.querySelector('.image-container');
const background = document.querySelector('.dummy');

let gestureX = [];
let gestureY = [];
let tolerance = 100;

let totalImages = image.length - 1;
let card = totalImages;

let interval;

const getCards = () => {
    let i = 0;
    interval = setInterval(() => {
        if (i === 0)
            image[i].style.transform = 'rotate(14deg)';
        else if (i === totalImages) {
            image[i].style.transform = 'rotate(0deg)';
            clearInterval(interval);
        }
        else if (0 < i < totalImages)
            image[i].style.transform = 'rotate(7deg)';
        else
            clearInterval(interval)
        i++;
    }, 50);
}

const resetCards = () => {
    card = totalImages;
    clearInterval(interval);
    for (i = 0; i <= totalImages; i++) {
        image[i].style.transform = 'rotate(-10deg) translateX(-200%)';
    }
}

resetCards();

const openGallery = () => {
    images.classList.add('view');
    background.classList.add('blur');
    getCards();
}

const closeGallery = () => {
    images.classList.remove('view');
    background.classList.remove('blur');
    resetCards();
}

const swipeLeft = () => {
    if (card <= totalImages)
        image[card].style.transform = 'rotate(-10deg) translateX(-200%)';
    if (card > 0) {
        image[card - 1].style.transform = 'rotate(0deg)';
        card -= 1;
    }
    else {
        card = totalImages;
        getCards();
    }
}

const swipeRight = () => {
    if (card === 1)
        image[card - 1].style.transform = 'rotate(14deg)';
    if (card < totalImages) {
        image[card].style.transform = 'rotate(7deg)';
        image[card + 1].style.transform = 'rotate(0deg)';
        card += 1;
    }
    else {
        card = totalImages;
    }
}

swipe.addEventListener('touchstart', (e) => {
    gestureX.push(e.touches[0].clientX);
    gestureY.push(e.touches[0].clientY);
});

swipe.addEventListener('touchmove', (e) => {
    gestureX.push(e.touches[0].clientX);
    gestureY.push(e.touches[0].clientY);
});

swipe.addEventListener('touchend', (e) => {
    xTravel = gestureX[gestureX.length - 1] - gestureX[0];
    yTravel = gestureY[gestureY.length - 1] - gestureY[0];
    if (yTravel < tolerance && yTravel > -tolerance && xTravel < -tolerance) {
        swipeLeft();
    }
    if (yTravel < tolerance && yTravel > -tolerance && xTravel > tolerance) {
        swipeRight();
    }
    gestureX = [];
    gestureY = [];
    xTravel = yTravel = '';
});

const next = () => {
    swipeLeft();
}

const prev = () => {
    swipeRight();
}