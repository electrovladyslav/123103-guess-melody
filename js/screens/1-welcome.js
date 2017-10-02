import makeElementFromTemplate from '../functions/makeElementFromTemplate';
import nextScreen from './2-game-artist';
import renderScreen from '../functions/renderScreen';

const stingTemplate = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>
`;

const screen = () => {
  const domTemplate = makeElementFromTemplate(stingTemplate);

  const showNextScreen = () => {
    renderScreen(nextScreen());
  };

  const trigger = domTemplate.querySelector(`.main-play`);
  if (trigger) {
    trigger.addEventListener(`click`, showNextScreen);
  } else {
    throw new Error(`There is no possible to switch level (no-triggers).`);
  }

  return domTemplate;
};

export default screen;
