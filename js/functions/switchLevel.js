import getRandomArrElem from '../functions/getRandomArrElem';
import {LEVELS_AMOUNT} from '../data/constants';
import app from '../app';

export default (state) => {
  let newState = Object.assign({}, state, {
    currentLevel: state.currentLevel + 1
  });

  if ((state.lives === 0) || (state.time <= 0)) {
    app.showResult(newState);
    return;
  }

  const nextLevels = [
    app.showArtistScreen,
    app.showGenreScreen
  ];

  if (newState.currentLevel <= LEVELS_AMOUNT) {
    getRandomArrElem(nextLevels)(newState);
  } else if (newState.currentLevel > LEVELS_AMOUNT) {
    app.showResult(newState);
  }
};
