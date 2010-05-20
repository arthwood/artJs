ArtJs.ElementUtils = com.arthwood.net.ElementUtils = {
  HIDDEN_ELEMENTS: [],
  DEFAULT_DISPLAY: '',
  MAIN_OBJ_RE: /^\w+/,
  SUB_OBJ_RE: /\[\w+\]/g,
  
  init: function() {
    this.getContentDC = ArtJs.$DC(this, this.getContent);
    this.detectHiddenElementDC = ArtJs.$DC(this, this.detectHiddenElement);
    this.isElementDC = ArtJs.$DC(this, this.isElement);
    this.serializeInjectDC = ArtJs.$DC(this, this.serializeInject);
    this.mapSubDC = ArtJs.$DC(this, this.mapSub);
    this.selectCheckedDC = ArtJs.$DC(this, this.selectChecked);
    this.mapAttributeDC = ArtJs.$DC(this, this.mapAttribute);
    this.showDC = ArtJs.$DC(this, this.show);
    this.hideDC = ArtJs.$DC(this, this.hide);
    this.isHiddenDC = ArtJs.$DC(this, this.isHidden);
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
  
  getSize: function(e, withoutScroll) {
    return this.getLayout(e, withoutScroll).getSize(); 
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
  
  firstElement: function(e) {
    return ArtJs.ArrayUtils.first(this.elements(e));
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
  
  clone: function(e, deep) {
    return e.cloneNode(deep);
  },
  
  putAtBottom: function(e, ref) {
    return ref.appendChild(this.clone(e, true));
  },
    
  putAtTop: function(e, ref) {
    var first = ArtJs.ArrayUtils.first(this.children(ref));
    
    return first ? this.putBefore(e, first) : this.putAtBottom(e, ref);
  },
  
  putAfter: function(e, ref) {
    var next = this.next(ref);
    
    return next ? this.putBefore(e, next) : this.putAtBottom(e, this.parent(ref));
  },
  
  putBefore: function(e, ref) {
    return this.parent(ref).insertBefore(e, ref);
  },
  
  replace: function(e, ref, clone) {
    var parent = this.parent(ref);
    var idx = this.elements(parent).indexOf(ref);
    
    clone && (e = this.clone(e, true));
    
    parent.replaceChild(e, ref);
    
    return this.elements(parent)[idx];
  },
  
  center: function(e) {
    this.setPosition(e, this.getCenteredPosition(e));
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
    return this.getWindowSize().sub(this.getSize(e)).times(0.5).add(this.getScrollPosition());
  },
  
  getDocumentSize: function() {
    var doc = window.document;
    
    return new ArtJs.Point(doc.width, doc.height);
  },
  
  getWindowSize: function() {
    return new ArtJs.Point(window.innerWidth, window.innerHeight);
  },
  
  setPosition: function(e, p) {
    this.setX(e, p.x);
    this.setY(e, p.y);
  },
  
  getPosition: function(e, withoutScroll) {
    return this.getLayout(e, withoutScroll).getLeftTop();
  },
  
  getScrollPosition: function() {
    return new ArtJs.Point(window.scrollX, window.scrollY);
  },
  
  setX: function(e, v) {
    e.style.left = v + 'px';
  },
  
  setY: function(e, v) {
    e.style.top = v + 'px';
  },
  
  getLayout: function(e, withoutScroll) {
    var hidden = this.isHidden(e);
    
    if (hidden) {
      this.show(e);
    }
    
    var b = e.getBoundingClientRect();
    var layout = new ArtJs.Rectangle(b.left, b.top, b.right, b.bottom);
    
    if (!withoutScroll) {
      layout.moveBy(new ArtJs.Point(scrollX, scrollY));
    }
    
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
    var s = ArtJs.Selector;
    var au = ArtJs.ArrayUtils;
    var textfields = s.down(e, 'input[type=text]')
    var checkboxes = au.select(s.down(e, 'input[type=checkbox]'), this.selectCheckedDC);
    var radios = au.select(s.down(e, 'input[type=radio]'), this.selectCheckedDC);
    var selects = s.down(e, 'select');
    var textareas = s.down(e, 'textarea');
    var hiddenfields = s.down(e, 'input[type=hidden]');
    var inputs = au.flatten([textfields, checkboxes, radios, selects, textareas, hiddenfields]);
    var result = au.inject(inputs, {}, this.serializeInjectDC);
    
    return result;
  },
  
  selectChecked: function(i) {
    return i.checked;
  },
  
  serializeInject: function(mem, i, idx) {
    var name = i.name;
    var value = i.value;
    var main = ArtJs.ArrayUtils.first(name.match(this.MAIN_OBJ_RE));
    var subobjectMatches = name.match(this.SUB_OBJ_RE);
    var props = subobjectMatches && subobjectMatches.map(this.mapSubDC) || [];
    
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
  
  getContent: function(e) {
    return e.innerHTML;
  },
  
  setContent: function(e, v) {
    e.innerHTML = v;
  },
  
  hasClass: function(e, className) {
    return ArtJs.ArrayUtils.include(this.getClasses(e), className);
  },
  
  getClasses: function(e) {
    return e.className.split(' ');
  },
  
  setClass: function(e, className, add) {
    add ? this.addClass(e, className) : this.removeClass(e, className);
  },
  
  addClass: function(e, className) {
    var classes = this.getClasses(e);
    
    if (!this.hasClass(e, className)) {
      classes.push(className);
      e.className = classes.join(' ');
    }
  },
  
  removeClass: function(e, className) {
    var classes = this.getClasses(e);
    
    if (this.hasClass(e, className)) {
      ArtJs.ArrayUtils.removeItem(classes, className);
      e.className = classes.join(' ');
    }
  },
  
  toggleClass: function(e, className) {
    this.hasClass(e, className) ? this.removeClass(e, className) : this.addClass(e, className);
  },

  getAttributes: function(e) {
    return ArtJs.ObjectUtils.fromArray(ArtJs.ArrayUtils.map(e.attributes, this.mapAttributeDC));
  },
  
  mapAttribute: function(i) {
    return [i.name, i.value];
  },
  
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    var insert = this.insert;
    
    proto.getContent = dc(this, this.getContent, true);
    proto.setContent = dc(this, this.setContent, true);
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
    proto.firstElement = dc(this, this.firstElement, true);
    proto.prev = dc(this, this.prev, true);
    proto.next = dc(this, this.next, true);
    proto.clone = dc(this, this.clone, true);
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
    proto.hasClass = dc(this, this.hasClass, true);
    proto.getClasses = dc(this, this.getClasses, true);
    proto.addClass = dc(this, this.addClass, true);
    proto.removeClass = dc(this, this.removeClass, true);
    proto.toggleClass = dc(this, this.toggleClass, true);
    proto.setClass = dc(this, this.setClass, true);
    proto.getAttributes = dc(this, this.getAttributes, true);
  }
};
