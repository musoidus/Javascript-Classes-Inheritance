class Base {
  constructor(val) {
    this.value = val || 0; 
  }

  clearValue() {
    this.value = 0;
    return this;
  }

  setNewValue(val) {
    this.value = val;
    return this;
  }

  printValue() {
    console.log(this.value);
  }
}

class IntBuilder extends Base {
  constructor(val) {
    super(val);
  }

  plus(...args) {
    let result = +this.value;
    for (let arg of args) {
      result += arg;
    }
    this.value = result;
    return this;
  }

  minus(...args) {
    let result = +this.value;
    for( let arg of args) {
      result -= arg;
    }
    this.value = result;
    return this;
  }

  multiply(n) {
    this.value = +this.value * n;
    return this;
  }

  divide(n) {
    this.value = Math.floor(+this.value / n);
    return this;
  }

  mod(n) {
    this.value = +this.value % n;
    return this;
  }

  get() {
    return this.value;
  }

  static random(from, to) {
    if (from > to) return 'range error';
    return ((new Date() % (to + 1 - from)) + from);
  }
}

console.log(IntBuilder.random(10, 100));

const intBuilder = new IntBuilder(10);
const result = intBuilder
  .plus(2, 3, 2)
  .minus(1, 2)
  .multiply(2)
  .divide(4)
  .mod(3)
  .get();
console.log(result);


intBuilder.clearValue();
intBuilder.printValue();
