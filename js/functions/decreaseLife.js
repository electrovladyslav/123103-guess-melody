/**
 * Decrease number of lives
 * @param {Object} state input object
 * @return {Object} new object
 */
export default (state) => {
  if (state.lives === void 0) {
    throw new TypeError(`Wrong input data!`);
  }

  const newLives = state.lives - 1;

  if (newLives < 0) {
    throw new RangeError(`Lives quantity should not be negative!`);
  }

  return Object.assign({}, state, {
    lives: newLives
  });
};
