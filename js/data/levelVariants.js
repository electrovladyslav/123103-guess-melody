import audio from './audioLib';
// import getRandomArrElem from '../functions/getRandomArrElem';

export default Object.freeze({
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
    rightAnswer: new Set([
      audio[5].artist
    ])
  }
});
