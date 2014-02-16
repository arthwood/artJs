ArtJs.SpecReceiver = com.arthwood.spec.Receiver = function(matcher, actual) {
  this.matcher = matcher;
  this.actual = actual;
  
  var actualValue = this.actual.value;
  var expected = this.matcher.expected;
  
  this.original = ArtJs.$D(actualValue, actualValue[expected]);
  this.delegate = ArtJs.$D(this, this.resolve);

  var callback = this.delegate.callback();

  callback.mock = true;
  
  actualValue[expected] = callback;
  
  this.counter = 0;
  this.times = null;
  this.args = null;
  this.callOriginal = null;
};

ArtJs.SpecReceiver.prototype = {
  resolve: function() {
    var args = ArtJs.$A(arguments);
    var returnValue;

    if (this.original.method.mock) {
      this.original.args = args;
      returnValue = this.original.invoke();
    }
    else if (this.callOriginal) {
      this.original.args = args;
      returnValue = this.original.invoke();
    }
    else {
      returnValue = this.returnValue;
    }

    if (this.args == null || ArtJs.ArrayUtils.equal([args, this.args])) {
      this.counter++;
    }

    this.matcher.actualArgs = args;

    return returnValue;
  },

  withArgs: function() {
    this.args = ArtJs.$A(arguments);

    return this;
  },

  andReturn: function(returnValue) {
    this.returnValue = returnValue;

    return this;
  },

  andCallOriginal: function() {
    this.callOriginal = true;

    return this;
  },

  once: function() {
    this.times(1);
    
    return this;
  },
  
  twice: function() {
    this.times(2);

    return this;
  },
  
  times: function(n) {
    this._times = n;

    return this;
  },

  getResult: function() {
    var value = this.times == null ? this.counter > 0 : this.counter == this._times;

    return new ArtJs.SpecResult(this.actual, this.matcher, value);
  },

  rollback: function() {
    this.actual.value[this.matcher.expected] = this.original.method;
  }
};
