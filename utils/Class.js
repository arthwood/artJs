artjs.Class = artjs.utils.Class = function(ctor, proto, stat, superclass) {
  var builder = new artjs.ClassBuilder(ctor, proto, stat, superclass);
  
  return builder.ctor;
};

artjs.Class._name = 'Class';

artjs.Class.toString = function() {
  return this._name;
};

artjs.ClassBuilder = function(ctor, proto, stat, superclass) {
  this.ctor = ctor || this._defaultConstructor();
  this.ctor._onCreated = this._defaultOnCreated;
  this.ctor._onExtended = this._defaultOnExtended;
  
  if (superclass) {
    var _super_ = function() {
      var ctor = arguments.callee.ctor;
      var _arguments_ = artjs.$A(arguments);
      var __arguments__ = _arguments_.shift();
      var _callee_ = __arguments__.callee;
      var _super_ = _callee_.superclass || _callee_.super;
      
      return _super_.apply(this, _arguments_.concat(artjs.$A(__arguments__)));
    };
    
    _super_.ctor = this.ctor;
    
    artjs.ObjectUtils.extend(this.ctor, superclass);
    artjs.ObjectUtils.extend(this.ctor.prototype, superclass.prototype);
    
    this.ctor.superclass = superclass;
    this.ctor.super = _super_;
    this.ctor.prototype.super = _super_;
  }
  else {
    this.ctor.prototype = {};
  }

  this.ctor.prototype.ctor = this.ctor;
  
  if (proto) {
    artjs.ObjectUtils.eachPair(proto, this._eachProto, this);
  }
  
  if (stat) {
    artjs.ObjectUtils.eachPair(stat, this._eachStat, this);
  }
  
  this.ctor._onCreated();
  
  if (superclass) {
    this.ctor._onExtended();
  }
};

artjs.ClassBuilder.prototype = {
  _defaultOnCreated: function() {
    this.subclasses = [];
  },
  
  _defaultOnExtended: function() {
    this.superclass.subclasses.push(this);
  },
  
  _defaultConstructor: function() {
    return function() {
      if (arguments.callee.superclass) {
        this.super(arguments);
      }
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
