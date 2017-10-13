import makeElementFromTemplate from '../functions/makeElementFromTemplate';
import nextScreen from './1-welcome';
import renderScreen from '../functions/renderScreen';
import calcPoints from '../functions/calcPoints';
import outputResult from '../functions/outputResult';
import OTHER_RESULTS_MOCK from '../data/otherResultsMock';

const screen = (state) => {
  const points = calcPoints(state.answers, state.lives);
  const newState = Object.assign({}, state, {
    points
  });
  const resultPhrase = outputResult(OTHER_RESULTS_MOCK, newState);
  // Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков
  const stringTemplate = `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
        <br>вы&nbsp;набрали ${points} баллов (0 быстрых)
        <br>совершив ${3 - state.lives} ошибки</div>
      <span class="main-comparison">${resultPhrase}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>
  `;


  const domTemplate = makeElementFromTemplate(stringTemplate);

  const showNextScreen = () => {
    renderScreen(nextScreen());
  };

  const trigger = domTemplate.querySelector(`.main-replay`);
  if (trigger) {
    trigger.addEventListener(`click`, showNextScreen);
  } else {
    throw new Error(`There is no possible to switch level (no-triggers).`);
  }

  return domTemplate;
};

export default screen;
