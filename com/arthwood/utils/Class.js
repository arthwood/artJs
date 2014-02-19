ArtJs.Class = function(ctor, proto, stat, superclass) {
  var builder = new ArtJs.ClassBuilder(ctor, proto, stat, superclass);
  
  return builder.ctor;
};

ArtJs.ClassBuilder = function(ctor, proto, stat, superclass) {
  this.ctor = ctor || this._defaultConstructor();
  this.ctor.prototype.constructor = this.ctor;
  
  if (superclass) {
    this.ctor.super = superclass;

    ArtJs.ObjectUtils.extend(this.ctor, superclass);
    ArtJs.ObjectUtils.extend(this.ctor.prototype, superclass.prototype);
    
    this.ctor.prototype.super = function() {
      var _arguments_ = ArtJs.$A(arguments);
      var __arguments__ = _arguments_.shift();

      return __arguments__.callee.super.apply(this, _arguments_);
    };
  }
  else {
    this.ctor.prototype = {};
  }
  
  if (proto) {
    ArtJs.ObjectUtils.eachPair(proto, this._eachProto, this);
  }
  
  if (stat) {
    ArtJs.ObjectUtils.eachPair(stat, this._eachStat, this);
  }
};

ArtJs.ClassBuilder.prototype = {
  _defaultConstructor: function() {
    return function() { 
      this.super(); 
    };
  },
  
  _eachProto: function(k, v) {
    this._each(this.ctor.prototype, k, v);
  },
  
  _eachStat: function(k, v) {
    this._each(this.ctor, k, v);
  },
  
  _each: function(obj, k, v) {
    if (typeof v == 'function') {
      if (obj[k]) {
        v.super = obj[k];
      }

    }
    
    obj[k] = v;
  }
};
