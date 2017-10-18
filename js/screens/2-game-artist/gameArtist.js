import GameArtistView from './gameArtistView';
import decreaseLife from '../../functions/decreaseLife';
import switchLevel from '../../functions/switchLevel';
import tick from '../../functions/tick';


export default (state) => {
  const gameArtist = new GameArtistView(state);

  let timer;
  const startTimer = () => {
    timer = setTimeout(() => {
      state = tick(state);
      if (state.time < 0) {
        switchLevel(state);
        clearTimeout(timer);
      } else {
        gameArtist.updateTime(state.time);
        startTimer();
      }
    }, 1000);
  };
  startTimer();

  gameArtist.onAnswer = (event) => {
    clearTimeout(timer);
    let newState = Object.assign({}, state);
    switchLevel(newState);
    if (event.currentTarget.dataset.artist === gameArtist._level.rightAnswer) {
      newState.answers.push(`correct`);
    } else {
      newState.answers.push(`wrong`);
      newState = decreaseLife(newState);
    }

    switchLevel(newState);
  };

  return gameArtist.element;
};

