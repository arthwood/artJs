ArtJs.ClassUtils = com.arthwood.utils.ClassUtils = {
  init: function() {
    this.eachInstanceMethodDC = ArtJs.$DC(this, this.eachInstanceMethod);
    this.eachClassMethodDC = ArtJs.$DC(this, this.eachClassMethod);
    
    ArtJs.$E = ArtJs.$DC(this, this.extend);
  },
  
  extend: function(base, constr, instanceMethods, classMethods) {
    var builder = function() {
      var callee = arguments.callee;
      var c = callee.constr;
      var b = callee.base;
      var args = ArtJs.$A(arguments);
      
      callee.self = this;
      
      c.$super = ArtJs.$DC(callee.self, b);
      
      c.apply(this, args);
    };
    
    builder.prototype = new base();
    builder.prototype.constructor = builder;
    builder.base = base;
    builder.constr = constr;
    
    this.builder = builder;
    
    ArtJs.ObjectUtils.eachPair(instanceMethods, this.eachInstanceMethodDC);
    ArtJs.ObjectUtils.eachPair(classMethods, this.eachClassMethodDC);
    
    return builder;
  },
  
  eachInstanceMethod: function(k, v) {
    var b = this.builder;
    
    this.defineOverride(k, v, b.prototype, b.base.prototype[k]);
  },
  
  eachClassMethod: function(k, v) {
    var b = this.builder;
    var base = b.base;
    
    this.defineOverride(k, v, b, base[k]);
  },
  
  defineOverride: function(k, v, proto, overriden) {
    if (overriden) {
      var wrapper = function() {
        var callee = arguments.callee;
        
        callee.override.$super = ArtJs.$DC(this, callee.overriden);
        
        return callee.override.apply(this, ArtJs.$A(arguments));
      };
      
      wrapper.overriden = overriden;
      wrapper.override = v;
      wrapper.name = k;
      proto[k] = wrapper;
    }
    else {
      proto[k] = v;
    }
  }
};

ArtJs.ClassUtils.init();
