import artistScreen from '../screens/2-game-artist/gameArtist';
import genreScreen from '../screens/3-game-genre/gameGenre';
import resultScreen from '../screens/4-result/result';
import renderScreen from '../functions/renderScreen';
import getRandomArrElem from '../functions/getRandomArrElem';

export default (state) => {
  let newState = Object.assign({}, state, {
    currentLevel: state.currentLevel + 1
  });

  if (state.lives === 0) {
    newState.result = `loose-time`;
    renderScreen(resultScreen(newState));
    return;
  }
  if (state.time === 0) {
    newState.result = `loose-attempt`;
    renderScreen(resultScreen(newState));
    return;
  }

  const nextLevels = [
    artistScreen(newState),
    genreScreen(newState)
  ];

  if (newState.currentLevel < newState.levelsAmount) {
    renderScreen(getRandomArrElem(nextLevels));
  } else if (newState.currentLevel === newState.levelsAmount) {
    newState.result = `win`;
    renderScreen(resultScreen(newState));
  }
};
