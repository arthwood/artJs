artjs.Selector = artjs.dom.Selector = {
  init: function() {
    artjs.$ = artjs.$DC(this, 'getElements');
    artjs.$find = artjs.$DC(this, 'find');
    artjs.$first = artjs.$DC(this, 'first');
    artjs.$parent = artjs.$DC(this, 'parent');
  },
  
  find: function(element, selector) {
    return this.getElements(selector, element);
  },

  first: function(element, selector) {
    return artjs.ArrayUtils.first(this.find(element, selector));
  },

  last: function(element, selector) {
    return artjs.ArrayUtils.last(this.find(element, selector));
  },
  
  parent: function(element, selector) {
    this._signature = new artjs.Signature(selector || '');

    return artjs.ArrayUtils.detect(this._getDescendants(element), this._signature.checkNode, this._signature);
  },
  
  getElements: function(selector, element) {
    this._root = element;
    
    var elements = this._findBySignature(new artjs.Signature(selector));
    var descendants = artjs.ArrayUtils.map(elements, this._elementToDescendants, this);
    
    descendants = artjs.ArrayUtils.select(descendants, this._hasElementDescendants, this);
    
    return artjs.ArrayUtils.pluck(descendants, 'x');
  },
  
  isDescendantOf: function(element, root) {
    var descendants = this._getDescendants(element, root);

    return !artjs.ArrayUtils.isEmpty(descendants);
  },
  
  isSelfOrDescendantOf: function(element, root) {
    return element == root || this.isDescendantOf(element, root);
  },
  
  getElementById: function(v) {
    return document.getElementById(v);
  },
  
  getElementsByTagName: function(v) {
    return artjs.$A(document.getElementsByTagName(v));
  },
  
  getElementsByClassName: function(v) {
    return document.getElementsByClassName
      ? artjs.$A(document.getElementsByClassName(v))
      : this._findByClassName(v);
  },
  
  _elementToDescendants: function(element) {
    return new artjs.Point(element, this._toDescendants(element));
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
      
      if (artjs.ArrayUtils.isEmpty(elementsByTag)) {
        return [];
      }
      else {
        /* no id given */
        if (artjs.ArrayUtils.isEmpty(elements)) {
          elements = elementsByTag;
        }
        else {
          elements = artjs.ArrayUtils.intersection([elements, elementsByTag]);
          
          if (artjs.ArrayUtils.isEmpty(elements)) {
            return [];
          }
        }
      }
    }
    
    if (!artjs.ArrayUtils.isEmpty(signature.classes)) {
      var elementsByClass = this._findByClassNames(signature.classes);
      
      if (artjs.ArrayUtils.isEmpty(elementsByClass)) {
        return [];
      }
      
      if (artjs.ArrayUtils.isEmpty(elements)) {
        elements = elementsByClass;
      }
      else {
        elements = artjs.ArrayUtils.intersection([elements, elementsByClass]);
        
        if (artjs.ArrayUtils.isEmpty(elements)) {
          return [];
        }
      }
    }
    
    this._filterByAttributes.attributes = signature.attributes;
    
    return artjs.ArrayUtils.compact(artjs.ArrayUtils.select(elements, this._filterByAttributes, this));
  },
  
  _findByClassNames: function(v) {
    return artjs.ArrayUtils.intersection(artjs.ArrayUtils.map(v, this.getElementsByClassName, this));
  },

  _elementHasClassName: function(e) {
    return artjs.ElementUtils.hasClass(e, arguments.callee.className);
  },

  _filterByAttributes: function(i) {
    var attributes = arguments.callee.attributes;
    
    return artjs.ObjectUtils.includesAll(artjs.ElementUtils.getAttributes(i), attributes);
  },
  
  _findByClassName: function(v) {
    var elements = artjs.ElementUtils.filterElements(artjs.$A(document.all));

    this._elementHasClassName.className = v;

    return artjs.ArrayUtils.select(elements, this._elementHasClassName);
  }
};
