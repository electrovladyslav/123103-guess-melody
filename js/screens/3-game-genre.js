import makeElementFromTemplate from '../functions/makeElementFromTemplate';
import switchLevel from '../functions/switchLevel';
import decreaseLife from '../functions/decreaseLife';
import isSetsEqual from '../functions/isSetsEqual';
import levelVariant from '../data/levelVariants';

const screen = (state) => {
  const thisLevel = levelVariant.genre;
  const livesSrting = new Array(state.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``);

  let stringTemplate = `
    <section class="main main--level main--level-genre">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${state.time}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">00</span>
        </div>
      </svg>
      <div class="main-mistakes">
        ${livesSrting}
      </div>
    
      <div class="main-wrap">
        <h2 class="title">${thisLevel.title}</h2>
        <form class="genre">`;

  const answersList = thisLevel.answers.map((answer, number) => {
    return `
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${answer.src}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}" data-artist="${answer.artist}">
        <label class="genre-answer-check" for="a-${number}" data-artist="${answer.artist}"></label>
      </div>
    `;
  }).join(``);

  stringTemplate += answersList;
  stringTemplate += `
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>
  `;


  const domTemplate = makeElementFromTemplate(stringTemplate);

  const mainTrigger = domTemplate.querySelector(`.genre-answer-send`);
  const auxTriggers = domTemplate.querySelectorAll(`input[name="answer"]`);
  const auxTriggersStore = new Set();

  const onChoose = (event) => {
    if (auxTriggersStore.has(event.target.dataset.artist)) {
      auxTriggersStore.delete(event.target.dataset.artist);
    } else {
      auxTriggersStore.add(event.target.dataset.artist);
    }
    mainTrigger.disabled = !auxTriggersStore.size;
  };

  const onAnswer = () => {
    let newState = Object.assign({}, state);
    if (isSetsEqual(auxTriggersStore, thisLevel.rightAnswer)) {
      newState.answers.push(`correct`);
    } else {
      newState.answers.push(`wrong`);
      newState = decreaseLife(newState);
    }
    switchLevel(newState);
  };

  if (auxTriggers.length) {
    [...auxTriggers].forEach((trigger) => {
      trigger.addEventListener(`change`, (event) => {
        onChoose(event);
      });
    });
  } else {
    throw new Error(`There is no possible to switch level (no-triggers).`);
  }

  mainTrigger.addEventListener(`click`, () => {
    event.preventDefault();
    onAnswer(event);
  });

  return domTemplate;
};

export default screen;
