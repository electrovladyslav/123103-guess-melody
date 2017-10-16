import nextScreen from '../2-game-artist';
import renderScreen from '../../functions/renderScreen';
import WelcomeView from './welcomeView';
import initialState from '../../data/initialState';

const welcome = new WelcomeView();
welcome.switchToNextScreen = () => {
  renderScreen(nextScreen(initialState));
};

export default () => welcome.element;
