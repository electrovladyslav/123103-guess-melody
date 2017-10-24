/**
 * Function timer countdown time and invoke callbacks
 * @param {number} time to count
 * @param {function} onTick callback for each count
 * @param {function} onElapse callback for time elapsing
 * @return {number} timerId for clear timer outside
 */
// TODO сделать быстрые ответы
const timer = (time, onTick, onElapse) => {
  const timerId = setInterval(() => {
    onTick(--time);
    if (time < 0) {
      onElapse();
      clearInterval(timerId);
    }
  }, 1000);

  return timerId;
};

export default timer;
