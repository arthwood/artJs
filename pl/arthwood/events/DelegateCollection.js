ArtJs.DelegateCollection = pl.arthwood.events.DelegateCollection = function(delegates) {
  this.delegates = delegates || new Array();
  this.delegateToResultDC = ArtJs.$DC(this, this.delegateToResult, false);
};

ArtJs.DelegateCollection.prototype = {
  invoke: function() {
    this.delegateToResultDC.delegate.args = ArtJs.$A(arguments);
    
    return ArtJs.ArrayUtils.map(this.delegates, this.delegateToResultDC);
  },

  add: function(delegate) {
    this.delegates.push(delegate);
  },
  
  removeAt: function(i) {
    ArtJs.ArrayUtils.removeAt(this.delegates, i);
  },
  
  remove: function(delegate) {
    ArtJs.ArrayUtils.removeItem(this.delegates, delegate);
  },
  
  clear: function() {
    this.delegates.splice(0);
  },
  
  getLength: function() {
    return this.delegates.length;
  },
  
  delegateToResult: function(delegate, idx) {
    return delegate.invoke.apply(delegate, ArtJs.$A(arguments, 2));
  }
};
