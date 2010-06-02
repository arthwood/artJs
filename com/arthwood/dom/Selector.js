ArtJs.Selector = com.arthwood.dom.Selector = {
  tagRE: /^\w+/gi,
  classesRE: /\.\w+/gi,
  idRE: /#\w+/i,
  attrsRE: /\[.*\]/gi,
  
  init: function() {
    this.filterFamilyDC = ArtJs.$DC(this, this.filterFamily);
    this.candidateFamilyMapDC = ArtJs.$DC(this, this.candidateFamilyMap);
    this.getFamilyDescendantDC = ArtJs.$DC(this, this.getFamilyDescendant);
    this.attrToArrayDC = ArtJs.$DC(this, this.attrToArray);
    this.filterByAttributesDC = ArtJs.$DC(this, this.filterByAttributes);
    this.getSignatureDC = ArtJs.$DC(this, this.getSignature);
    
    ArtJs.$ = ArtJs.$DC(this, this.getElementById);
    ArtJs.$$ = ArtJs.$DC(this, this.getElements);
    ArtJs.$down = ArtJs.$DC(this, this.down);
    ArtJs.$up = ArtJs.$DC(this, this.up);
  },

  down: function(element, path) {
    return this.getElements(path, element);
  },
  
  up: function(element, path) {
    if (!path) return element.parentNode;
    
    var signature = this.getSignature(path);
    var family = this.getFamily(element);
    var j = 1;
    var n = family.length;
    var ok;

    do {
      ok = this.checkNode(family[j++], signature);
    }
    while (!ok && j < n);

    return ok ? family[j - 1] : null;
  },
  
  getElements: function(path, root) {
    var items = path.split(' ');
    var au = ArtJs.ArrayUtils;
    var signatures = au.map(items, this.getSignatureDC);
    var signature = au.last(signatures);
    var candidates = this.getElementsBySignature(signature);
    
    this.candidateFamilyMapDC.delegate.args = [root];
    
    var families = au.selectNonEmpty(au.map(candidates, this.candidateFamilyMapDC));
    
    this.filterFamilyDC.delegate.args = [signatures];
    
    var filteredFamilies = au.select(families, this.filterFamilyDC);
    
    return au.map(filteredFamilies, this.getFamilyDescendantDC);
  },
  
  candidateFamilyMap: function(i, idx, root) {
    return this.getFamily(i, root);
  },
  
  getFamily: function(e, root) {
    var family = [];
    
    while (e) {
      family.push(e);
      e = e.parentNode;
    }
    
    return family.slice(0, family.indexOf(root || document.body) + 1);
  },
  
  descendantOf: function(e, root) {
    var family = this.getFamily(e, root);
    
    return !ArtJs.ArrayUtils.empty(family) && family.length > 1;
  },
  
  selfOrDescendant: function(e, root) {
    return e == root || this.descendantOf(e, root);
  },
  
  filterFamily: function(family, signatures) {
    var i = signatures.length - 1;
    var j = 1;
    var n = family.length;
    var signature;
    var ok;
    
    if (n == 1) return true;
    
    var immediateParent = false;
    
    while (i--) {
      signature = signatures[i];
      
      var immediateParentTag = (signature == '>');
      
      if (!immediateParentTag) {
        do {
          ok = this.checkNode(family[j++], signature);
        }
        while (!ok && !immediateParent && j < n);
        
        if (!ok) return false;
      }
      
      immediateParent = immediateParentTag;
    }
    
    return true;
  },
  
  checkNode: function(node, signature) {
    var tag = signature.tag;
    var id = signature.id;
    var classes = signature.classes;
    var attributes = signature.attributes;
    var au = ArtJs.ArrayUtils;
    var ou = ArtJs.ObjectUtils;
    
    return (!tag || (node.tagName.toLowerCase() == tag))
      && (!id || node.id == id)
      && (au.empty(classes) || au.includeAll(node.className.split(' '), classes))
      && (ou.empty(attributes) || ou.includeAll(node.attributes, attributes));
  },
  
  getSignature: function(selector) {
    return (selector == '>')
      ? selector
      : {tag: this.getTag(selector), id: this.getId(selector), classes: this.getClasses(selector),
        attributes: this.getAttributes(selector)};
  },
  
  getFamilyDescendant: function(i) {
    return ArtJs.ArrayUtils.first(i);
  },
  
  getElementsBySignature: function(signature) {
    var au = ArtJs.ArrayUtils;
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
      
      if (au.empty(elementsByTag)) {
        return [];
      }
      else {
        // no id given
        if (au.empty(elements)) {
          elements = elementsByTag;
        }
        else {
          elements = au.intersection([elements, elementsByTag]);
          
          if (au.empty(elements)) {
            return [];
          }
        }
      }
    }
    
    if (!au.empty(classes)) {
      var elementsByClass = this.getElementsByClassName(classes);
      
      if (au.empty(elementsByClass)) {
        return [];
      }
      
      if (au.empty(elements)) {
        elements = elementsByClass;
      }
      else {
        elements = au.intersection([elements, elementsByClass]);
        
        if (au.empty(elements)) {
          return [];
        }
      }
    }
    
    this.filterByAttributesDC.delegate.args = [attributes];
    
    return au.compact(au.select(elements, this.filterByAttributesDC));
  },
  
  filterByAttributes: function(i, attributes) {
    return ArtJs.ObjectUtils.includeAll(ArtJs.ElementUtils.getAttributes(i), attributes);
  },
  
  getTag: function(selector) {
    var matches = selector.match(this.tagRE);
    
    return matches && ArtJs.ArrayUtils.first(matches);
  },
  
  getId: function(selector) {
    var match = ArtJs.ArrayUtils.first(this.match(selector, this.idRE));
    
    return match && this.stripIdSelector(match);
  },
  
  getClasses: function(selector) {
    return ArtJs.ArrayUtils.map(this.match(selector, this.classesRE), this.stripClassSelector);
  },
  
  getAttributes: function(selector) {
    var au = ArtJs.ArrayUtils;
    var matches = au.map(this.match(selector, this.attrsRE), this.stripAttributeSelector);
    var arr = au.map(matches[0] && matches[0].split(',') || [], this.attrToArrayDC);

    return ArtJs.ObjectUtils.fromArray(arr);
  },
  
  match: function(str, re) {
    var matches = str.match(re);
    
    return matches && ArtJs.$A(matches) || [];
  },
  
  attrToArray: function(i) {
    return i.split('=');
  },
  
  stripIdSelector: function(selector) {
    return selector.slice(1);
  },
  
  stripClassSelector: function(selector) {
    return selector.slice(1);
  },
  
  stripAttributeSelector: function(selector) {
    return selector.slice(1).slice(0, selector.length - 2);
  },
  
  getElementById: function(id) {
    return document.getElementById(id);
  },
  
  getElementsByClassName: function(selector) {
    return ArtJs.$A(document.getElementsByClassName(selector));
  },
  
  getElementsByTagName: function(tagName) {
    return ArtJs.$A(document.getElementsByTagName(tagName));
  },
  
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    
    proto.up = dc(this, this.up, true);
    proto.down = dc(this, this.down, true);
    proto.getFamily = dc(this, this.getFamily, true);
    proto.descendantOf = dc(this, this.descendantOf, true);
    proto.selfOrDescendant = dc(this, this.selfOrDescendant, true);
  }
};
