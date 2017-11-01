/**
 * Find and return sources of all audio flies from set of levels
 * @param {array} levelsSet
 * @return {array} srcList list of all src
 */
export default (levelsSet) => {
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
  return [...srcList];
};

