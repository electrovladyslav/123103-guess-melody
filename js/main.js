import App from './app';
import {loadData} from './functions/serverCommunicationFunctions';

loadData().then((levelsSet) => App.init(levelsSet));
App.showWelcome();
