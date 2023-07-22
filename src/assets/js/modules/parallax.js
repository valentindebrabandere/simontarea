// parallax.js

// Get references to the elements you want to animate
const clapIcon = document.querySelector('.c-hero__deco-container.clap');
const clockIcon = document.querySelector('.c-hero__deco-container.clock');
const bicepsIcon = document.querySelector('.c-hero__deco-container.biceps');
const trophyIcon = document.querySelector('.c-hero__deco-container.trophy');
const image = document.querySelector('.c-hero__image');

const icons = document.querySelectorAll('.c-hero__deco')

// Function to handle the scroll event and update element positions
export function handleParallaxScroll() {

    const scrollY = window.scrollY;

    // Calculate the parallax effect for each element
    const clapParallax = scrollY * 0.07;
    const clockParallax = scrollY * 0.03;
    const bicepsParallax = scrollY * 0.05;
    const trophyParallax = scrollY * 0.04;
    const imageParallax = scrollY * 0.03;

    icons.forEach(icon => {
        let rotate = icon.getAttribute('data-rotate').split(','); // split the value and direction
        let value = Number(rotate[0]);
        let direction = rotate[1].trim();
        let rotateValue = value + (scrollY * 0.03 * direction);
        icon.style.transform = `translate3d(-50%, calc(-50% - ${scrollY * 0.02}px),0) rotate(${rotateValue}deg)`;
    })

    // Apply the transform to each element
    clapIcon.style.transform = `translateY(${clapParallax}px)`;
    clockIcon.style.transform = `translateY(${clockParallax}px)`;
    bicepsIcon.style.transform = `translateY(${bicepsParallax}px)`;
    trophyIcon.style.transform = `translateY(${trophyParallax}px)`;

    function handleWindowResize() {
        if (window.innerWidth > 760) {
            // FILEPATH: /Users/Valou/code/simontarea/src/assets/js/modules/parallax.js
            // BEGIN: be15d9bcejpp
            image.style.transform = `translate3d(-55%, calc(20% - 10vw + ${imageParallax + "px"}) , 0) scale(1)`;
            // END: be15d9bcejpp
        } else {
            // FILEPATH: /Users/Valou/code/simontarea/src/assets/js/modules/parallax.js
            // BEGIN: be15d9bcejpp
            image.style.transform = `translate3d(-10%, calc(20% + ${imageParallax + "px"}) , 0) scale(1.3)`;
            // END: be15d9bcejpp
        }
    }

    // Check the window width on page load
    handleWindowResize();
    
}

// Add the event listener to the scroll event
window.addEventListener('scroll', handleParallaxScroll);
window.addEventListener('resize', handleWindowResize);
