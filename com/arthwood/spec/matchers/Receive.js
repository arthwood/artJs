ArtJs.ReceiveMatcher = com.arthwood.spec.matchers.Receive = ArtJs.Class(
  function(expected) {
    this.super(arguments, expected, 'receive');
  },
  {
    resolve: function(actual) {
      this.receiver = new ArtJs.SpecReceiver(this, actual);
      
      runner.receivers.push(this.receiver);
      
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
      return '(' + (this.receiver.isInSeries() ? ArtJs.ArrayUtils.map(args, this._mapArgs, this) : args).join(', ') + ')';
    }
  },
  null,
  ArtJs.BaseMatcher
);

function receive(expected) {
  return new ArtJs.ReceiveMatcher(expected);
}
