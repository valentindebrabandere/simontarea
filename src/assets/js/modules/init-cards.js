//init-cards.js

const allCardGalleries = document.querySelectorAll('.js-init-cards');

const init = () => {
    allCardGalleries.forEach(gallery => {
        const cardGallery = gallery.querySelectorAll('.c-card');
            cardGallery.forEach((card, index) => {
                console.log(card)
                const deco = card.querySelector('.c-card__deco');
                const direction = index % 2 === 0 ? -1 : 1;
                deco.setAttribute('data-rotate', 10* -direction + ', ' + direction);
            });
    });
};

export { init };
