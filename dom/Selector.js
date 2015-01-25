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
  
  _getDescendants: function(e, root) {
    var result = [];
    
    while (e = this.parent(e)) {
      result.push(e);
    }
    
    var index = result.indexOf(root || document.body);
    
    return root && index == -1 ? null : result.slice(0, index);
  }
};
