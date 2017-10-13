import artistScreen from '../screens/2-game-artist';
import genreScreen from '../screens/3-game-genre';
import resultScreenWin from '../screens/4-result-win';
import resultScreenLooseTime from '../screens/5-result-loose-time';
import resultScreenLooseAttempt from '../screens/6-result-loose-attempt';
import renderScreen from '../functions/renderScreen';
import getRandomArrElem from '../functions/getRandomArrElem';

export default (state) => {
  if (state.lives === 0) {
    renderScreen(resultScreenLooseAttempt());
    return;
  }
  if (state.time === 0) {
    renderScreen(resultScreenLooseTime());
    return;
  }

  let newState = Object.assign({}, state, {
    currentLevel: state.currentLevel + 1
  });

  const nextLevels = [
    artistScreen(newState),
    genreScreen(newState)
  ];
  if (newState.currentLevel < newState.levelsAmount) {
    renderScreen(getRandomArrElem(nextLevels));
  } else if (newState.currentLevel === newState.levelsAmount) {
    renderScreen(resultScreenWin());
  }
};
