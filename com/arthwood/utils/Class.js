ArtJs.Class = function(ctor, proto, stat, superclass) {
  var builder = new ArtJs.ClassBuilder(ctor, proto, stat, superclass);
  
  return builder.ctor;
};

ArtJs.ClassBuilder = function(ctor, proto, stat, superclass) {
  this.ctor = ctor || this._defaultConstructor();
  
  if (superclass) {
    var _super_ = function() {
      var ctor = arguments.callee.ctor;
      var _arguments_ = ArtJs.$A(arguments);
      var __arguments__ = _arguments_.shift();
      var _callee_ = __arguments__.callee;
      var _super_ = _callee_.superclass || _callee_.super;
      
      return _super_.apply(this, _arguments_);
    };
    
    _super_.ctor = this.ctor;
    
    ArtJs.ObjectUtils.extend(this.ctor, superclass);
    ArtJs.ObjectUtils.extend(this.ctor.prototype, superclass.prototype);
    
    this.ctor.superclass = superclass;
    this.ctor.super = _super_;
    this.ctor.prototype.super = _super_;
  }
  else {
    this.ctor.prototype = {};
  }

  this.ctor.prototype.ctor = this.ctor;
  
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
      this.super(arguments); 
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
