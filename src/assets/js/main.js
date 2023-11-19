// main.js

import { init as nav } from "./modules/navigation.js";
import { init as cards } from "./modules/init-cards.js";
import { init as gallery } from "./modules/init-gallery.js";
import { init as scroll } from "./modules/scrollEffect.js"; 
import { init as fontFit } from "./modules/font-size.js"; 

nav();
cards();
gallery();
scroll();
// fontFit();