ArtJs.Selector = com.arthwood.dom.Selector = {
  _init: function() {
    ArtJs.$ = ArtJs.$DC(this, this.getElements);
    ArtJs.$find = ArtJs.$DC(this, this.find);
    ArtJs.$parent = ArtJs.$DC(this, this.parent);
  },
  
  find: function(element, selector) {
    return this.getElements(selector, element);
  },

  first: function(element, selector) {
    return ArtJs.ArrayUtils.first(this.find(element, selector));
  },

  last: function(element, selector) {
    return ArtJs.ArrayUtils.last(this.find(element, selector));
  },
  
  parent: function(element, selector) {
    this._signature = new ArtJs.Signature(selector || '');

    return ArtJs.ArrayUtils.detect(this._getDescendants(element), this._signature.checkNode, this._signature);
  },
  
  getElements: function(selector, element) {
    this._root = element;
    
    var elements = this._findBySignature(new ArtJs.Signature(selector));
    var descendants = ArtJs.ArrayUtils.map(elements, this._elementToDescendants, this);
    
    descendants = ArtJs.ArrayUtils.select(descendants, this._hasElementDescendants, this);
    
    return ArtJs.ArrayUtils.pluck(descendants, 'x');
  },
  
  isDescendantOf: function(element, root) {
    var descendants = this._getDescendants(element, root);

    return !ArtJs.ArrayUtils.isEmpty(descendants);
  },
  
  isSelfOrDescendantOf: function(element, root) {
    return element == root || this.isDescendantOf(element, root);
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
  
  _elementToDescendants: function(element) {
    return new ArtJs.Point(element, this._toDescendants(element));
  },
  
  _toDescendants: function(i) {
    return this._getDescendants(i, this._root);
  },
  
  _getDescendants: function(e, root) {
    var result = [];
    
    while (e = e.parentNode) {
      result.push(e);
    }
    
    var index = result.indexOf(root || document.body);
    
    return root && index == -1 ? null : result.slice(0, index);
  },
  
  _hasElementDescendants: function(point) {
    return !(point.y === null);
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
      
      if (ArtJs.ArrayUtils.isEmpty(elementsByTag)) {
        return [];
      }
      else {
        /* no id given */
        if (ArtJs.ArrayUtils.isEmpty(elements)) {
          elements = elementsByTag;
        }
        else {
          elements = ArtJs.ArrayUtils.intersection([elements, elementsByTag]);
          
          if (ArtJs.ArrayUtils.isEmpty(elements)) {
            return [];
          }
        }
      }
    }
    
    if (!ArtJs.ArrayUtils.isEmpty(signature.classes)) {
      var elementsByClass = this._findByClassNames(signature.classes);
      
      if (ArtJs.ArrayUtils.isEmpty(elementsByClass)) {
        return [];
      }
      
      if (ArtJs.ArrayUtils.isEmpty(elements)) {
        elements = elementsByClass;
      }
      else {
        elements = ArtJs.ArrayUtils.intersection([elements, elementsByClass]);
        
        if (ArtJs.ArrayUtils.isEmpty(elements)) {
          return [];
        }
      }
    }
    
    this._filterByAttributes.attributes = signature.attributes;
    
    return ArtJs.ArrayUtils.compact(ArtJs.ArrayUtils.select(elements, this._filterByAttributes, this));
  },
  
  _findByClassNames: function(v) {
    return ArtJs.ArrayUtils.intersection(ArtJs.ArrayUtils.map(v, this.getElementsByClassName, this));
  },

  _elementHasClassName: function(e) {
    return ArtJs.ElementUtils.hasClass(e, arguments.callee.className);
  },

  _filterByAttributes: function(i) {
    var attributes = arguments.callee.attributes;
    
    return ArtJs.ObjectUtils.includesAll(ArtJs.ElementUtils.getAttributes(i), attributes);
  },
  
  _findByClassName: function(v) {
    var elements = ArtJs.ElementUtils.filterElements(ArtJs.$A(document.all));

    this._elementHasClassName.className = v;

    return ArtJs.ArrayUtils.select(elements, this._elementHasClassName);
  },
  
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    
    proto.find = dc(this, this.find, true);
    proto.first = dc(this, this.first, true);
    proto.getElementById = dc(this, this.getElementById, true);
    proto.getElementsByTagName = dc(this, this.getElementsByTagName, true);
    proto.getElementsByClassName = dc(this, this.getElementsByClassName, true);
    proto.isDescendantOf = dc(this, this.isDescendantOf, true);
    proto.last = dc(this, this.last, true);
    proto.parent = dc(this, this.parent, true);
    proto.isSelfOrDescendantOf = dc(this, this.isSelfOrDescendantOf, true);
  }
};
