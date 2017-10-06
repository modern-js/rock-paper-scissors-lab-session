const rps = {
  random() {
    const n = Math.random();
    if (n < 0.33) {
      return this.rock;
    }
    else if (n > 0.66) {
      return this.paper;
    }
    else {
      return this.scissors;
    }
  },

  winner(players) {
    if (players.any(element => element !== this.rock || element !== this.paper || element !== this.scissors)){
      throw new Exception('use rock paper or scissors');
    }
    const set = new Set(players);
    if (set.size !== 2) {
      return null;
    }

    if (set.has(this.paper) && set.has(this.rock)) {
      return this.paper;
    } else if (set.has(this.paper) && set.has(this.scissors)){
      return this.scissors;
    } else {
      return this.rock;
    }
  }
};

Object.defineProperties(rps, {
  rock: {
    value: 'rock',
    writable: false,
    configurable: false
  },
  paper: {
    value: 'paper',
    writable: false,
    configurable: false
  },
  scissors: {
    value: 'scissors',
    writable: false,
    configurable: false
  },
});

module.exports = rps;
