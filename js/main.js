import App from './app';
import {loadData} from './functions/loadFunctions';

loadData().then((levelsSet) => App.init(levelsSet));
App.showWelcome();
