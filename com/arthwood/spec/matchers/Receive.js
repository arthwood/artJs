ArtJs.ReceiveMatcher = com.arthwood.spec.matchers.Receive = function(expected) {
  this.expected = expected;
};

ArtJs.ReceiveMatcher.prototype = {
  resolve: function(actual) {
    this.receiver = new ArtJs.SpecReceiver(this, actual);
    
    runner.receivers.push(this.receiver);
    
    return this.receiver;
  },

  failureText: function(actual) {
    var result = ['"' + actual.value.name + '"', 'expected to call', this.expected];

    if (this.receiver.args) {
      result.push('with');
      result.push('(' + this.receiver.args.join(', ') + ')');
      
      if (this.actualArgs) {
        result.push('but was (' + this.actualArgs.join(', ') + ')');
      }
    }
    
    return result.join(' ');
  }
};

function receive(expected) {
  return new ArtJs.ReceiveMatcher(expected);
}
