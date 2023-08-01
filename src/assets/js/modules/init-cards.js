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

            let galleryWidth = gallery.offsetWidth;
            let currentScrollPosition = 0;
            let cardWidth = 400;

            cardGallery.forEach((card, index) => {
                cardWidth = card.offsetWidth;
                const deco = card.querySelector('.c-card__deco');
                const direction = index % 2 === 0 ? -1 : 1;
                deco.setAttribute('data-rotate', 10* -direction + ', ' + direction);
                console.log("done")
            });

            nextButton.addEventListener('click', () => {
                let scrollOffset = cardWidth + 20;
                let potentialScrollPosition = currentScrollPosition + cardWidth + 20;
                currentScrollPosition = Math.min(potentialScrollPosition, galleryWidth - scrollOffset);
                gallery.style.transform = `translate3d(-${currentScrollPosition}px, 0, 0)`;
            });
            
            prevButton.addEventListener('click', () => {
                let potentialScrollPosition = currentScrollPosition - cardWidth - 20;
                currentScrollPosition = Math.max(potentialScrollPosition, 0);
                gallery.style.transform = `translate3d(-${currentScrollPosition}px, 0, 0)`;
            });

            // Show the footer only when there are more than two items
            footer.style.display = "flex";
        }
    });
};

export { init };
