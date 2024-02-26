export const init = () => {

  const image = document.querySelector(".c-hero__image");
    
  handleWindowResize();
  window.addEventListener("resize", handleWindowResize);

  function handleWindowResize() {
    if (window.innerWidth > 760) {
      image.style.transform = `translate3d(-55%, calc(20% - 10vw) , 0) scale(1)`;
    } else {
      image.style.transform = `translate3d(-10%, 20% , 0) scale(1.3)`;
    }
  }
};
