/**
 * Output result of current game
 * @param {array} otherResults
 * @param {object} currentResult
 * @param {number} currentResult.points
 * @param {number} currentResult.notes
 * @param {number} currentResult.time
 * @return {string} outputString
 */
export default (otherResults, currentResult) => {
  let outputString = ``;

  if (Array.isArray(otherResults) !== true) {
    throw new TypeError(`It should be an Array of other results on input`);
  }

  if (typeof (currentResult) !== `object`) {
    throw new TypeError(`It should be an Number of notes on input`);
  }


  if (currentResult.time === 0) {
    outputString = `Время вышло! Вы не успели отгадать все мелодии`;
    return outputString;
  }

  if (currentResult.notes === 0) {
    outputString = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    return outputString;
  }

  const statistics = otherResults.slice();
  statistics.push(currentResult.points);

  statistics.sort((a, b) => {
    return a - b;
  });

  const currentPosition = statistics.indexOf(currentResult.points);
  const place = statistics.length - currentPosition;
  const losers = statistics.indexOf(currentResult.points) / statistics.length;

  outputString = `Вы заняли ${place}-е место из ${statistics.length} игроков. Это лучше чем у ${losers}% игроков`;
  return outputString;
};
