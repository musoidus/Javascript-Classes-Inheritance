function Base(val) {
  this.value = val || '';
}

Base.prototype.printValue = function() {
  console.log('Value is:', this.value);
  return this;
}

Base.prototype.clearValue = function() {
  this.value = '';
  return this;
}

Base.prototype.renewValue = function(val) {
  this.value = val;
  return this;
}

function StringBuilder(val) {
  Base.call(this, val);
  
  this.plus = function() {
    for (var i = 0; i < arguments.length; i++) {
      this.value += arguments[i];
    }
    return this;
  }

  this.minus = function(n) {
    if(this.isNegative(n)) return this;
    this.value = this.value.slice(0, -n);
    return this;
  }

  this.multiply = function(int) {
    if (this.isNegative(int)) return this;
    if (int === 0) {
      this.clearValue();
      Base.prototype.clearValue.call(this);
      return this;
    }
    var stringCopy = this.value;
    for (var i = 0; i < int - 1; i++) {
      this.value += stringCopy;
    }
    return this;
  }

  this.divide = function(n) {
    if (this.isNegative(n)) return this;
    this.value = this.value.slice(0, Math.floor(this.value.length / n));
    return this;
  }

  this.remove = function(str) {
    this.value = this.value.split(str).join('');
    return this;
  }

  this.sub = function(from, n) {
    if (this.isNegative(from) || this.isNegative(n)) return this;
    if (from >= this.value.length) {
      Base.prototype.clearValue.call(this);
      return this;
    }
    this.value = this.value.slice(from, from + n);
    return this;
  }

  this.get = function() {
    return this.value;
  }

  this.isNegative = function(num) {
    if (num < 0) {
      console.log('error: negative argument, value will not be changed.');
      return true;
    }
    return false;
  }
}

// Object.setPrototypeOf(StringBuilder.prototype, Base.prototype);

StringBuilder.prototype = Object.create(Base.prototype);
StringBuilder.prototype.constructor = StringBuilder; 


var strBuilder = new StringBuilder('Hello');
var result = strBuilder
  .plus(' all', '!')
  .minus(4)
  .multiply(3)
  .divide(4)
  .remove('l')
  .sub(1, 1)
  .get();
console.log(result);

strBuilder.renewValue('String for testing.').printValue();
strBuilder.remove('cat').printValue();
strBuilder.remove('test').printValue();
strBuilder.remove('for ').printValue();
strBuilder.multiply(4).printValue();
strBuilder.plus(' Add', 'words').printValue();
strBuilder.minus(100).printValue();
strBuilder.renewValue('Second string for testing.').printValue();
strBuilder.multiply(0).printValue();
strBuilder.renewValue('Third string for testing.').printValue();
strBuilder.minus(-100).printValue();
strBuilder.renewValue('New string for testing.').printValue();
strBuilder.sub(4, -100).printValue();
strBuilder.sub(100, 100).printValue();

console.log(strBuilder.get());