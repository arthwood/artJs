ArtJs.Delegate = pl.arthwood.events.Delegate = function(object, method) {
  this.object = object;
  this.method = method;
  this.args = ArtJs.$args(arguments, 2);
};

ArtJs.Delegate.prototype.invoke = function() {
  var args = ArtJs.$args(arguments).concat(this.args);
  
  return this.method.apply(this.object, args);
};

ArtJs.Delegate.prototype.invokeWithSource = function(src, args) {
  return this.method.apply(this.object, [src].concat(args).concat(this.args));
};

ArtJs.Delegate.prototype.callback = function(withSource) {
  var result = function() {
    var callee = arguments.callee;
    var delegate = callee.delegate;
    var args = ArtJs.$args(arguments);
    
    return callee.withSource ? delegate.invokeWithSource(this, args) : delegate.invoke.apply(delegate, args);
  };

  result.withSource = withSource;
  result.delegate = this;

  return result;
};

ArtJs.$DC = ArtJs.Delegate.callback = function(object, method, withSource) {
  var delegate = new ArtJs.Delegate(object, method);
  var callback = delegate.callback(withSource);
  
  delegate.args = ArtJs.$args(arguments, 3);
  
  return callback;
};

ArtJs.$D = ArtJs.Delegate.create = function(object, method) {
  var delegate = new ArtJs.Delegate(object, method);

  delegate.args = ArtJs.$args(arguments, 2);

  return delegate;
};

ArtJs.Delegate.injected = false;
ArtJs.Delegate.doInjection = function() {
  Function.prototype.bind = function(obj, withSource) {
    return ArtJs.$DC.apply(ArtJs.$DC, [obj, this, withSource].concat(ArtJs.$args(arguments, 2)));
  };

  ArtJs.Delegate.injected = true;
};
