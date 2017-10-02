import makeElementFromTemplate from '../functions/makeElementFromTemplate';
import nextScreen from './1-wellcome';
import renderScreen from '../functions/renderScreen';

const screen = () => {
  const stingTemplate = `
    <secion class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </secion>`;
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
