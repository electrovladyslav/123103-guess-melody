import nextScreen from '../2-game-artist/gameArtist';
import renderScreen from '../../functions/renderScreen';
import ResultView from './resultView';
import initialState from '../../data/initialState';

export default (state) => {
  const result = new ResultView(state);
  result.switchToNextScreen = () => {
    renderScreen(nextScreen(initialState));
  };

  return result.element;
};
