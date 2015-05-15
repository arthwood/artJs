artjs.Selector = artjs.dom.Selector = {
  findAll: function(element, selector) {
    return this.getElements(selector, element);
  },
  
  find: function(element, selector) {
    return this.getElement(selector, element);
  },

  parent: function(element) {
    return element.parentNode;
  },
  
  getElement: function(selector, element) {
    return (element || document).querySelector(selector);
  },
  
  getElements: function(selector, element) {
    return artjs.$A((element || document).querySelectorAll(selector));
  },
  
  isDescendantOf: function(element, ref) {
    var ancestors = this.getAncestors(element, ref);

    return artjs.Object.isPresent(ancestors);
  },
  
  isSelfOrDescendantOf: function(element, ref) {
    return element == ref || this.isDescendantOf(element, ref);
  },
  
  getElementById: function(v) {
    return document.getElementById(v);
  },
  
  getElementsByTagName: function(v) {
    return artjs.$A(document.getElementsByTagName(v));
  },
  
  isOnStage: function(e) {
    return this.isDescendantOf(e);
  },
  
  getAncestors: function(e, ref) {
    var result = [];
    
    while (e = this.parent(e)) {
      result.push(e);
    }
    
    var index = result.indexOf(ref || document.body);
    
    return index == -1 ? null : result.slice(0, index);
  }
};
