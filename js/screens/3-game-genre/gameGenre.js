import GameGenreView from './gameGenreView';
import decreaseLife from '../../functions/decreaseLife';
import switchLevel from '../../functions/switchLevel';
import isSetsEqual from '../../functions/isSetsEqual';
import tick from '../../functions/tick';

export default (state) => {
  const gameGenre = new GameGenreView(state);

  let timer;
  const startTimer = () => {
    timer = setTimeout(() => {
      state = tick(state);
      if (state.time < 0) {
        switchLevel(state);
        clearTimeout(timer);
      } else {
        gameGenre.updateTime(state.time);
        startTimer();
      }
    }, 1000);
  };
  startTimer();

  gameGenre.onAnswer = () => {
    clearTimeout(timer);
    let newState = Object.assign({}, state);
    if (isSetsEqual(gameGenre._auxTriggersStore, gameGenre._level.rightAnswer)) {
      newState.answers.push(`correct`);
    } else {
      newState.answers.push(`wrong`);
      newState = decreaseLife(newState);
    }
    switchLevel(newState);
  };

  return gameGenre.element;
};

