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
  var allCardGalleries = document.querySelectorAll(".c-card-gallery");
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
  var allCardGalleries2 = document.querySelectorAll(".c-card-gallery");
  var init3 = () => {
    allCardGalleries2.forEach((gallery) => {
      const cardGallery = gallery.querySelectorAll(".c-card");
      if (cardGallery.length > 2) {
        const parent = gallery.closest(".c-cardsection");
        parent.classList.add("c-cardsection--dyn");
        gallery.classList.add("c-card-gallery--dyn");
        const footer = parent.querySelector(".c-cardsection__footer");
        const prevButton = footer.querySelector(".c-cardsection__btn.prev");
        const nextButton = footer.querySelector(".c-cardsection__btn.next");
        let currentScrollPosition = Number(gallery.dataset.scrollPosition) || 0;
        let galleryWidth = gallery.offsetWidth;
        let cardWidth = 400;
        const updateSizes = () => {
          galleryWidth = gallery.offsetWidth;
          cardWidth = gallery.firstElementChild.offsetWidth;
        };
        updateSizes();
        nextButton.addEventListener("click", () => {
          let scrollOffset = cardWidth + 20;
          let potentialScrollPosition = currentScrollPosition + cardWidth + 20;
          if (window.innerWidth > 1040) {
            scrollOffset = scrollOffset * 2;
            potentialScrollPosition = currentScrollPosition + (cardWidth + 20) * 2;
          }
          currentScrollPosition = -Math.min(potentialScrollPosition, galleryWidth - scrollOffset);
          gallery.style.transform = `translate3d(${currentScrollPosition}px, 0, 0)`;
          gallery.style.transition = "transform 0.5s var(--ease-in-out)";
          gallery.dataset.scrollPosition = currentScrollPosition;
        });
        prevButton.addEventListener("click", () => {
          let potentialScrollPosition = currentScrollPosition - cardWidth - 20;
          currentScrollPosition = Math.max(potentialScrollPosition, 0);
          if (window.innerWidth > 1040) {
            potentialScrollPosition = currentScrollPosition - (cardWidth + 20) * 2;
            currentScrollPosition = Math.max(potentialScrollPosition, 0);
          }
          gallery.style.transform = `translate3d(-${currentScrollPosition}px, 0, 0)`;
          gallery.style.transition = "transform 0.5s var(--ease-in-out)";
          gallery.dataset.scrollPosition = currentScrollPosition;
        });
        footer.style.display = "flex";
        window.addEventListener("resize", updateSizes);
      }
    });
  };

  // src/assets/js/modules/scrollEffect.js
  var image = document.querySelector(".c-hero__image");
  var decoContainer = document.querySelectorAll(".c-deco-img-container");
  var decoImg = document.querySelectorAll(".c-deco-img");
  var timeouts = [];
  function init4() {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }
  function scrollHandler() {
    const scrollY2 = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    decoContainer.forEach((container) => {
      const elementTop = container.getBoundingClientRect().top + scrollY2;
      const scrollProgress = Math.max(
        0,
        Math.min(1, (scrollY2 - elementTop + viewportHeight) / viewportHeight)
      );
      let parallax = Number(container.dataset.parallax || 0.01);
      let parallaxValue = scrollProgress * parallax * viewportHeight;
      container.style.transform = `translate3d(-50%, calc(-50% + ${parallaxValue + "px"}), 0)`;
    });
    decoImg.forEach((icon) => {
      const elementTop = icon.getBoundingClientRect().top + scrollY2;
      const scrollProgress = Math.max(
        0,
        Math.min(1, (scrollY2 - elementTop + viewportHeight) / viewportHeight)
      );
      let rotate = icon.dataset.rotate.split(",");
      let value = Number(rotate[0]);
      let direction = rotate[1].trim();
      let rotateValue = value + scrollProgress * 20 * direction;
      let parallaxValue = scrollProgress * 0.02 * viewportHeight;
      icon.style.transform = `translate3d(-50%, calc(-50% - ${parallaxValue + "px"}),0) rotate(${rotateValue}deg)`;
    });
    let timeout = null;
    const dynGallery = document.querySelectorAll(".c-card-gallery--dyn");
    dynGallery.forEach((gallery, index) => {
      let currentScrollPosition = Number(gallery.dataset.scrollPosition) || 0;
      const elementTop = gallery.getBoundingClientRect().top + scrollY2;
      const scrollProgress = Math.max(
        0,
        Math.min(1, (scrollY2 - elementTop + viewportHeight) / viewportHeight)
      );
      let scrollAnim = scrollProgress * 0.1 * viewportHeight;
      currentScrollPosition -= scrollAnim;
      gallery.style.transition = "none";
      gallery.style.transform = `translate3d( ${currentScrollPosition + "px"} , 0, 0)`;
      if (timeouts[index]) {
        clearTimeout(timeouts[index]);
      }
      timeouts[index] = setTimeout(() => {
        console.log("save scroll position");
        gallery.dataset.scrollPosition = currentScrollPosition;
      }, 300);
    });
  }
  function handleWindowResize() {
    const imageParallax = scrollY * 0.03;
    if (window.innerWidth > 760) {
      image.style.transform = `translate3d(-55%, calc(20% - 10vw + ${imageParallax + "px"}) , 0) scale(1)`;
    } else {
      image.style.transform = `translate3d(-10%, calc(20% + ${imageParallax + "px"}) , 0) scale(1.3)`;
    }
  }

  // src/assets/js/main.js
  init();
  init2();
  init3();
  init4();
})();
