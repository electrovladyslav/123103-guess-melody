/**
 * Checking that state has all necessary params and throw error otherwise
 * @param {object} state
 * @return {void}
 */
export function checkState(state) {
  if ((state === void 0)
    || (state.time === void 0)
    || (state.lives === void 0)
    || (state.currentLevel === void 0)
    || (state.answers === void 0)) {
    throw new Error(`Wrong input data (some states param is missing)!`);
  }
}

/**
 * Convert string with params to state object
 * @param {string} codeStr
 * @return {{}}
 */
export function decodeState(codeStr) {
  const DIVIDER = `&`;
  const decodeMap = [`wrong`, `correct`, `fast`];
  const state = {};
  const params = codeStr.split(DIVIDER);

  params.forEach((param) => {
    const val = param.split(`=`);
    state[val[0]] = Number(val[1]);
  });

  const indexOfAnswer = codeStr.indexOf(`answers`);
  const indexOfNextAmp = codeStr.indexOf(`&`, indexOfAnswer);
  let strAnswers;
  if (indexOfNextAmp !== -1) {
    strAnswers = codeStr.slice((indexOfAnswer + 8), indexOfNextAmp);
  } else {
    strAnswers = codeStr.slice((indexOfAnswer + 8));
  }
  const codeAnswers = strAnswers.split(``);
  state.answers = [];
  codeAnswers.forEach((answer) => {
    if (decodeMap[answer] !== void 0) {
      state.answers.push(decodeMap[answer]);
    } else {
      throw new Error(`Wrong input data!`);
    }
  });
  return state;
}

/**
 * Encoding object to string
 * @param {object} state
 * @return {string}
 */
export function encodeState(state) {
  const codeMap = {
    wrong: 0,
    correct: 1,
    fast: 2
  };

  checkState(state);
  let outStr = ``;
  outStr += `time=${state.time}&`;
  outStr += `lives=${state.lives}&`;
  outStr += `currentLevel=${state.currentLevel}&`;
  outStr += `answers=`;

  state.answers.forEach((answer) => {
    if (codeMap[answer] !== void 0) {
      outStr += codeMap[answer];
    } else {
      throw new Error(`Wrong input data!`);
    }
  });
  return outStr;
}

/**
 * Find and return sources of all audio flies from set of levels
 * @param {array} levelsSet
 * @return {array} srcList list of all src
 */
export function findAllSrc(levelsSet) {
  const srcList = new Set();
  levelsSet.forEach((level) => {
    switch (level.type) {
      case `artist`:
        srcList.add(level.src);
        break;

      case `genre`:
        level.answers.forEach((answer) => srcList.add(answer.src));
        break;

      default:
        throw new TypeError(`Wrong type of level!`);
    }
  });
  return Array.from(srcList);
}

/**
 * Clear element .main on page and render input elements inside
 *
 * @param {Node} element DOM node to render
 */
export function renderScreen(element) {
  const container = document.querySelector(`.main`);
  container.innerHTML = ``;
  if (element !== void (0)) {
    container.appendChild(element);
  } else {
    throw new RangeError(`There no input element (no-element).`);
  }
}

export function convertTime(timeDecimal) {
  let timeSexagesimal = {
    mins: Math.floor(timeDecimal / 60),
    secs: timeDecimal % 60
  };

  if (timeSexagesimal.secs < 10) {
    timeSexagesimal.secs = `0` + timeSexagesimal.secs;
  }

  return timeSexagesimal;
}
