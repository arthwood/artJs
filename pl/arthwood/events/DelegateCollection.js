ArtJs.DelegateCollection = pl.arthwood.events.DelegateCollection = function(delegates) {
  this.delegates = delegates || new Array();
  this.delegateToResultCallback = ArtJs.$DC(this, this.delegateToResult, false);
};

ArtJs.DelegateCollection.prototype.invoke = function() {
  this.delegateToResultCallback.delegate.args = ArtJs.$args(arguments);
  
  return ArtJs.ArrayUtils.map(this.delegates, this.delegateToResultCallback);
};

ArtJs.DelegateCollection.prototype.combine = function(delegate) {
  this.delegates.push(delegate);
};

ArtJs.DelegateCollection.prototype.remove = function(object, method) {
  var vDelegate;
  var n = this.length();
  var vRemoveAt = ArtJs.ArrayUtils.removeAt;
  
  while (n-- > 0) {
    vDelegate = this.delegates[n];
    
    if ((vDelegate.object === object) && (!method || (vDelegate.method === method))) {
      vRemoveAt(this.delegates, n);
    }
  }
};

ArtJs.DelegateCollection.prototype.removeDelegateAt = function(i) {
  ArtJs.ArrayUtils.removeAt(this.delegates, i);
};

ArtJs.DelegateCollection.prototype.removeDelegate = function(delegate) {
  ArtJs.ArrayUtils.removeItem(this.delegates, delegate);
};

ArtJs.DelegateCollection.prototype.clear = function() {
  this.delegates.splice(0);
};

ArtJs.DelegateCollection.prototype.getLength = function() {
  return this.delegates.length;
};

ArtJs.DelegateCollection.prototype.delegateToResult = function(delegate, idx) {
  return delegate.invoke.apply(delegate, ArtJs.$args(arguments, 2));
};
