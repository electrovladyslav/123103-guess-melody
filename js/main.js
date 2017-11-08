import App from './app';
import {loadData} from './functions/server-communication-functions';

loadData()
    .then((levelsSet) => App.init(levelsSet))
    .catch(() => window.console.log(`There some problem with loading game-data from server. Try to refresh the page.`));

App.showWelcome();
