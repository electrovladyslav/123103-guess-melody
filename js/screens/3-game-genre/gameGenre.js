import GameGenreView from './gameGenreView';
import decreaseLife from '../../functions/decreaseLife';
import switchLevel from '../../functions/switchLevel';
import isSetsEqual from '../../functions/isSetsEqual';

export default (state) => {
  const gameGenre = new GameGenreView(state);

  gameGenre.onAnswer = () => {
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

