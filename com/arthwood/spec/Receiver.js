ArtJs.SpecReceiver = com.arthwood.spec.Receiver = ArtJs.Class(
  function(matcher, actual) {
    this._matcher = matcher;
    this._actual = actual;
    
    var actualValue = this._actual.value;
    var expected = this._matcher.expected;
    
    this._original = ArtJs.$D(actualValue, actualValue[expected]);
    this._delegate = ArtJs.$D(this, this.resolve);
    
    actualValue[expected] = this._delegate.callback();
    
    this._successCounter = 0;
    this._callCounter = 0;
    this._times = null;
    this._args = null;
    this._callOriginal = null;
    this._inSeries = null;
  },
  {
    resolve: function() {
      var args = ArtJs.$A(arguments);
      var returnValue;
  
      if (this._callOriginal) {
        this._original.args = args;
        returnValue = this._original.invoke();
      }
      else {
        returnValue = this._returnValue;
      }
      
      if (this._args == null) {
        this._successCounter++;
      }
      else {
        var expectedArgs = this._inSeries ? this._args[this._callCounter] : this._args;
        
        if (ArtJs.ArrayUtils.equal([args, expectedArgs])) {
          this._successCounter++;
        }
      }
  
      if (this._inSeries) {
        if (!this._actualArgs) {
          this._actualArgs = [];
        }
        this._actualArgs.push(args);
      }
      else {
        this._actualArgs = args;
      }
      
      this._callCounter++;
      
      return returnValue;
    },
    
    inSeries: function() {
      this._inSeries = true;
      
      return this;
    },
    
    withArgs: function() {
      this._args = ArtJs.$A(arguments);
  
      return this;
    },
    
    andReturn: function(returnValue) {
      this._returnValue = returnValue;
  
      return this;
    },
  
    andCallOriginal: function() {
      this._callOriginal = true;
  
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
    
    args: function() {
      return this._args;
    },
  
    actualArgs: function() {
      return this._actualArgs;
    },
  
    isInSeries: function() {
      return this._inSeries;
    },
  
    getResult: function() {
      var times = this._inSeries ? this._args.length : this._times;
      var n = this._successCounter;
      var value = times == null ? n > 0 : n == times;
  
      return new ArtJs.SpecResult(this._actual, this._matcher, value);
    },
  
    rollback: function() {
      this._actual.value[this._matcher.expected] = this._original.method;
    }
  }
);
