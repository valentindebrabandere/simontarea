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
  var allCardGalleries2 = document.querySelectorAll(
    ".c-gallery-section__gallery"
  );
  var cardSpacing = 20;
  var cardWidth = 300;
  var galleryWidth;
  var scrollOffset = cardWidth + cardSpacing * 2;
  function addFooter(parent, gallery) {
    const footerHTML = `<div class="c-gallery-section__footer">
   <button class="c-gallery-section__btn prev">prev</button>
   <button class="c-gallery-section__btn next">next</button>
  </div>`;
    parent.insertAdjacentHTML("beforeend", footerHTML);
    const prevButton = parent.querySelector(".prev");
    const nextButton = parent.querySelector(".next");
    const footer = parent.querySelector(".c-gallery-section__footer");
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
      gallery.style.transition = "transform 0.5s ease-in-out";
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
      gallery.style.transition = "transform 0.5s ease-in-out";
      gallery.dataset.scrollPosition = newCurrentScrollPosition;
    });
    footer.style.display = "flex";
  }
  var init3 = () => {
    allCardGalleries2.forEach((gallery) => {
      const parent = gallery.parentElement;
      if (parent.classList.contains("c-gallery-section--footer")) {
        addFooter(parent, gallery);
      }
      galleryWidth = gallery.offsetWidth;
      cardWidth = gallery.firstElementChild.offsetWidth;
      scrollOffset = cardWidth + cardSpacing * 2;
      const updateSizes = () => {
        galleryWidth = gallery.offsetWidth;
        cardWidth = gallery.firstElementChild.offsetWidth;
        scrollOffset = cardWidth + cardSpacing * 2;
      };
      updateSizes();
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
      function startDrag(e) {
        isDragging = true;
        startX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
        initialScrollPosition = Number(gallery.dataset.scrollPosition) || 0;
        gallery.style.transition = "none";
      }
      function duringDrag(e) {
        if (!isDragging)
          return;
        const x = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
        const deltaX = x - startX;
        currentTranslateX = initialScrollPosition - deltaX;
        gallery.style.transform = `translate3d(-${currentTranslateX}px, 0, 0)`;
      }
      function endDrag(e) {
        if (!isDragging)
          return;
        isDragging = false;
        const minDragDistance = cardWidth + cardSpacing * 2;
        let finalScrollPosition = currentTranslateX;
        let dragDistance = initialScrollPosition - currentTranslateX;
        if (Math.abs(dragDistance) < minDragDistance) {
          if (dragDistance > 0) {
            finalScrollPosition = initialScrollPosition - minDragDistance;
            gallery.style.transition = "transform 0.5s ease-in-out";
          } else {
            finalScrollPosition = initialScrollPosition + minDragDistance;
            gallery.style.transition = "transform 0.5s ease-in-out";
          }
        }
        finalScrollPosition = Math.max(Math.min(finalScrollPosition, galleryWidth - scrollOffset), 0);
        gallery.style.transform = `translate3d(-${finalScrollPosition}px, 0, 0)`;
        gallery.dataset.scrollPosition = finalScrollPosition;
        gallery.style.transition = "transform 0.5s ease-in-out";
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
