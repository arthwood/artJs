artjs.ReceiveMatcher = artjs.spec.matcher.Receive = artjs.Class(
  function(expected) {
    this.super(arguments, expected, 'receive');
  },
  {
    resolve: function(actual) {
      this.receiver = new artjs.SpecReceiver(this, actual);
      
      artjs.Spec.pushReceiver(this.receiver);
      
      return this.receiver;
    },
    
    _failureData: function(actual) {
      var result = this.super(arguments, actual);
      var expectedArgs = this.receiver.args();
      
      if (expectedArgs) {
        var actualArgs = this.receiver.actualArgs();
        
        result.push('with');
        result.push(this._argsString(expectedArgs));
        
        if (actualArgs) {
          result.push('but was ' +  this._argsString(actualArgs));
        }
      }

      return result;
    },
    
    _mapArgs: function(i) {
      return '[' + i.join(', ') + ']';
    },
    
    _argsString: function(args) {
      return '(' + (this.receiver.isInSeries() ? artjs.ArrayUtils.map(args, this._mapArgs, this) : args).join(', ') + ')';
    }
  },
  null,
  artjs.BaseMatcher
);
