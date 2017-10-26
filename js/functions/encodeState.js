import codeMap from '../data/codeMap';
import checkState from './checkState';

/**
 * Encoding object to string
 * @param {object} state
 * @return {string}
 */
export default (state)=> {
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
};
