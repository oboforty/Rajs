
export class SeededRandom {
  constructor(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed ? seed : window.Math.floor(window.Math.random() * (this.m-1));
  }

  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  random() {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  }
}

export class RandomHandler {
  constructor(rndfn) {
    this.rndfn = {random: ()=>0};
    this.seed(rndfn);
  }

  seed(sd) {
    if (sd == null)
      this.rndfn = window.Math;
    else if(typeof sd === 'function')
      this.rndfn = new sd();
    else
      this.rndfn = new SeededRandom(sd);
  }

  uniform(min, max) {
    return this.rndfn.random()*(max-min)+min;
  }

  randint(min, max) {
    return Math.floor(this.uniform(min,max));
  }

  choice(arr) {
    return arr[Math.floor(this.rndfn.random() * arr.length)];
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
      let newArr = Object.keys(arr);
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

  distribution(prob) {
    prob = Object.fromEntries(
      Object.entries(prob).sort(([,a],[,b]) => b-a)
    );

    if (Math.abs(sum(Object.values(prob)) - 1) > 0.0000001)
      throw "Distribution table probabilities must be equal to 1";

    let i, s=0, r=Math.random();
    for (i in prob) {
      s += prob[i];
      if (r <= s) return i;
    }
  }

}