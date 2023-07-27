// parallax.js

// Get references to the elements you want to animate
const image = document.querySelector(".c-hero__image");
const decoContainer = document.querySelectorAll(".c-deco-img-container");
const decoImg = document.querySelectorAll(".c-deco-img");

// Function to handle the scroll event and update element positions
export function handleParallaxScroll() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  decoContainer.forEach((container) => {
    const elementTop = container.getBoundingClientRect().top + scrollY;
    const scrollProgress = Math.max(
      0,
      Math.min(1, (scrollY - elementTop + viewportHeight) / viewportHeight)
    );
    let parallax = container.getAttribute("data-parallax");
    if (parallax === null) {
      parallax = 0.01;
    }
    let parallaxValue = scrollProgress * parallax * viewportHeight;
    container.style.transform = `translate3d(-50%, calc(-50% + ${
      parallaxValue + "px"
    }), 0)`;
  });

  decoImg.forEach((icon) => {
    const elementTop = icon.getBoundingClientRect().top + scrollY;
    const scrollProgress = Math.max(
      0,
      Math.min(1, (scrollY - elementTop + viewportHeight) / viewportHeight)
    );

    let rotate = icon.getAttribute("data-rotate").split(",");
    let value = Number(rotate[0]);
    let direction = rotate[1].trim();
    let rotateValue = value + scrollProgress * 20 * direction;
    let parallaxValue = scrollProgress * 0.02 * viewportHeight;
    icon.style.transform = `translate3d(-50%, calc(-50% - ${
      parallaxValue + "px"
    }),0) rotate(${rotateValue}deg)`;
  });

  function handleWindowResize() {
    const imageParallax = scrollY * 0.03;

    if (window.innerWidth > 760) {
      image.style.transform = `translate3d(-55%, calc(20% - 10vw + ${ imageParallax + "px"}) , 0) scale(1)`;
    } else {
      image.style.transform = `translate3d(-10%, calc(20% + ${ imageParallax + "px"}) , 0) scale(1.3)`;
    }
  }

  handleWindowResize();

  window.addEventListener("resize", handleWindowResize);
}

// Add the event listener to the scroll event
window.addEventListener("scroll", handleParallaxScroll);
