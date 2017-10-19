import GameGenreView from './gameGenreView';
import decreaseLife from '../../functions/decreaseLife';
import switchLevel from '../../functions/switchLevel';
import isSetsEqual from '../../functions/isSetsEqual';
import updateTimeInState from '../../functions/updateTimeInState';
import timer from '../../functions/timer';


export default (state) => {
  const game = new GameGenreView(state);

  const timerId = timer(
      game._state.time, (time) => {
        game.updateTimeOnScreen(time);
        game._state = updateTimeInState(game._state, time);
      }, () => {
        switchLevel(game._state);
      }
  );

  game.onAnswer = () => {
    clearInterval(timerId);
    let newState = Object.assign({}, game._state);
    if (isSetsEqual(game._auxTriggersStore, game._level.rightAnswer)) {
      newState.answers.push(`correct`);
    } else {
      newState.answers.push(`wrong`);
      newState = decreaseLife(newState);
    }
    switchLevel(newState);
  };

  return game.element;
};

