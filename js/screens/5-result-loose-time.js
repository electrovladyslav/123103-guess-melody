import makeElementFromTemplate from '../functions/makeElementFromTemplate';
import nextScreen from './1-wellcome';
import renderScreen from '../functions/renderScreen';

const screen = () => {
  const stingTemplate = `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  const domTemplate = makeElementFromTemplate(stingTemplate);

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
