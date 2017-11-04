import outputResult from './outputResult';
import OTHER_RESULTS_MOCK from '../data/otherResultsMock';
import assert from 'assert';

describe(`On functions input `, () => {
  it(`first parameter (otherResults) should be an array `, () => {
    assert.throws(() => {
      outputResult(1, {});
    });

    assert.doesNotThrow(() => {
      outputResult([1], {});
    });
  });

  it(`second parameter (currentResult) should be an object `, () => {
    assert.throws(() => {
      outputResult([1], `2`);
      outputResult([1], 2);
      outputResult([1], null);
    });

    assert.doesNotThrow(() => {
      outputResult([1], {});
    });
  });
});

describe(`On functions output `, () => {
  it(`should return correct message, if time will out`, () => {
    const resultTime = {
      time: 0
    };
    assert.equal(outputResult([], resultTime), `Время вышло!<br>Вы не успели отгадать все мелодии`);
  });

  it(`should return correct message, if attempts will out`, () => {
    const resultNotes = {
      lives: 0
    };
    assert.equal(outputResult([], resultNotes), `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`);
  });
});

describe(`Scoring statistics: `, () => {
  it(`Function should calculate correctly `, () => {
    assert.equal(outputResult(OTHER_RESULTS_MOCK, {
      points: 1,
      lives: 2,
      time: 3
    }), `Вы заняли 6-е место из 6 игроков. Это&nbsp;лучше чем у&nbsp;0% игроков`);
  });

});
