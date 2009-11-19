var Delegate = pl.arthwood.events.Delegate = function(object, method) {
  this.object = object;
  this.method = method;
  this.args = $args(arguments, 2);
};

Delegate.prototype.invoke = function() {
  return this.method.apply(this.object, $args(arguments).concat(this.args));
};

Delegate.prototype.invokeWithSource = function(src, args) {
  return this.method.apply(this.object, [src].concat(args).concat(this.args));
};

Delegate.prototype.callback = function(withSource) {
  var result = function() {
    var callee = arguments.callee;
    var delegate = callee.delegate;
    var args = $args(arguments);
    
    callee.withSource ? delegate.invokeWithSource(this, args) : delegate.invoke.apply(delegate, args);
  };

  result.withSource = withSource;
  result.delegate = this;

  return result;
};

Delegate.callback = function(object, method, withSource) {
  var delegate = new Delegate(object, method);
  var callback = delegate.callback(withSource);
  
  delegate.args = $args(arguments, 3);
  
  return callback;
};

var $D = Delegate.create = function(object, method) {
  var delegate = new Delegate(object, method);

  delegate.args = $args(arguments, 2);

  return delegate;
};