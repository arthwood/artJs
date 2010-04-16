ArtJs.ElementUtils = pl.arthwood.net.ElementUtils = {
  HIDDEN_ELEMENTS: [],
  DEFAULT_DISPLAY: 'block',
  MAIN_OBJ_RE: /^\w+/,
  SUB_OBJ_RE: /\[\w+\]/g,
  
  init: function() {
    this.detectHiddenElementDC = ArtJs.$DC(this, this.detectHiddenElement);
    this.isElementDC = ArtJs.$DC(this, this.isElement);
    this.serializeInjectDC = ArtJs.$DC(this, this.serializeInject);
    this.mapSubDC = ArtJs.$DC(this, this.mapSub);
    this.injected = false;
  },
  
  show: function(e) {
    var hidden = this.getHidden(e);
    
    ArtJs.ArrayUtils.removeItem(this.HIDDEN_ELEMENTS, hidden);
    
    var display = hidden && hidden.display || e.style.display;
    
    e.style.display = (display == 'none') ? this.DEFAULT_DISPLAY : display;
  },
  
  hide: function(e) {
    var hidden = this.getHidden(e);
    
    if (!hidden) {
      this.HIDDEN_ELEMENTS.push({element: e, display: e.style.display});
      e.style.display = 'none';
    }
  },
  
  toggle: function(e) {
    this.setVisible(e, this.isHidden(e));
  },
  
  setVisible: function(e, v) {
    v ? this.show(e) : this.hide(e);
  },
  
  isHidden: function(e) {
    var hidden = this.getHidden(e);
    
    return hidden || e.style.display == 'none';
  },
  
  getHidden: function(e) {
    this.detectHiddenElementDC.delegate.args = [e];
    
    return ArtJs.ArrayUtils.detect(this.HIDDEN_ELEMENTS, this.detectHiddenElementDC);
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
  
  getSize: function(e) {
    return this.getLayout(e).getSize(); 
  },
  
  elements: function(e) {
    return ArtJs.ArrayUtils.select(e.childNodes, this.isElementDC);
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
  
  replace: function(e, ref) {
    this.parent(ref).replaceChild(e, ref);
  },
  
  center: function(e) {
    this.setPosition(e, this.getCenteredPosition(this.getSize(e)));
  },
  
  centerH: function(e) {
    var pos = this.getCenteredPosition(e);
    
    this.setX(e, pos.x);
  },
  
  centerV: function(e) {
    var pos = this.getCenteredPosition(e);
    
    this.setY(e, pos.y);
  },
  
  getCenteredPosition: function(e) {
    return this.getDocumentSize().sub(this.getSize(e)).times(0.5);
  },
  
  getDocumentSize: function() {
    var doc = window.document;
    
    return new ArtJs.Point(doc.width, doc.height);
  },
  
  setPosition: function(e, p) {
    this.setX(e, p.x);
    this.setY(e, p.y);
  },
  
  getPosition: function(e) {
    return this.getLayout().getLeftTop();
  },
  
  setX: function(e, v) {
    e.style.left = v + 'px';
  },
  
  setY: function(e, v) {
    e.style.top = v + 'px';
  },
  
  getLayout: function(e) {
    var hidden = this.isHidden(e);
    
    if (hidden) {
      this.show(e);
    }
    
    var b = e.getBoundingClientRect();
    var layout = new ArtJs.Rectangle(b.left, b.top, b.right, b.bottom);
    
    if (hidden) {
      this.hide(e);
    }
    
    return layout;
  },
  
  enable: function(e) {
    e.removeAttribute('disabled'); 
  },
  
  disable: function(e) {
    e.setAttribute('disabled', 'disabled'); 
  },
  
  setEnabled: function(e, enabled) {
    enabled ? this.enable(e) : this.disable(e);
  },
  
  serialize: function(e) {
    var textfields = ArtJs.Selector.down(e, 'input[type=text]');
    var checkboxes = ArtJs.Selector.down(e, 'input[type=checkbox]');
    var radios = ArtJs.Selector.down(e, 'input[type=radio]');
    var selects = ArtJs.Selector.down(e, 'select');
    var textareas = ArtJs.Selector.down(e, 'textarea');
    
    var inputs = ArtJs.ArrayUtils.flatten([textfields, checkboxes, radios, selects, textareas]);
    
    var result = ArtJs.ArrayUtils.inject(inputs, {}, this.serializeInjectDC);
    
    return result;
  },
  
  serializeInject: function(mem, i, idx) {
    var name = i.name;
    var value = i.value;
    var main = ArtJs.ArrayUtils.first(name.match(this.MAIN_OBJ_RE));
    var props = name.match(this.SUB_OBJ_RE).map(this.mapSubDC);
    
    props.unshift(main);
    
    var obj = mem;
    var n = props.length - 1;
    var k, prop;
    
    for (k = 0; k < n; k++) {
      prop = props[k];
      (obj[prop] instanceof Object) || (obj[prop] = {});
      obj = obj[prop];
    }
    
    obj[props[k]] = value;
    
    return mem;
  },
  
  mapSub: function(i, idx) {
    return ArtJs.StringUtils.sub(i, 1, -1);
  },
  
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    var insert = this.insert;
    
    proto.show = dc(this, this.show, true);
    proto.hide = dc(this, this.hide, true);
    proto.toggle = dc(this, this.toggle, true);
    proto.setVisible = dc(this, this.setVisible, true);
    proto.isHidden = dc(this, this.isHidden, true);
    proto.setAlpha = dc(this, this.setAlpha, true);
    proto.getAlpha = dc(this, this.getAlpha, true);
    proto.isElement = dc(this, this.isElement, true);
    proto.getSize = dc(this, this.getSize, true);
    proto.elements = dc(this, this.elements, true);
    proto.remove = dc(this, this.remove, true);
    proto.parent = dc(this, this.parent, true);
    proto.prev = dc(this, this.prev, true);
    proto.next = dc(this, this.next, true);
    proto.putAtBottom = dc(this, this.putAtBottom, true);
    proto.putAtTop = dc(this, this.putAtTop, true);
    proto.putAfter = dc(this, this.putAfter, true);
    proto.putBefore = dc(this, this.putBefore, true);
    proto.replace = dc(this, this.replace, true);
    proto.getPosition = dc(this, this.getPosition, true);
    proto.setPosition = dc(this, this.setPosition, true);
    proto.setX = dc(this, this.setX, true);
    proto.setY = dc(this, this.setY, true);
    proto.center = dc(this, this.center, true);
    proto.centerH = dc(this, this.centerH, true);
    proto.centerV = dc(this, this.centerV, true);
    proto.getLayout = dc(this, this.getLayout, true);
    proto.enable = dc(this, this.enable, true);
    proto.disable = dc(this, this.disable, true);
    proto.setEnabled = dc(this, this.setEnabled, true);
    proto.serialize = dc(this, this.serialize, true);
    
    this.injected = true;
  }
};
