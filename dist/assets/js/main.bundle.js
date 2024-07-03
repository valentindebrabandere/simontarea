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

  // src/assets/js/modules/init-cards.js
  var allCardGalleries = document.querySelectorAll(".js-init-cards");
  var init2 = () => {
    allCardGalleries.forEach((gallery) => {
      const cardGallery = gallery.querySelectorAll(".c-card");
      cardGallery.forEach((card, index) => {
        const deco = card.querySelector(".c-card__deco");
        const direction = index % 2 === 0 ? -1 : 1;
        deco.setAttribute("data-rotate", 10 * -direction + ", " + direction);
      });
    });
  };

  // src/assets/js/modules/init-gallery.js
  var init3 = () => {
    new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 20,
      navigation: {
        nextEl: ".js-cardsection__btn--next",
        prevEl: ".js-cardsection__btn--prev"
      }
    });
  };

  // src/assets/js/modules/scrollEffect.js
  var decoContainer = document.querySelectorAll(".c-deco-img-container");
  var decoImg = document.querySelectorAll(".c-deco-img");
  function init4() {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
  }
  function scrollHandler() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
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
      icon.style.transform = `translate3d(-50%, calc(-50% - ${parallaxValue + "px"}),0) rotate(${rotateValue}deg)`;
    });
    const dynGallery = document.querySelectorAll(".js-cardesction__scroll--dyn");
    dynGallery.forEach((gallery) => {
      let currentScrollPosition = 50;
      const elementTopFromViewport = gallery.getBoundingClientRect().top;
      const elementBottomFromViewport = gallery.getBoundingClientRect().bottom;
      if (elementTopFromViewport <= viewportHeight && elementBottomFromViewport >= 0) {
        const scrollProgress = (viewportHeight - elementTopFromViewport) / (viewportHeight + gallery.offsetHeight);
        let scrollAnim = scrollProgress * 0.1 * viewportHeight;
        currentScrollPosition -= scrollAnim;
        gallery.style.translate = `${currentScrollPosition}px 0 0`;
      }
    });
  }

  // src/assets/js/modules/animation.js
  var observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("js-show");
      } else {
        entry.target.classList.remove("js-show");
      }
    });
  });
  var init5 = () => {
    const allShowTransition = document.querySelectorAll(".js-anim");
    allShowTransition.forEach((item) => {
      item.style.transition = "opacity 0.5s ease-out, translate 0.5s ease-out, scale 0.5s ease-out";
      observer.observe(item);
    });
  };

  // src/assets/js/modules/init-hero.js
  var init6 = () => {
    const image = document.querySelector(".c-hero__image");
    if (image) {
      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);
    }
    function handleWindowResize() {
      if (window.innerWidth > 760) {
        image.style.transform = `translate3d(-55%, calc(20% - 10vw) , 0) scale(1)`;
      } else {
        image.style.transform = `translate3d(-10%, 20% , 0) scale(1.3)`;
      }
    }
  };

  // src/assets/js/main.js
  document.body.classList.add("js-enabled");
  init();
  init5();
  init2();
  init3();
  init4();
  init6();
})();
