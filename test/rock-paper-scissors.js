require('chai').should();

let rps;
let options;

const stringifyItems = items => items.map(item => item.value).join(', ');

const twoPlayerGames = Object.create(null);

const given = lazyItems => ({
  winnerShouldBe(lazyExpected) {
    it(`winner should be expected`, () => {
      const items = lazyItems();
      const expected = lazyExpected();
      const itemsStr = stringifyItems(items);

      twoPlayerGames[itemsStr] = expected;
      const winner = rps.winner(items);
      if (winner !== null) {
        winner.should.equal(expected);
      } else if (expected !== null) {
        expected.should.equal(winner);
      }
    })
  }
});

const createRandomSet = (rps, size) => {
  const draws = new Set();

  while (size > 0) {
    results.add(rps.random());
    size -= 1;
  }

  return draws;
};

const winnerOfSet = set => {
  if (set.size !== 2) {
    return null;
  };

  return twoPlayerGames[stringifyItems(Array.from(set))];
};

describe('rock paper scissors', () => {
  it('module should export an object', () => {
    rps = require('../src/rock-paper-scissors.js');

    rps.should.be.an('object');

    options = [rps.rock, rps.paper, rps.scissors];
  });

  it('should have a rock property', () => {
    rps.rock.should.be.a('string');
    rps.rock.should.equal('rock');
  });

  it('should have a paper property', () => {
    rps.paper.should.be.a('string');
    rps.paper.should.equal('paper');
  });

  it('should have a scissors property', () => {
    rps.scissors.should.be.a('string');
    rps.scissors.should.equal('scissors');
  });

  it('rock, paper, scissors should be frozen and non-writable', () => {
    Object.isFrozen(rps.rock).should.be.true;
    Object.isFrozen(rps.paper).should.be.true;
    Object.isFrozen(rps.scissors).should.be.true;

    Object.getOwnPropertyDescriptor(rps, 'rock').writable.should.be.false;
    Object.getOwnPropertyDescriptor(rps, 'paper').writable.should.be.false;
    Object.getOwnPropertyDescriptor(rps, 'scissors').writable.should.be.false;
  });

  describe('radom', () => {
    it('should be a method', () => {
      rps.random.should.be.a('function');
    });

    it('should return a either rock, paper, or scissors at random', () => {
      for (let i = 0; i < 10; i += 1) {
        (options.indexOf(rps.random()) >= 0).should.be.true;
      }
    });
  });

  describe('winner', () => {
    it('should be a method', () => {
      rps.winner.should.be.a('function');
    });

    it('should accept an array of only rocks, papers, or scissors', () => {
      rps.winner.bind(rps, options).should.not.throw();
      rps.winner.bind(rps, ['rock', 'paper', { value: 'scissors' } ]).should.throw();
    });

    describe('2 player games', () => {
      given(() => [rps.rock, rps.scissors]).winnerShouldBe(() => rps.rock);
      given(() => [rps.scissors, rps.rock]).winnerShouldBe(() => rps.rock);

      given(() => [rps.rock, rps.paper]).winnerShouldBe(() => rps.paper);
      given(() => [rps.paper, rps.rock]).winnerShouldBe(() => rps.paper);

      given(() => [rps.scissors, rps.paper]).winnerShouldBe(() => rps.scissors);
      given(() => [rps.paper, rps.scissors]).winnerShouldBe(() => rps.scissors);

      given(() => [rps.rock, rps.rock]).winnerShouldBe(() => null);
      given(() => [rps.paper, rps.paper]).winnerShouldBe(() => null);
      given(() => [rps.scissors, rps.scissors]).winnerShouldBe(() => null);
    });

    describe('N player games', () => {
      given(() => [rps.rock, rps.rock, rps.scissors, rps.paper, rps.rock])
        .winnerShouldBe(() => null);

      for (let i = 0; i < 10; i += 1) {
        const set = createRandomSet(5);
        const expected = winnerOfSet(set);

        given(() => Array.from(set)).winnerShouldBe(() => expected);
      }
    });
  });
});
