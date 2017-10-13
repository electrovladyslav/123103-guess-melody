/**
 * Output result of current game
 * @param {array} otherResults
 * @param {object} currentResult
 * @param {number} currentResult.points
 * @param {number} currentResult.lives
 * @param {number} currentResult.time
 * @return {string} outputString
 */
export default (otherResults, currentResult) => {
  let outputString = ``;

  if (!Array.isArray(otherResults)) {
    throw new TypeError(`It should be an Array of other results on input`);
  }

  if ((typeof (currentResult) !== `object`) && (currentResult !== null)) {
    throw new TypeError(`It should be an Oject of current result on input`);
  }

  if (currentResult.time === 0) {
    outputString = `Время вышло! Вы не успели отгадать все мелодии`;
    return outputString;
  }

  if (currentResult.lives === 0) {
    outputString = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    return outputString;
  }

  const statistics = otherResults.slice();
  statistics.push(currentResult.points);

  statistics.sort((a, b) => a - b);

  const currentPosition = statistics.indexOf(currentResult.points);
  const place = statistics.length - currentPosition;
  const losers = Math.round(statistics.indexOf(currentResult.points) / statistics.length * 100);

  outputString = `Вы заняли ${place}-е место из ${statistics.length} игроков. Это&nbsp;лучше чем у&nbsp;${losers}% игроков`;
  return outputString;
};
