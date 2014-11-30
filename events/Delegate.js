artjs.Delegate = artjs.events.Delegate = artjs.Class(
  function(object, method) {
    this.object = object;
    this.method = artjs.ObjectUtils.isString(method) ? this.object[method] : method;
    this.args = artjs.$A(arguments, 2);
  },
  {
    invoke: function() {
      var args = artjs.$A(arguments).concat(this.args);
      
      return this.method.apply(this.object, args);
    },
    
    callback: function(withSource) {
      var result = function() {
        var callee = arguments.callee;
        var delegate = callee.delegate;
        var args = artjs.$A(arguments);
        
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
      
      delegate.args = artjs.$A(arguments, 3);
      
      return callback;
    },
    
    create: function(object, method) {
      var delegate = new this(object, method);
      
      delegate.args = artjs.$A(arguments, 2);
      
      return delegate;
    },
    
    bindAll: function(context) {
      var container = context.ctor ? context.ctor.prototype : context;
      var callbacks = artjs.ObjectUtils.keys(artjs.ObjectUtils.select(container, this._isCallback, this));
      var all = callbacks.concat(artjs.$A(arguments, 1));
      
      this._bindContext = context;
      
      artjs.ArrayUtils.each(all, this._bindEach, this);
    },
    
    _isCallback: function(v, k) {
      return artjs.StringUtils.startsWith(k, '_on') && (v instanceof Function);
    },
    
    _bindEach: function(i) {
      this._bindContext[i] = this.callback(this._bindContext, i);
    }
  }
);

artjs.$DC = artjs.Delegate.callback(artjs.Delegate, 'callback');
artjs.$D = artjs.Delegate.callback(artjs.Delegate, 'create');
artjs.$BA = artjs.Delegate.callback(artjs.Delegate, 'bindAll');
