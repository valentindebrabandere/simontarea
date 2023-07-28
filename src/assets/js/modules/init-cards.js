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

            const nextButton = document.querySelector('.c-cardsection__btn.next');
            const prevButton = document.querySelector('.c-cardsection__btn.prev');
            const footer = parent.querySelector('.c-cardsection__footer');

            nextButton.addEventListener('click', () => {
                parent.scrollLeft += 400; // adjust the value as needed
            });

            prevButton.addEventListener('click', () => {
                parent.scrollLeft -= 400; // adjust the value as needed
            });

            // Show the footer only when there are more than two items
            footer.style.display = "flex";
        }

        cardGallery.forEach((card, index) => {
            const deco = card.querySelector('.c-card__deco');
            const direction = index % 2 === 0 ? -1 : 1;
            deco.setAttribute('data-rotate', 10* -direction + ', ' + direction);
        });
    });
};

export { init };
