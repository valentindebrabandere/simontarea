(() => {
  // src/assets/js/modules/navigation.js
  var SELECTORS = {
    body: document.querySelector("body"),
    menu: document.querySelector(".js-mobilemenu"),
    triggers: document.querySelectorAll(".js-menutrigger")
  };
  var CLASSES = {
    open: "is-open",
    active: "has-menu"
  };
  var init = () => {
    SELECTORS.triggers.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        SELECTORS.menu.classList.toggle(CLASSES.open);
        SELECTORS.body.classList.toggle(CLASSES.active);
      });
    });
  };

  // src/assets/js/modules/parallax.js
  var clapIcon = document.querySelector(".c-hero__deco-container.clap");
  var clockIcon = document.querySelector(".c-hero__deco-container.clock");
  var bicepsIcon = document.querySelector(".c-hero__deco-container.biceps");
  var trophyIcon = document.querySelector(".c-hero__deco-container.trophy");
  var image = document.querySelector(".c-hero__image");
  var icons = document.querySelectorAll(".c-hero__deco");
  function handleParallaxScroll() {
    const scrollY = window.scrollY;
    const clapParallax = scrollY * 0.07;
    const clockParallax = scrollY * 0.03;
    const bicepsParallax = scrollY * 0.05;
    const trophyParallax = scrollY * 0.04;
    const imageParallax = scrollY * 0.03;
    icons.forEach((icon) => {
      let rotate = icon.getAttribute("data-rotate").split(",");
      let value = Number(rotate[0]);
      let direction = rotate[1].trim();
      let rotateValue = value + scrollY * 0.03 * direction;
      icon.style.transform = `translate3d(-50%, calc(-50% - ${scrollY * 0.02}px),0) rotate(${rotateValue}deg)`;
    });
    clapIcon.style.transform = `translateY(${clapParallax}px)`;
    clockIcon.style.transform = `translateY(${clockParallax}px)`;
    bicepsIcon.style.transform = `translateY(${bicepsParallax}px)`;
    trophyIcon.style.transform = `translateY(${trophyParallax}px)`;
    function handleWindowResize2() {
      if (window.innerWidth > 760) {
        image.style.transform = `translate3d(-55%, calc(20% - 10vw + ${imageParallax + "px"}) , 0) scale(1)`;
      } else {
        image.style.transform = `translate3d(-10%, calc(20% + ${imageParallax + "px"}) , 0) scale(1.3)`;
      }
    }
    handleWindowResize2();
  }
  window.addEventListener("scroll", handleParallaxScroll);
  window.addEventListener("resize", handleWindowResize);

  // src/assets/js/main.js
  init();
  handleParallaxScroll();
  init();
})();
