//init-cards.js

const allCardGalleries = document.querySelectorAll('.c-card-gallery');

const init = () => {
    //  make big lists scrollable
    allCardGalleries.forEach(gallery => {
        const cardGallery = gallery.querySelectorAll('.c-card');
        if (cardGallery.length > 2) {
            // if more than two children, make changes to the parent
            const parent = gallery.closest('.c-cardsection');
            parent.classList.add('c-cardsection--dyn');
            gallery.classList.add('c-card-gallery--dyn');

            const footer = parent.querySelector('.c-cardsection__footer');
            const prevButton = footer.querySelector('.c-cardsection__btn.prev');
            const nextButton = footer.querySelector('.c-cardsection__btn.next');

            let currentScrollPosition = Number(gallery.dataset.scrollPosition) || 0;
            let galleryWidth = gallery.offsetWidth;
            let cardWidth = 400;

            const updateSizes = () => {
                galleryWidth = gallery.offsetWidth;
                // get first element of cardGallery
                cardWidth = gallery.firstElementChild.offsetWidth;
            }

            updateSizes();

            nextButton.addEventListener('click', () => {
                let scrollOffset = cardWidth + 20;
                let potentialScrollPosition = currentScrollPosition + cardWidth + 20;

                if (window.innerWidth > 1040) {
                    scrollOffset = scrollOffset * 2;
                    potentialScrollPosition = currentScrollPosition + (cardWidth + 20) * 2;
                }

                currentScrollPosition = - Math.min(potentialScrollPosition, galleryWidth - scrollOffset);
                gallery.style.transform = `translate3d(${currentScrollPosition}px, 0, 0)`;
                gallery.style.transition = "transform 0.5s var(--ease-in-out)";
                gallery.dataset.scrollPosition = currentScrollPosition;
            });
            
            prevButton.addEventListener('click', () => {
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

            // Show the footer only when there are more than two items
            footer.style.display = "flex";

            window.addEventListener('resize', updateSizes);
        }
    });
};

export { init };
