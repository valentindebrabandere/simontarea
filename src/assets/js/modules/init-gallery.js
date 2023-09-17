//init-cards.js

const allCardGalleries = document.querySelectorAll(".c-card-gallery");
const scrollY = window.scrollY;
const viewportHeight = window.innerHeight;

const init = () => {
  //  make big lists scrollable
  allCardGalleries.forEach((gallery) => {
    const cardGallery = gallery.querySelectorAll(".c-card");
    if (cardGallery.length > 2) {
      // if more than two children, make changes to the parent
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
        let newCurrentScrollPosition =
          Number(gallery.dataset.scrollPosition) || 0;
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
        let newCurrentScrollPosition =
          Number(gallery.dataset.scrollPosition) || 0;
        let potentialScrollPosition = newCurrentScrollPosition - cardWidth;

        if (window.innerWidth > 1040) {
          potentialScrollPosition = newCurrentScrollPosition - scrollOffset * 2;
        }

        newCurrentScrollPosition = Math.max(potentialScrollPosition, 0);

        gallery.style.transform = `translate3d(-${newCurrentScrollPosition}px, 0, 0)`;
        gallery.style.transition = "transform 0.5s var(--ease-in-out)";
        gallery.dataset.scrollPosition = newCurrentScrollPosition;
      });

      // Show the footer only when there are more than two items
      footer.style.display = "flex";

      window.addEventListener("resize", updateSizes);

      // user scroll
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

        // Disable the transition while dragging for smoothness
        gallery.style.transition = "none";
      }

      function duringDrag(e) {
        if (!isDragging) return;

        const x = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
        const deltaX = x - startX;

        currentTranslateX = initialScrollPosition - deltaX;

        // Update gallery position while dragging
        gallery.style.transform = `translate3d(-${currentTranslateX}px, 0, 0)`;
      }

      function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;

        // Store the final scroll position in the dataset
        gallery.dataset.scrollPosition = currentTranslateX;

        // Re-enable the transition after dragging
        gallery.style.transition = "transform 0.5s var(--ease-in-out)";
      }
    }
  });
};

export { init };
