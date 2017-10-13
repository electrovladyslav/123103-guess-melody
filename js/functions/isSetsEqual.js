/**
 * Compare two sets, returns 
 * @param {Set} as
 * @param {Set} bs
 * @return {boolean}
 */
export default (as, bs) => {
  if (as.size !== bs.size) {
    return false;
  }
  for (const a of as) {
    if (!bs.has(a)) {
      return false;
    }
  }
  return true;
};
