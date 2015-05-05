artjs.SpecReceiver = artjs.spec.Receiver = artjs.Class(
  function(matcher, actual) {
    this._matcher = matcher;
    this._actual = actual;
    
    var actualValue = this._actual.value;
    var expected = this._matcher.expected;
    var dc = artjs.$DC(this, 'resolve');
    
    if (!this._isForMock()) {
      this._original = artjs.$D(actualValue, expected);
    }
    
    actualValue[expected] = dc;
    
    this._results = [];
    this._times = null;
    this._args = null;
    this._callOriginal = null;
    this._inSeries = null;
  },
  {
    andCallOriginal: function() {
      var forMock = this._isForMock();
      
      if (forMock) {
        artjs.log('WARNING: Using "andCallOriginal" for mock has no result.');
      }
      
      this._callOriginal = !forMock;
      
      return this;
    },
    
    andReturn: function(returnValue) {
      this._returnValue = returnValue;
  
      return this;
    },
    
    getResult: function() {
      var successfulResults = artjs.Array.select(artjs.Array.pluck(this._results, 'success'));
      var value = this._times == null 
        ? artjs.Array.isNotEmpty(successfulResults) 
        : (this._times == successfulResults.length);
      
      return new artjs.SpecResult(this._actual, this._matcher, Boolean(this._actual.not ^ value));
    },
    
    getResults: function() {
      return this._results;
    },
    
    getTimes: function() {
      return this._times;
    },
    
    inSeries: function() {
      this._inSeries = true;
      
      return this;
    },
    
    isInSeries: function() {
      return this._inSeries;
    },
    
    once: function() {
      this.times(1);
      
      return this;
    },
    
    resolve: function() {
      var args = artjs.$A(arguments);
      
      if (this._args == null) {
        this._results.push({success: true});
      }
      else {
        var expectedArgs = this._inSeries ? this._args[this._results.length] : this._args;
        
        if (artjs.Array.equal([args, expectedArgs])) {
          this._results.push({success: true});
        }
        else {
          this._results.push({success: false, args: {actual: args, expected: expectedArgs}});
        }
      }
      
      var result;
      
      if (this._callOriginal) {
        this._original.args = args;
        result = this._original.invoke();
      }
      else {
        result = this._returnValue;
      }
      
      return result;
    },
    
    rollback: function() {
      if (!this._isForMock()) {
        this._actual.value[this._matcher.expected] = this._original.method;
      }
    },
    
    twice: function() {
      this.times(2);
  
      return this;
    },
    
    times: function(n) {
      this._times = n;
  
      return this;
    },
    
    withArgs: function() {
      this._args = artjs.$A(arguments);
  
      return this;
    },
    
    _isForMock: function() {
      return this._actual.value instanceof artjs.Mock;
    }
  }
);
