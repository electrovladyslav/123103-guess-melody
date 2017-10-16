/**
 * Return random element of array
 * @param {array} arr
 * @return {*} 
 */
export default (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
