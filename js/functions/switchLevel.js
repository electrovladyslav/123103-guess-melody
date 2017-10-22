import getRandomArrElem from '../functions/getRandomArrElem';
import app from '../app';

export default (state) => {
  let newState = Object.assign({}, state, {
    currentLevel: state.currentLevel + 1
  });

  if (state.lives === 0) {
    newState.result = `loose-time`;
    app.showResult(newState);
    return;
  }
  if (state.time <= 0) {
    newState.result = `loose-attempt`;
    app.showResult(newState);
    return;
  }

  const nextLevels = [
    app.showArtistScreen,
    app.showGenreScreen
  ];

  if (newState.currentLevel < newState.levelsAmount) {
    getRandomArrElem(nextLevels)(newState);
  } else if (newState.currentLevel === newState.levelsAmount) {
    newState.result = `win`;
    app.showResult(newState);
  }
};
