import {Module} from 'a1atscript';
import * as HomepageControllers from './homepageControllers.js';
import * as HomepageStates from './homepageStates.js';
import * as CodeTabsComponents from "./codeTabsComponents.js";

var Homepage = new Module('homepage', [
  HomepageControllers,
  HomepageStates,
  CodeTabsComponents
]);

export default Homepage;
