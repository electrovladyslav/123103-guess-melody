import codeMap from '../data/codeMap';

/**
 * Encoding object to string
 * @param {object} state
 * @return {string}
 */
export default (state)=> {
  const DIVIDER = `&`;
  if ((state === void 0)
    || (state.time === void 0)
    || (state.lives === void 0)
    || (state.currentLevel === void 0)
    || (state.answers === void 0)) {
    throw new Error(`Wrong input data!`);
  }
  let outStr = ``;
  outStr += state.time + DIVIDER;
  outStr += state.lives + DIVIDER;
  outStr += state.currentLevel + DIVIDER;

  state.answers.forEach((answer) => {
    if (codeMap[answer] !== void 0) {
      outStr += codeMap[answer];
    } else {
      throw new Error(`Wrong input data!`);
    }
  });
  return outStr;
};
