export const init = () => {
    new Swiper(".swiper-container", {
        // Swiper options here
        slidesPerView: "auto",
        spaceBetween: 20,
        navigation: {
        nextEl: ".js-cardsection__btn--next",
        prevEl: ".js-cardsection__btn--prev",
        },
    });
};
