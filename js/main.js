import App from './app';
import {loadData} from './functions/server-communication-functions';

loadData().then((levelsSet) => App.init(levelsSet),
    () => window.console.log(`There some problem with loading game-data from server. Try to refresh page.`));
App.showWelcome();
