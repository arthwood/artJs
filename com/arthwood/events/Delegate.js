ArtJs.Delegate = com.arthwood.events.Delegate = ArtJs.Class(
  function(object, method) {
    this.object = object;
    this.method = method;
    this.args = ArtJs.$A(arguments, 2);
  },
  {
    invoke: function() {
      var args = ArtJs.$A(arguments).concat(this.args);
      
      return this.method.apply(this.object, args);
    },
    
    callback: function(withSource) {
      var result = function() {
        var callee = arguments.callee;
        var delegate = callee.delegate;
        var args = ArtJs.$A(arguments);
        
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
    injected: false,
    
    callback: function(object, method, withSource) {
      var delegate = new ArtJs.Delegate(object, method);
      var callback = delegate.callback(withSource);
      
      delegate.args = ArtJs.$A(arguments, 3);
      
      return callback;
    },
    
    create: function(object, method) {
      var delegate = new ArtJs.Delegate(object, method);
      
      delegate.args = ArtJs.$A(arguments, 2);
      
      return delegate;
    },

    doInjection: function() {
      Function.prototype.bind = function(obj, withSource) {
        return ArtJs.$DC.apply(ArtJs.$DC, [obj, this, withSource].concat(ArtJs.$A(arguments, 2)));
      };
      
      this.injected = true;
    }
  }
);

ArtJs.$DC = ArtJs.Delegate.callback;
ArtJs.$D = ArtJs.Delegate.create;
