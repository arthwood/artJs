ArtJs.ElementUtils = pl.arthwood.net.ElementUtils = {
  HIDDEN_ELEMENTS: [],
  
  init: function() {
    this.detectHiddenElementDelegate = ArtJs.$DC(this, this.detectHiddenElement);
    this.isElementDelegate = ArtJs.$DC(this, this.isElement);
    this.injected = false;
  },
  
  show: function(e) {
    var hidden = this.getHidden(e);
    
    if (hidden) {
      ArtJs.ArrayUtils.removeItem(this.HIDDEN_ELEMENTS, hidden);
      
      e.style.display = hidden.display;
    }
  },
  
  hide: function(e) {
    var hidden = this.getHidden(e);
    
    if (!hidden) {
      this.HIDDEN_ELEMENTS.push({element: e, display: e.style.display});
      e.style.display = 'none';
    }
  },
  
  getHidden: function(e) {
    this.detectHiddenElementDelegate.delegate.args = [e];
    
    return ArtJs.ArrayUtils.detect(this.HIDDEN_ELEMENTS, this.detectHiddenElementDelegate);
  },
  
  detectHiddenElement: function(i, e) {
    return i.element == e;
  },
  
  setAlpha: function(e, v) {
    e.style.opacity = v;
  },
  
  getAlpha: function(e) {
    return e.style.opacity;
  },
  
  isElement: function(e) {
    return e.nodeType == 1;
  },
  
  elements: function(e) {
    return ArtJs.ArrayUtils.select(e.childNodes, this.isElementDelegate);
  },
  
  remove: function(e) {
    e.parentNode.removeChild(e);
  },
  
  parent: function(e) {
    return e.parentNode;
  },
  
  prev: function(e) {
    var result = e;
    
    do {
      result = result.previousSibling;
    }
    while (result && !this.isElement(result));
    
    return result;
  },
  
  next: function(e) {
    var result = e;
    
    do {
      result = result.nextSibling;
    }
    while (result && !this.isElement(result));
    
    return result;
  },
  
  putAtBottom: function(e, container) {
    container.appendChild(e.cloneNode(true));
  },
    
  putAtTop: function(e, container) {
    var first = ArtJs.ArrayUtils.first(this.children(container));
    
    first ? this.putBefore(e, first) : this.putAtBottom(e, container);
  },
  
  putAfter: function(e, ref) {
    var next = this.next(ref);
    
    next ? this.putBefore(e, next) : this.putAtBottom(e, this.parent(ref));
  },
  
  putBefore: function(e, ref) {
    this.parent(ref).insertBefore(e, ref);
  },
  
  setPosition: function(e, p) {
    e.style.top = p.x + 'px';
    e.style.left = p.y + 'px';
  },
  
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    var insert = this.insert;
    
    proto.show = dc(this, this.show, true);
    proto.hide = dc(this, this.hide, true);
    proto.setAlpha = dc(this, this.setAlpha, true);
    proto.getAlpha = dc(this, this.getAlpha, true);
    proto.isElement = dc(this, this.isElement, true);
    proto.elements = dc(this, this.elements, true);
    proto.remove = dc(this, this.remove, true);
    proto.parent = dc(this, this.parent, true);
    proto.prev = dc(this, this.prev, true);
    proto.next = dc(this, this.next, true);
    proto.putAtBottom = dc(this, this.putAtBottom, true);
    proto.putAtTop = dc(this, this.putAtTop, true);
    proto.putAfter = dc(this, this.putAfter, true);
    proto.putBefore = dc(this, this.putBefore, true);
    proto.setPosition = dc(this, this.setPosition, true);
                                                              
    this.injected = true;
  }
};
