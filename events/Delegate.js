artjs.Delegate = artjs.events.Delegate = artjs.Class(
  function(object, method) {
    this.object = object;
    this.method = artjs.Object.isString(method) ? this.object[method] : method;
    this.args = artjs.Array.arrify(arguments, 2);
  },
  {
    invoke: function() {
      var args = artjs.Array.arrify(arguments).concat(this.args);
      
      return this.method.apply(this.object, args);
    },
    
    callback: function(withSource) {
      var result = function() {
        var callee = arguments.callee;
        var delegate = callee.delegate;
        var args = artjs.Array.arrify(arguments);
        
        if (callee.withSource) {
          args.unshift(this); 
        }
        
        return delegate.invoke.apply(delegate, args);
      };
      
      result.withSource = withSource;
      result.delegate = this;
      
      return result;
    }
  },
  {
    callback: function(object, method, withSource) {
      var delegate = new this(object, method);
      var callback = delegate.callback(withSource);
      
      delegate.args = artjs.Array.arrify(arguments, 3);
      
      return callback;
    },
    
    create: function(object, method) {
      var delegate = new this(object, method);
      
      delegate.args = artjs.Array.arrify(arguments, 2);
      
      return delegate;
    },
    
    bind: function(object, methodName) {
      this._bind(object, object, methodName);
    },
    
    bindAll: function(context) {
      var container = context.ctor ? context.ctor.prototype : context;
      var callbacks = artjs.Object.keys(artjs.Object.select(container, this._isCallback, this));
      var all = callbacks.concat(artjs.Array.arrify(arguments, 1));
      
      this._bindSource = context;
      this._bindTarget = context;
      
      artjs.Array.each(all, this._bindEach, this);
    },
    
    func: function(method) {
      return this.create.apply(this, [null, method].concat(artjs.Array.arrify(arguments, 1)));
    },
    
    _bind: function(target, object, methodName) {
      target[methodName] = this.callback(object, methodName);
    },
    
    _isCallback: function(v, k) {
      return artjs.String.startsWith(k, '_on') && this._isFunction(v, k);
    },
    
    _isPublicMethod: function(v, k) {
      return !artjs.String.startsWith(k, '_') && this._isFunction(v, k);
    },
    
    _isFunction: function(v, k) {
      return v instanceof Function;
    },
    
    _bindEach: function(i) {
      this._bind(this._bindTarget, this._bindSource, i);
    }
  }
);
