artjs.ReceiveMatcher = artjs.spec.matcher.Receive = artjs.Class(
  function(expected) {
    this.super(expected, 'receive');
  },
  {
    resolve: function(actual) {
      this.receiver = new artjs.SpecReceiver(this, actual);
      
      return this.receiver;
    },
    
    _isFailed: function(result) {
      return !result.success;
    },
    
    _failureData: function(actual) {
      var result = this.super(actual);
      var results = this.receiver.getResults();
      var times = this.receiver.getTimes();
      
      if (artjs.Object.isPresent(times)) {
        var success = artjs.Array.reject(results, this._isFailed);
        
        result.push(times + ' times, but was ' + success.length);
      }
      else {
        var failure = artjs.Array.detect(results, this._isFailed);
        
        if (failure) {
          result.push(
            'with' + this._argsString(failure.args.expected) 
            + ', but was ' +  this._argsString(failure.args.actual)
          );
        }
      }
      
      return result;
    },
    
    _mapArgs: function(i) {
      return '[' + i.join(', ') + ']';
    },
    
    _argsString: function(args) {
      return '(' + (this.receiver.isInSeries() ? artjs.Array.map(args, this._mapArgs, this) : args).join(', ') + ')';
    }
  },
  null,
  artjs.BaseMatcher
);
