/**
 * Increase number of current question
 * @param {Object} state input state object
 * @return {Object} new state
 */
export default (state) => {
  if (state.currentQuestion === void 0) {
    throw new Error(`Wrong input data!`);
  }

  const levelNumber = state.currentQuestion;

  return Object.assign({}, state, {
    currentQuestion: levelNumber + 1
  });
};
