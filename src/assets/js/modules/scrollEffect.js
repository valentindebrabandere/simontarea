// parallax.js

// TODO - solve problem with mobile dynamic gallery

// Get references to the elements you want to animate
const image = document.querySelector(".c-hero__image");
const decoContainer = document.querySelectorAll(".c-deco-img-container");
const decoImg = document.querySelectorAll(".c-deco-img");

let timeouts = []; // Store all timeouts in an array

// Function to handle the scroll event and update element positions
export function init() {
  scrollHandler();
  window.addEventListener("scroll", scrollHandler);

  handleWindowResize();
  window.addEventListener("resize", handleWindowResize);
}

function scrollHandler() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // // Parallax effect for the hero image
  // decoContainer.forEach((container) => {
  //   const elementTop = container.getBoundingClientRect().top + scrollY;
  //   const scrollProgress = Math.max(
  //     0,
  //     Math.min(1, (scrollY - elementTop + viewportHeight) / viewportHeight)
  //   );
  //   let parallax = Number(container.dataset.parallax || 0.01);
  //   let parallaxValue = scrollProgress * parallax * viewportHeight;
  //   container.style.transform = `translate3d(-50%, calc(-50% + ${
  //     parallaxValue + "px"
  //   }), 0)`;
  // });

  // Parallax effect for the deco images
  decoImg.forEach((icon) => {
    const elementTop = icon.getBoundingClientRect().top + scrollY;
    const scrollProgress = Math.max(
      0,
      Math.min(1, (scrollY - elementTop + viewportHeight) / viewportHeight)
    );

    let rotate = icon.dataset.rotate.split(",");
    let value = Number(rotate[0]);
    let direction = rotate[1].trim();
    let rotateValue = value + scrollProgress * 20 * direction;
    let parallaxValue = scrollProgress * 0.02 * viewportHeight;
    icon.style.transform = `translate3d(-50%, calc(-50% - ${
      parallaxValue + "px"
    }),0) rotate(${rotateValue}deg)`;
  });

  const dynGallery = document.querySelectorAll(".js-cardesction__scroll--dyn");

  dynGallery.forEach((gallery) => {
    let currentScrollPosition = 50;

    const elementTopFromViewport = gallery.getBoundingClientRect().top;
    const elementBottomFromViewport = gallery.getBoundingClientRect().bottom;

    // Check if the top of the element is entering or is within the viewport
    if (
      elementTopFromViewport <= viewportHeight &&
      elementBottomFromViewport >= 0
    ) {
      // Calculate progress such that it is 0 when the top just enters and 1 when the bottom just leaves the viewport
      const scrollProgress =
        (viewportHeight - elementTopFromViewport) /
        (viewportHeight + gallery.offsetHeight);

      let scrollAnim = scrollProgress * 0.1 * viewportHeight;
      currentScrollPosition -= scrollAnim;

      gallery.style.transform = `translate3d(${currentScrollPosition}px, 0, 0)`;
    }
  });
}

function handleWindowResize() {
  const imageParallax = scrollY * 0.03;

  if (window.innerWidth > 760) {
    image.style.transform = `translate3d(-55%, calc(20% - 10vw + ${
      imageParallax + "px"
    }) , 0) scale(1)`;
  } else {
    image.style.transform = `translate3d(-10%, calc(20% + ${
      imageParallax + "px"
    }) , 0) scale(1.3)`;
  }
}
