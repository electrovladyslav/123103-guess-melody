import calcPoints from './calc-points';
import assert from 'assert';

describe(`On functions input `, () => {
  it(`answers parameter should be an array `, () => {
    assert.throws(() => {
      calcPoints(1, 2);
    });

    assert.doesNotThrow(() => {
      calcPoints([1], 2);
    });
  });

  it(`notes parameter should be a number `, () => {
    assert.throws(() => {
      calcPoints([1], `2`);
      calcPoints([1], [2]);
    });

    assert.doesNotThrow(() => {
      calcPoints([1], 2);
    });
  });
});

describe(`On functions output `, () => {
  it(`should return Number`, () => {
    const result = calcPoints([1], 2);
    assert.equal(typeof (result), `number`);
  });
});

describe(`Scoring rules: `, () => {
  it(`Function should return -1 if number of answers is less than 10`, () => {
    assert.equal(calcPoints([1], 2), -1);
  });

  it(`Function should return 10 if all answers are correct`, () => {
    const answers = new Array(10).fill(`correct`);
    assert.equal(calcPoints(answers, 3), 10);
  });

  it(`Function should return 20 if all answers are fast and correct`, () => {
    const answers = new Array(10).fill(`fast`);
    assert.equal(calcPoints(answers, 3), 20);
  });
});
