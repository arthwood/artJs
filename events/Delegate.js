artjs.Delegate = artjs.events.Delegate = artjs.Class(
  function(object, method) {
    this.object = object;
    this.method = artjs.ObjectUtils.isString(method) ? this.object[method] : method;
    this.args = artjs.ArrayUtils.arrify(arguments, 2);
  },
  {
    invoke: function() {
      var args = artjs.ArrayUtils.arrify(arguments).concat(this.args);
      
      return this.method.apply(this.object, args);
    },
    
    callback: function(withSource) {
      var result = function() {
        var callee = arguments.callee;
        var delegate = callee.delegate;
        var args = artjs.ArrayUtils.arrify(arguments);
        
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
      
      delegate.args = artjs.ArrayUtils.arrify(arguments, 3);
      
      return callback;
    },
    
    create: function(object, method) {
      var delegate = new this(object, method);
      
      delegate.args = artjs.ArrayUtils.arrify(arguments, 2);
      
      return delegate;
    },
    
    bindAll: function(context) {
      var container = context.ctor ? context.ctor.prototype : context;
      var callbacks = artjs.ObjectUtils.keys(artjs.ObjectUtils.select(container, this._isCallback, this));
      var all = callbacks.concat(artjs.ArrayUtils.arrify(arguments, 1));
      
      this._bindSource = context;
      this._bindTarget = context;
      
      artjs.ArrayUtils.each(all, this._bindEach, this);
    },
    
    delegateTo: function(source, target) {
      var functions = artjs.ObjectUtils.keys(artjs.ObjectUtils.select(source, this._isPublicMethod, this));
      
      this._bindSource = source;
      this._bindTarget = target;
      
      artjs.ArrayUtils.each(functions, this._bindEach, this);
    },
    
    func: function(method, withSource) {
      return this.create(null, method, withSource);
    },
    
    _isCallback: function(v, k) {
      return artjs.StringUtils.startsWith(k, '_on') && this._isFunction(v, k);
    },
    
    _isPublicMethod: function(v, k) {
      return !artjs.StringUtils.startsWith(k, '_') && this._isFunction(v, k);
    },
    
    _isFunction: function(v, k) {
      return v instanceof Function;
    },
    
    _bindEach: function(i) {
      this._bindTarget[i] = this.callback(this._bindSource, i);
    }
  }
);
