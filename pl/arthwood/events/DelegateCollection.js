var DelegateCollection = pl.arthwood.events.DelegateCollection = function(delegates) {
  this.delegates = delegates || new Array();
  this.delegateToResultCallback = Delegate.callback(this, this.delegateToResult, false);
};

DelegateCollection.prototype.invoke = function() {
  var args = $args(arguments);
  
  this.delegateToResultCallback.delegate.args = args;
  
  return ArrayUtils.map(this.delegates, this.delegateToResultCallback);
};

DelegateCollection.prototype.combine = function(delegate) {
  this.delegates.push(delegate);
};

DelegateCollection.prototype.remove = function(object, method) {
  var vDelegate;
  var n = this.length();
  var vRemoveAt = ArrayUtils.removeAt;
  
  while (n-- > 0) {
    vDelegate = this.delegates[n];
    
    if ((vDelegate.object === object) && (!method || (vDelegate.method === method))) {
      vRemoveAt(this.delegates, n);
    }
  }
};

DelegateCollection.prototype.removeDelegateAt = function(i) {
  ArrayUtils.removeAt(this.delegates, i);
};

DelegateCollection.prototype.removeDelegate = function(delegate) {
  ArrayUtils.removeItem(this.delegates, delegate);
};

DelegateCollection.prototype.clear = function() {
  this.delegates.splice(0);
};

DelegateCollection.prototype.length = function() {
  return this.delegates.length;
};

DelegateCollection.prototype.delegateToResult = function(delegate, idx) {
  return delegate.invoke($args(arguments, 2));
};
