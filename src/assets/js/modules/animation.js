//init-cards.js

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add('js-show');
        }
        else {
            entry.target.classList.remove('js-show');
        }

    });
});


const init = () => {
    
    const allShowTransition = document.querySelectorAll('.js-anim');
    
    allShowTransition.forEach((item) => {
        item.style.transition = 'opacity 0.5s ease-out, translate 0.5s ease-out, scale 0.5s ease-out';
        observer.observe(item);
    });

};


export { init };
