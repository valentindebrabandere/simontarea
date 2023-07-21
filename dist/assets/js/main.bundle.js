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

  // src/assets/js/main.js
  init();
})();
