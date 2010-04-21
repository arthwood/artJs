ArtJs.ClassUtils = pl.arthwood.utils.ClassUtils = {
  init: function() {
    this.eachInstanceMethodDC = ArtJs.$DC(this, this.eachInstanceMethod);
    this.eachClassMethodDC = ArtJs.$DC(this, this.eachClassMethod);
    
    ArtJs.$E = ArtJs.$DC(this, this.extend);
  },
  
  extend: function(base, func, instanceMethods, classMethods) {
    var builder = function() {
      var args = ArtJs.$A(arguments);
      var callee = arguments.callee;
      var proto = callee.prototype;
      var func = callee.func;
      var base = callee.base;
      
      func.super = ArtJs.$DC(proto, base);
      func.apply(proto, args);
    };
    
    builder.prototype = new base();
    builder.func = func;
    builder.base = base;
    
    this.base = base;
    this.builder = builder;
    
    ArtJs.ObjectUtils.extend(builder.prototype, instanceMethods);
    ArtJs.ObjectUtils.extend(builder, classMethods);
    
    ArtJs.ObjectUtils.eachPair(instanceMethods, this.eachInstanceMethodDC);
    ArtJs.ObjectUtils.eachPair(classMethods, this.eachClassMethodDC);
    
    return builder;
  },
  
  eachInstanceMethod: function(k, v) {
    var baseProto = this.base.prototype;
    var builderProto = this.builder.prototype;
    var origin = baseProto[k];
    
    origin && (v.super = ArtJs.$DC(builderProto, origin));
  },
  
  eachClassMethod: function(k, v) {
    var base = this.base;
    var builder = this.builder;
    var origin = base[k];
    
    origin && (v.super = ArtJs.$DC(builder, origin));
  }
};
