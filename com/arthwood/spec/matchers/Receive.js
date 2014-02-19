ArtJs.ReceiveMatcher = com.arthwood.spec.matchers.Receive = ArtJs.Class(
  function(expected) {
    this.super(arguments, expected, 'call');
  },
  {
    resolve: function(actual) {
      this.receiver = new ArtJs.SpecReceiver(this, actual);
      
      runner.receivers.push(this.receiver);
      
      return this.receiver;
    },
    
    failureText: function(actual) {
      var result = this.super.failureText(arguments, actual);
      
      if (this.receiver.args()) {
        var expectedArgs = this.receiver.args();
        var actualArgs = this.receiver.actualArgs();
        
        result.push('with');
        result.push(this._argsString(expectedArgs));
        
        if (actualArgs) {
          result.push('but was ' +  this._argsString(actualArgs));
        }
      }

      return result.join(' ');
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
