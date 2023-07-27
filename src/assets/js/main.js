// main.js

import { init as nav } from "./modules/navigation.js";
import { init as cards } from "./modules/init-cards.js";
import { handleParallaxScroll } from "./modules/parallax.js"; 

nav();
cards();
handleParallaxScroll();