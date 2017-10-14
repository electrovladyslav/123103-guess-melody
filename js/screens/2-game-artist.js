import makeElementFromTemplate from '../functions/makeElementFromTemplate';
import decreaseLife from '../functions/decreaseLife';
import switchLevel from '../functions/switchLevel';
import levelVariant from '../data/levelVariants';


const screen = (state) => {
  const thisLevel = levelVariant.artist;
  const livesString = new Array(state.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``);

  let stringTemplate = `
    <section class="main main--level main--level-artist">
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
         ${livesString}
      </div>
  
      <div class="main-wrap">
        <h2 class="title main-title">${thisLevel.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${thisLevel.audio.src}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        
        <form class="main-list">`;

  const answersList = thisLevel.answers.map((answer, number) => {
    return `
      <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
      <label class="main-answer" for="answer-${number}"  data-artist="${answer}">
        <img class="main-answer-preview" src="http://placehold.it/134x134"
             alt="${answer}" width="134" height="134">
        ${answer}
      </label>
    </div>
    `;
  }).join(``);

  stringTemplate += answersList;

  stringTemplate += `
        </form>
      </div>
    </section>
  `;

  const domTemplate = makeElementFromTemplate(stringTemplate);

  const onAnswer = (event) => {
    let newState = Object.assign({}, state);
    if (event.currentTarget.dataset.artist === thisLevel.rightAnswer) {
      newState.answers.push(`correct`);
    } else {
      newState.answers.push(`wrong`);
      newState = decreaseLife(newState);
    }
    switchLevel(newState);
  };

  const triggers = domTemplate.querySelectorAll(`.main-answer`);
  if (triggers.length) {
    [...triggers].forEach((trigger) => {
      trigger.addEventListener(`click`, (event) => {
        event.preventDefault();
        onAnswer(event);
      });
    });
  } else {
    throw new Error(`There is no possible to switch level (no-triggers).`);
  }

  return domTemplate;
};

export default screen;
