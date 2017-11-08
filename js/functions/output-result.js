/**
 * Output result of current game
 * @param {number[]} otherResults
 * @param {object} currentResult
 * @param {number} currentResult.points
 * @param {number} currentResult.lives
 * @param {number} currentResult.time
 * @return {string} outputString
 */
export default (otherResults, currentResult) => {
  let outputString = ``;

  if (currentResult.time <= 0) {
    outputString = `Время вышло!<br>Вы не успели отгадать все мелодии`;
    return outputString;
  }

  if (currentResult.lives === 0) {
    outputString = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
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
