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
      if (cardGallery.length > 2) {
        const parent = gallery.closest(".c-cardsection");
        parent.classList.add("c-cardsection--dyn");
        gallery.classList.add("c-card-gallery--dyn");
        cardGallery.forEach((card) => {
          card.classList.add("c-card--dyn");
        });
        const nextButton = parent.querySelector(".c-cardsection__btn.next");
        const prevButton = parent.querySelector(".c-cardsection__btn.prev");
        const footer = parent.querySelector(".c-cardsection__footer");
        nextButton.addEventListener("click", () => {
          parent.scrollLeft += 400;
        });
        prevButton.addEventListener("click", () => {
          parent.scrollLeft -= 400;
        });
        footer.style.display = "flex";
      }
      cardGallery.forEach((card, index) => {
        const deco = card.querySelector(".c-card__deco");
        const direction = index % 2 === 0 ? -1 : 1;
        deco.setAttribute("data-rotate", 10 * -direction + ", " + direction);
      });
    });
  };

  // src/assets/js/modules/parallax.js
  var image = document.querySelector(".c-hero__image");
  var decoContainer = document.querySelectorAll(".c-deco-img-container");
  var decoImg = document.querySelectorAll(".c-deco-img");
  function handleParallaxScroll() {
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
      container.style.transform = `translate3d(-50%, calc(-50% + ${parallaxValue + "px"}), 0)`;
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
      icon.style.transform = `translate3d(-50%, calc(-50% - ${parallaxValue + "px"}),0) rotate(${rotateValue}deg)`;
    });
    function handleWindowResize() {
      const imageParallax = scrollY * 0.03;
      if (window.innerWidth > 760) {
        image.style.transform = `translate3d(-55%, calc(20% - 10vw + ${imageParallax + "px"}) , 0) scale(1)`;
      } else {
        image.style.transform = `translate3d(-10%, calc(20% + ${imageParallax + "px"}) , 0) scale(1.3)`;
      }
    }
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }
  window.addEventListener("scroll", handleParallaxScroll);

  // src/assets/js/main.js
  init();
  init2();
  handleParallaxScroll();
})();
