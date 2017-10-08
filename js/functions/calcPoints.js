/**
 * Calculate points witch give to player depends of his answers
 * @param {Array} answers
 * @param {Number} notes
 * @return {Number} result
 */
export default (answers, notes) => {
  let result = 0;

  if (Array.isArray(answers) !== true) {
    throw new TypeError(`It should be an Array of answers on input`);
  }

  if (typeof (notes) !== `number`) {
    throw new TypeError(`It should be an Number of notes on input`);
  }

  if (answers.length < 10) {
    result = -1;
    return result;
  }

  answers.forEach((answer) => {
    switch (answer) {
      case `correct`:
        result += 1;
        break;
      case `fast`:
        result += 2;
        break;
      case `wrong`:
        result -= 2;
        break;
      default:
        throw new Error(`Wrong answer!`);
    }
  });

  return result;
};
