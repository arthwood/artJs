ArtJs.Selector = com.arthwood.dom.Selector = {
  tagRE: /^\w+/gi,
  classesRE: /\.[\w\-]+/gi,
  idRE: /#[\w\-]+/gi,
  attrsRE: /\[.*\]/gi,
  
  init: function() {
    this._filterDescendantsDC = ArtJs.$DC(this, this._filterDescendants);
    this._toDescendantsDC = ArtJs.$DC(this, this._toDescendants);
    this._filterByAttributesDC = ArtJs.$DC(this, this._filterByAttributes);
    this._au = ArtJs.ArrayUtils;
    this._ou = ArtJs.ObjectUtils;

    this._elementHasClassNameDC = ArtJs.$DC(this, this._elementHasClassName);
    
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
  
  parent: function(element, path) {
    if (!path) {
      return element.parentNode;
    }
    
    var signature = this._getSignature(path);
    var family = this._getDescendants(element);
    var j = 1;
    var n = family.length;
    var ok;

    do {
      ok = this._checkNode(family[j++], signature);
    }
    while (!ok && j < n);

    return ok ? family[j - 1] : null;
  },
  
  getElements: function(path, root) {
    var items = path.split(' ');
    var signatures = this._au.map(items, this._getSignature, this);
    var candidates = this._getElementsBySignature(this._au.last(signatures));
    
    this._toDescendantsDC.delegate.args = [root];
    
    var descendants = this._au.selectNonEmpty(this._au.map(candidates, this._toDescendantsDC));
    
    this._filterDescendantsDC.delegate.args = [signatures];
    
    var filteredDescendants = this._au.select(descendants, this._filterDescendantsDC);
    
    return this._au.map(filteredDescendants, this._au.first, this._au);
  },

  isDescendantOf: function(e, root) {
    var descendants = this._getDescendants(e, root);

    return !this._au.isEmpty(descendants) && descendants.length > 1;
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
      : this._getElementsByClassName(v);
  },

  _toDescendants: function(i, idx, root) {
    return this._getDescendants(i, root);
  },
  
  _getDescendants: function(e, root) {
    var result = [];
    
    while (e) {
      result.push(e);
      e = e.parentNode;
    }
    
    return result.slice(0, result.indexOf(root || document.body) + 1);
  },
  
  _filterDescendants: function(descendants, signatures) {
    var i = signatures.length - 1;
    var j = 1;
    var n = descendants.length;
    var signature;
    var ok;
    
    if (n == 1) {
      return true;
    }
    
    var immediateParent = false;
    
    while (i--) {
      signature = signatures[i];
      
      var immediateParentTag = (signature == '>');
      
      if (!immediateParentTag) {
        do {
          ok = this._checkNode(descendants[j++], signature);
        }
        while (!ok && !immediateParent && j < n);
        
        if (!ok) {return false;}
      }
      
      immediateParent = immediateParentTag;
    }
    
    return true;
  },
  
  _checkNode: function(node, signature) {
    var tag = signature.tag;
    var id = signature.id;
    var classes = signature.classes;
    var attributes = signature.attributes;
    
    return (!tag || (node.tagName.toLowerCase() == tag)) &&
      (!id || node.id == id) &&
      (this._au.isEmpty(classes) || this._au.includesAll(node.className.split(' '), classes)) &&
      (this._ou.isEmpty(attributes) || this._ou.includesAll(node.attributes, attributes));
  },
  
  _getSignature: function(selector) {
    if (selector == '>') {
      return selector;
    }
    else {
      return  {
        tag: this._getTag(selector), 
        id: this._getId(selector), 
        classes: this._getClasses(selector), 
        attributes: this._getAttributes(selector)
      };
    }
  },
  
  _getElementsBySignature: function(signature) {
    var id = signature.id;
    var tag = signature.tag;
    var classes = signature.classes;
    var attributes = signature.attributes;
    var elements = [];
    
    if (id) {
      var elementById = this.getElementById(id);
    
      if (elementById) {
        elements.push(elementById);
      }
      else {
        return [];
      }
    }
    
    if (tag) {
      var elementsByTag = this.getElementsByTagName(tag);
      
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
    
    if (!this._au.isEmpty(classes)) {
      var elementsByClass = this._getElementsByClassNames(classes);
      
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
    
    this._filterByAttributesDC.delegate.args = [attributes];
    
    return this._au.compact(this._au.select(elements, this._filterByAttributesDC));
  },
  
  _getTag: function(selector) {
    var matches = selector.match(this.tagRE);
    
    return matches && this._au.first(matches);
  },
  
  _getId: function(selector) {
    var match = this._au.first(this._match(selector, this.idRE));
    
    return match && this._stripIdSelector(match);
  },
  
  _getClasses: function(selector) {
    return this._au.map(this._match(selector, this.classesRE), this._stripClassSelector, this);
  },
  
  _getAttributes: function(selector) {
    var matches = this._au.map(this._match(selector, this.attrsRE), this._stripAttributeSelector, this);
    var arr = this._au.map(matches[0] && matches[0].split(',') || [], this._attrToArray, this);

    return this._ou.fromArray(arr);
  },
  
  _match: function(str, re) {
    var matches = str.match(re);
    
    return matches && ArtJs.$A(matches) || [];
  },
  
  _attrToArray: function(i) {
    return i.split('=');
  },
  
  _stripIdSelector: function(v) {
    return v.slice(1);
  },
  
  _stripClassSelector: function(v) {
    return v.slice(1);
  },
  
  _stripAttributeSelector: function(v) {
    return v.slice(1).slice(0, v.length - 2);
  },
  
  _getElementsByClassNames: function(v) {
    return this._au.intersection(this._au.map(v, this.getElementsByClassName, this));
  },

  _elementHasClassName: function(e, className) {
    return ArtJs.ElementUtils.hasClass(e, className);
  },

  _filterByAttributes: function(i, attributes) {
    return this._ou.includesAll(ArtJs.ElementUtils.getAttributes(i), attributes);
  },
  
  _getElementsByClassName: function(v) {
    var elements = ArtJs.ElementUtils.filterElements(ArtJs.$A(document.all));

    this._elementHasClassNameDC.delegate.args = [v];

    return this._au.select(elements, this._elementHasClassNameDC);
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
