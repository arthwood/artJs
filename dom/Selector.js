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
  
  getElementById: function(id) {
    return document.getElementById(id);
  },
  
  getElementsByTagName: function(tagName) {
    return artjs.$A(document.getElementsByTagName(tagName));
  },
  
  isOnStage: function(element) {
    return this.isDescendantOf(element);
  },
  
  getAncestors: function(element, ref) {
    var result = [];
    
    while (element = this.parent(element)) {
      result.push(element);
    }
    
    var index = result.indexOf(ref || document.body);
    
    return index == -1 ? null : result.slice(0, index);
  }
};
