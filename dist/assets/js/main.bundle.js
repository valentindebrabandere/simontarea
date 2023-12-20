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
        console.log(card);
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
        let startDrag = function(e) {
          isDragging = true;
          startX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
          initialScrollPosition = Number(gallery.dataset.scrollPosition) || 0;
          gallery.style.transition = "none";
        }, duringDrag = function(e) {
          if (!isDragging)
            return;
          const x = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
          const deltaX = x - startX;
          currentTranslateX = initialScrollPosition - deltaX;
          gallery.style.transform = `translate3d(-${currentTranslateX}px, 0, 0)`;
        }, endDrag = function(e) {
          if (!isDragging)
            return;
          isDragging = false;
          gallery.dataset.scrollPosition = currentTranslateX;
          gallery.style.transition = "transform 0.5s var(--ease-in-out)";
        };
        const parent = gallery.closest(".c-cardsection");
        const scroll = gallery.closest(".js-cardesction__scroll");
        parent.classList.add("c-cardsection--dyn");
        scroll.classList.add("js-cardesction__scroll--dyn");
        gallery.classList.add("c-card-gallery--dyn");
        const footer = parent.querySelector(".c-cardsection__footer");
        const prevButton = footer.querySelector(".c-cardsection__btn.prev");
        const nextButton = footer.querySelector(".c-cardsection__btn.next");
        let galleryWidth = gallery.offsetWidth;
        let cardWidth = 400;
        const updateSizes = () => {
          galleryWidth = gallery.offsetWidth;
          cardWidth = gallery.firstElementChild.offsetWidth;
        };
        updateSizes();
        let scrollOffset = cardWidth + 20;
        nextButton.addEventListener("click", () => {
          let newCurrentScrollPosition = Number(gallery.dataset.scrollPosition) || 0;
          let potentialScrollPosition = newCurrentScrollPosition + scrollOffset;
          if (window.innerWidth > 1040) {
            potentialScrollPosition = newCurrentScrollPosition + scrollOffset * 2;
          }
          newCurrentScrollPosition = -Math.min(
            potentialScrollPosition,
            galleryWidth - scrollOffset
          );
          gallery.style.transform = `translate3d(${newCurrentScrollPosition}px, 0, 0)`;
          gallery.style.transition = "transform 0.5s var(--ease-in-out)";
          gallery.dataset.scrollPosition = -newCurrentScrollPosition;
        });
        prevButton.addEventListener("click", () => {
          let newCurrentScrollPosition = Number(gallery.dataset.scrollPosition) || 0;
          let potentialScrollPosition = newCurrentScrollPosition - cardWidth;
          if (window.innerWidth > 1040) {
            potentialScrollPosition = newCurrentScrollPosition - scrollOffset * 2;
          }
          newCurrentScrollPosition = Math.max(potentialScrollPosition, 0);
          gallery.style.transform = `translate3d(-${newCurrentScrollPosition}px, 0, 0)`;
          gallery.style.transition = "transform 0.5s var(--ease-in-out)";
          gallery.dataset.scrollPosition = newCurrentScrollPosition;
        });
        footer.style.display = "flex";
        window.addEventListener("resize", updateSizes);
        let isDragging = false;
        let startX, currentTranslateX, initialScrollPosition;
        gallery.addEventListener("mousedown", startDrag);
        gallery.addEventListener("touchstart", startDrag);
        gallery.addEventListener("mousemove", duringDrag);
        gallery.addEventListener("touchmove", duringDrag);
        gallery.addEventListener("mouseup", endDrag);
        gallery.addEventListener("touchend", endDrag);
        gallery.addEventListener("mouseleave", endDrag);
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
        gallery.style.transform = `translate3d(${currentScrollPosition}px, 0, 0)`;
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

  // src/assets/js/main.js
  document.body.classList.add("js-enabled");
  init();
  init5();
  init2();
  init3();
  init4();
})();
