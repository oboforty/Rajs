

var random = new (class{
  uniform(min, max) {
    return Math.random()*(max-min)+min;
  }

  randint(min, max) {
    return Math.floor(this.uniform(min,max));
  }

  choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  choices(arr, N) {
    if (typeof arr == 'string') {
      let out = "";

      for (let i = 0; i < N; i++)
        out += this.choice(arr);

      return out;
    } else if (Array.isArray(arr)) {
      let out = [];

      for (let i = 0; i < N; i++)
        out.push(this.choice(arr));

      return out;
    } else if (typeof arr == 'object') {
      let newArr = Object.keys(newArr);
      let out = [];

      for (let i = 0; i < N; i++)
        out.push(this.choice(newArr));

      return out;
    }
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

})();


random.SeededRandom = class {
  constructor(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed ? seed : Math.floor(Math.random() * (this.m-1));
  }
  uniform(min, max) {
    return this.random()*(max-min)+min;
  }

  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }
  random() {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  }
  nextRange(start, end) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    var rangeSize = end - start;
    var randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }
  choice(array) {
    return array[this.nextRange(0, array.length)];
  }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

};
