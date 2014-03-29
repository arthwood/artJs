ArtJs.Selector = com.arthwood.dom.Selector = {
  init: function() {
    this._au = ArtJs.ArrayUtils;
    this._ou = ArtJs.ObjectUtils;
    
    ArtJs.$ = ArtJs.$DC(this, this.getElements);
    ArtJs.$find = ArtJs.$DC(this, this.find);
    ArtJs.$parent = ArtJs.$DC(this, this.parent);
  },
  
  find: function(element, path) {
    return this.getElements(path, element);
  },

  first: function(element, path) {
    return ArtJs.ArrayUtils.first(this.find(element, path));
  },

  last: function(element, path) {
    return ArtJs.ArrayUtils.last(this.find(element, path));
  },
  
  parent: function(element, pattern) {
    this._signature = new ArtJs.Signature(pattern || '');

    return this._au.detect(this._getDescendants(element), this._signature.checkNode, this._signature);
  },
  
  getElements: function(pattern, root) {
    this._root = root;
    
    var elements = this._findBySignature(new ArtJs.Signature(pattern));
    var descendants = this._au.map(elements, this._elementToDescendants, this);
    
    descendants = this._au.select(descendants, this._hasElementDescendants, this);
    
    return this._au.pluck(descendants, 'x');
  },
  
  _elementToDescendants: function(element) {
    return new ArtJs.Point(element, this._toDescendants(element));
  },
  
  _toDescendants: function(i) {
    return this._getDescendants(i, this._root);
  },
  
  _getDescendants: function(e, root) {
    var result = [];
    
    while (e) {
      result.push(e);
      e = e.parentNode;
    }
    
    var index = result.indexOf(root || document.body);
    
    return root && index == -1 ? null : result.slice(1, index);
  },
  
  _hasElementDescendants: function(point) {
    return !(point.y === null);
  },
  
  isDescendantOf: function(e, root) {
    var descendants = this._getDescendants(e, root);

    return !this._au.isEmpty(descendants);
  },
  
  isSelfOrDescendantOf: function(e, root) {
    return e == root || this.isDescendantOf(e, root);
  },
  
  getElementById: function(v) {
    return document.getElementById(v);
  },
  
  getElementsByTagName: function(v) {
    return ArtJs.$A(document.getElementsByTagName(v));
  },
  
  getElementsByClassName: function(v) {
    return document.getElementsByClassName
      ? ArtJs.$A(document.getElementsByClassName(v))
      : this._findByClassName(v);
  },
  
  _findBySignature: function(signature) {
    var elements = [];
    
    if (signature.id) {
      var elementById = this.getElementById(signature.id);
      
      if (elementById) {
        elements.push(elementById);
      }
      else {
        return [];
      }
    }
    
    if (signature.tag) {
      var elementsByTag = this.getElementsByTagName(signature.tag);
      
      if (this._au.isEmpty(elementsByTag)) {
        return [];
      }
      else {
        /* no id given */
        if (this._au.isEmpty(elements)) {
          elements = elementsByTag;
        }
        else {
          elements = this._au.intersection([elements, elementsByTag]);
          
          if (this._au.isEmpty(elements)) {
            return [];
          }
        }
      }
    }
    
    if (!this._au.isEmpty(signature.classes)) {
      var elementsByClass = this._findByClassNames(signature.classes);
      
      if (this._au.isEmpty(elementsByClass)) {
        return [];
      }
      
      if (this._au.isEmpty(elements)) {
        elements = elementsByClass;
      }
      else {
        elements = this._au.intersection([elements, elementsByClass]);
        
        if (this._au.isEmpty(elements)) {
          return [];
        }
      }
    }
    
    this._filterByAttributes.attributes = signature.attributes;
    
    return this._au.compact(this._au.select(elements, this._filterByAttributes, this));
  },
  
  _findByClassNames: function(v) {
    return this._au.intersection(this._au.map(v, this.getElementsByClassName, this));
  },

  _elementHasClassName: function(e) {
    return ArtJs.ElementUtils.hasClass(e, arguments.callee.className);
  },

  _filterByAttributes: function(i) {
    var attributes = arguments.callee.attributes;
    
    return this._ou.includesAll(ArtJs.ElementUtils.getAttributes(i), attributes);
  },
  
  _findByClassName: function(v) {
    var elements = ArtJs.ElementUtils.filterElements(ArtJs.$A(document.all));

    this._elementHasClassName.className = v;

    return this._au.select(elements, this._elementHasClassName);
  },
  
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    
    proto.descendantOf = dc(this, this.descendantOf, true);
    proto.find = dc(this, this.find, true);
    proto.first = dc(this, this.first, true);
    proto.getFamily = dc(this, this.getFamily, true);
    proto.last = dc(this, this.last, true);
    proto.parent = dc(this, this.parent, true);
    proto.selfOrDescendant = dc(this, this.selfOrDescendant, true);
  }
};
