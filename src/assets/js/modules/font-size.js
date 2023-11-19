function adjustFontSizeToFit(container) {

    let fontSize = 12; 
    container.style.width = 100 + '%';
    container.style.height = 100 + '%';
    
    const maxWidth = container.clientWidth;
    const maxHeight = container.clientHeight;
    const textElement = container.querySelector('.js-fit-content-text');

    textElement.style.fontSize = fontSize + 'px';

    while (textElement.scrollWidth <= maxWidth && textElement.scrollHeight <= maxHeight && fontSize < 100) {

        fontSize++;
        textElement.style.fontSize = fontSize + 'px';
    }

    // Reduce font size if it's too big
    if (textElement.scrollWidth > maxWidth || textElement.scrollHeight > maxHeight) {

        fontSize--;
        textElement.style.fontSize = fontSize + 'px';
    }

}

const init = () => {

    const allTextContainer = document.querySelectorAll('.js-fit-content-container');
    allTextContainer.forEach(textContainer => adjustFontSizeToFit(textContainer));

};

export { init };