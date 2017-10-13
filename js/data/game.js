import audio from './audioLib';
// import getRandomArrElem from '../functions/getRandomArrElem';

const game = {
  rules: {
    time: 5,
    lives: 3
  },
  levelVariant: {
    artist: {
      title: `Кто исполняет эту песню?`,
      audio: audio[1],
      answers: [
        `Пелагея`,
        audio[1].artist,
        `Краснознаменная дивизия имени моей бабушки`
      ],
      rightAnswer: audio[1].artist
    },
    genre: {
      title: `Выберите поп треки`,
      answers: [
        audio[5],
        audio[2],
        audio[3],
        audio[4]
      ],
      rightAnswer: audio[5]
    }
  },
  levelsAmount: 10
};

export default game;
