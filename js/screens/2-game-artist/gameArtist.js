import GameArtistView from './gameArtistView';
import decreaseLife from '../../functions/decreaseLife';
import switchLevel from '../../functions/switchLevel';


export default (state) => {
  const gameArtist = new GameArtistView(state);

  gameArtist.onAnswer = (event) => {
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

