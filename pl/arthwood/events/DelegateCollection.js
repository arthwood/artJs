ArtJs.DelegateCollection = pl.arthwood.events.DelegateCollection = function(delegates) {
  this.delegates = delegates || new Array();
  this.delegateToResultCallback = ArtJs.$DC(this, this.delegateToResult, false);
};

ArtJs.DelegateCollection.prototype = {
  invoke: function() {
    this.delegateToResultCallback.delegate.args = ArtJs.$args(arguments);
    
    return ArtJs.ArrayUtils.map(this.delegates, this.delegateToResultCallback);
  },

  combine: function(delegate) {
    this.delegates.push(delegate);
  },
  
  remove: function(object, method) {
    var vDelegate;
    var n = this.length();
    var vRemoveAt = ArtJs.ArrayUtils.removeAt;
    
    while (n-- > 0) {
      vDelegate = this.delegates[n];
      
      if ((vDelegate.object === object) && (!method || (vDelegate.method === method))) {
        vRemoveAt(this.delegates, n);
      }
    }
  },
  
  removeDelegateAt: function(i) {
    ArtJs.ArrayUtils.removeAt(this.delegates, i);
  },
  
  removeDelegate: function(delegate) {
    ArtJs.ArrayUtils.removeItem(this.delegates, delegate);
  },
  
  clear: function() {
    this.delegates.splice(0);
  },
  
  getLength: function() {
    return this.delegates.length;
  },
  
  delegateToResult: function(delegate, idx) {
    return delegate.invoke.apply(delegate, ArtJs.$args(arguments, 2));
  }
};
