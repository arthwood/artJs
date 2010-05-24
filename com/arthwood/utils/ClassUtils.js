ArtJs.ClassUtils = com.arthwood.utils.ClassUtils = {
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
      var child = callee.child;
      var base = callee.base;
      
      child.$super = ArtJs.$DC(proto, base);
      child.apply(proto, args);
    };
    
    builder.prototype = new base();
    builder.prototype.constructor = builder;
    builder.base = base;
    builder.child = func;

    this.builder = builder;
    
    ArtJs.ObjectUtils.extend(builder.prototype, instanceMethods);
    ArtJs.ObjectUtils.extend(builder, classMethods);
    
    ArtJs.ObjectUtils.eachPair(instanceMethods, this.eachInstanceMethodDC);
    ArtJs.ObjectUtils.eachPair(classMethods, this.eachClassMethodDC);
    
    return builder;
  },
  
  eachInstanceMethod: function(k, v) {
    var builderProto = this.builder.prototype;
    var baseProto = this.builder.base.prototype;
    var origin = baseProto[k];
    
    origin && (v.$super = ArtJs.$DC(builderProto, origin));
  },
  
  eachClassMethod: function(k, v) {
    var builder = this.builder;
    var base = builder.base;
    var origin = base[k];
    
    origin && (v.$super = ArtJs.$DC(builder, origin));
  }
};
