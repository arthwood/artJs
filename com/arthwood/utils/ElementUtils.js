ArtJs.ElementUtils = com.arthwood.utils.Element = {
  HIDDEN_ELEMENTS: [],
  DEFAULT_DISPLAY: '',
  MAIN_OBJ_RE: /^\w+/,
  SUB_OBJ_RE: /\[\w+\]/g,
  SIZE_STYLE_RE: /^(\d+)px$/,
  BROWSERS_STYLES: ['', '-o-', '-ms-', '-moz-', '-khtml-', '-webkit-'],
  
  _init: function() {
    this.detectHiddenElementDC = ArtJs.$DC(this, this.detectHiddenElement);
    ArtJs.$insert = ArtJs.$DC(this, this.insert);
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
    if (v) { 
      this.show(e);
    } else {
      this.hide(e);
    }
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
  
  getSize: function(e, real) {
    return this.getBounds(e, real).getSize(); 
  },
  
  getBounds: function(e, real, withoutScroll) {
    var toggle = real && this.isHidden(e);
    
    if (toggle) { this.show(e); }
    
    var b = e.getBoundingClientRect();
    var layout = new ArtJs.Rectangle(b.left, b.top, b.right, b.bottom);
    
    if (!withoutScroll) { layout.moveBy(this.getScrollPosition()); }
    
    if (toggle) { this.hide(e); }
    
    return layout;
  },
  
  setWidth: function(e, w) {
    e.style.width = w + 'px';
  },
  
  setHeight: function(e, h) {
    e.style.height = h + 'px';
  },
  
  setStyle: function(e, prop, v) {
    e.style[prop] = v;
  },

  extendStyle: function(e, style) {
    ArtJs.ObjectUtils.extend(e.style, style);
  },

  transitionStyle: function(prop, duration, type, delay) {
    return this._effectStyle(new ArtJs.Point('transition', this._getTransitionStyleValue(prop, duration, type, delay)));  
  },

  _getTransitionStyleValue: function(prop, duration, type, delay) {
    return [prop, duration + 's', type, delay + 's'].join(' ');
  },
  
  _effectStyle: function(data) {
    this._browserMap.data = data;

    return ArtJs.ObjectUtils.fromArray(ArtJs.ArrayUtils.map(this.BROWSERS_STYLES, this._browserMap, this));
  },

  _browserMap: function(browser) {
    var data = arguments.callee.data;

    return [browser + data.x, data.y];
  },
  
  getSizeStyle: function(e, prop) {
    return this.getSizeStyleValue(this.getStyle(e, prop));
  },
  
  getSizeStyleValue: function(value) {
    var v = value.match(this.SIZE_STYLE_RE);
    
    return v && Number(v[1]) || 0;
  },

  children: function(e) {
    return ArtJs.$A(e.childNodes);
  },
  
  elements: function(e) {
    return this.filterElements(this.children(e));
  },
  
  filterElements: function(items) {
    return ArtJs.ArrayUtils.select(items, this.isElement, this);
  },
  
  isElement: function(e) {
    return e.nodeType == Node.ELEMENT_NODE;
  },

  isText: function(e) {
    return e.nodeType == Node.TEXT_NODE;
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
  
  lastElement: function(e) {
    return ArtJs.ArrayUtils.last(this.elements(e));
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

  insert: function(e, el) {
    return this.putAtBottom(el, e);
  },
  
  putAtBottom: function(e, ref) {
    var result = this.clone(e, true);
    
    ref.appendChild(result);
    
    return result;
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
    
    if (clone) { e = this.clone(e, true); }
    
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
  
  setPosition: function(e, p) {
    this.setX(e, p.x);
    this.setY(e, p.y);
  },
  
  getPosition: function(e, withoutScroll) {
    return this.getBounds(e, false, withoutScroll).getLeftTop();
  },
  
  setX: function(e, v) {
    e.style.left = v + 'px';
  },
  
  setY: function(e, v) {
    e.style.top = v + 'px';
  },
  
  enable: function(e) {
    e.removeAttribute('disabled'); 
  },
  
  disable: function(e) {
    e.setAttribute('disabled', 'disabled'); 
  },
  
  setEnabled: function(e, enabled) {
    if (enabled) {
      this.enable(e);
    } else {
      this.disable(e);
    }
  },
  
  serialize: function(e) {
    var s = ArtJs.Selector;
    var au = ArtJs.ArrayUtils;
    var textfields = s.find(e, 'input[type=text]');
    var checkboxes = au.select(s.find(e, 'input[type=checkbox]'), this.selectChecked, this);
    var radios = au.select(s.down(e, 'input[type=radio]'), this.selectChecked, this);
    var selects = s.down(e, 'select');
    var textareas = s.down(e, 'textarea');
    var hiddenfields = s.down(e, 'input[type=hidden]');
    var inputs = au.flatten([textfields, checkboxes, radios, selects, textareas, hiddenfields]);
    
    return au.inject(inputs, {}, this.serializeInject, this);
  },
  
  selectChecked: function(i) {
    return i.checked;
  },
  
  serializeInject: function(mem, i, idx) {
    var name = i.name;
    var value = i.value;
    var main = ArtJs.ArrayUtils.first(name.match(this.MAIN_OBJ_RE));
    var subobjectMatches = name.match(this.SUB_OBJ_RE);
    var props = subobjectMatches && ArtJs.ArrayUtils.map(ArtJs.$A(subobjectMatches), this.mapSub, this) || [];
    
    props.unshift(main);
    
    var obj = mem;
    var n = props.length - 1;
    var k, prop;
    
    for (k = 0; k < n; k++) {
      prop = props[k];
      if (!(obj[prop] instanceof Object)) { obj[prop] = {}; }
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
    return ArtJs.ArrayUtils.includes(this.getClasses(e), className);
  },
  
  getClasses: function(e) {
    var className = ArtJs.StringUtils.trim(e.className);
    
    return ArtJs.StringUtils.isBlank(className) ? [] : className.split(' ');
  },
  
  setClass: function(e, className, add) {
    if (add) {
      this.addClass(e, className);
    }
    else {
      this.removeClass(e, className);
    }
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
    this.setClass(e, className, !this.hasClass(e, className));
  },
  
  getAttributes: function(e) {
    return ArtJs.ObjectUtils.fromArray(ArtJs.ArrayUtils.map(ArtJs.$A(e.attributes), this.mapAttribute, this));
  },
  
  mapAttribute: function(i) {
    return [i.name, i.value];
  },

  setAlpha: function(e, v) {
    e.style.opacity = v;
    e.style.filter = 'alpha(opacity=' + 100 * v + ')';
  },

  getAlpha: function(e) {
    if (e.style.filter) {
      var re = /alpha\(opacity=(\d+(\.\d+)?)\)/;

      return Number(ArtJs.ArrayUtils.second(e.style.filter.match(re)));
    }
    else {
      return e.style.opacity;
    }
  },

  getStyle: function(e, prop) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(e, null).getPropertyValue(prop);
    }
    else {
      return e.currentStyle[prop];
    }
  },

  getPadding: function(e) {
    return new ArtJs.Rectangle(
      this.getSizeStyle(e, 'padding-left') || this.getSizeStyle(e, 'paddingLeft'),
      this.getSizeStyle(e, 'padding-top') || this.getSizeStyle(e, 'paddingTop'),
      this.getSizeStyle(e, 'padding-right') || this.getSizeStyle(e, 'paddingRight'),
      this.getSizeStyle(e, 'padding-bottom') || this.getSizeStyle(e, 'paddingBottom')
    );
  },

  getDocumentSize: function() {
    var doc = window.document;
    var body = doc.body;

    return new ArtJs.Point(body.clientWidth || doc.width, body.clientHeight || doc.height);
  },

  getWindowSize: function() {
    var de = document.documentElement;

    return new ArtJs.Point(de.clientWidth || window.innerWidth, de.clientHeight || window.innerHeight);
  },

  getScrollPosition: function() {
    var de = document.documentElement;
    
    return new ArtJs.Point(de.scrollLeft || window.scrollX, de.scrollTop || window.scrollY);
  },

  onClick: function(e, delegate) {
    return ArtJs.on(e, 'click', delegate);
  },
  
  toString: function(e) {
    var classes = this.getClasses(e);
    var attr = this.getAttributes(e);
    
    delete attr['id'];
    delete attr['class'];
    
    return this.toTagString(e)
      + this.toIdString(e) 
      + ArtJs.ArrayUtils.map(classes, this.toClassString).join('') 
      + ArtJs.ObjectUtils.map(attr, this.toAttrString).join('');
  },
  
  toTagString: function(e) {
    return e.tagName.toLowerCase();
  },
  
  toIdString: function(e) {
    return '#' + e.id;
  },
  
  toClassString: function(v) {
    return '.' + v;
  },
  
  toAttrString: function(k, v) {
    return '[' + k + '=' + v + ']';
  },
  
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;

    proto.addClass = dc(this, this.addClass, true);
    proto.center = dc(this, this.center, true);
    proto.centerH = dc(this, this.centerH, true);
    proto.centerV = dc(this, this.centerV, true);
    proto.clone = dc(this, this.clone, true);
    proto.disable = dc(this, this.disable, true);
    proto.elements = dc(this, this.elements, true);
    proto.enable = dc(this, this.enable, true);
    proto.extendStyle = dc(this, this.extendStyle, true);
    proto.firstElement = dc(this, this.firstElement, true);
    proto.getAlpha = dc(this, this.getAlpha, true);
    proto.getAttributes = dc(this, this.getAttributes, true);
    proto.getBounds = dc(this, this.getBounds, true);
    proto.getClasses = dc(this, this.getClasses, true);
    proto.getContent = dc(this, this.getContent, true);
    proto.getPadding = dc(this, this.getPadding, true);
    proto.getPosition = dc(this, this.getPosition, true);
    proto.getSize = dc(this, this.getSize, true);
    proto.getStyle = dc(this, this.getStyle, true);
    proto.hasClass = dc(this, this.hasClass, true);
    proto.hide = dc(this, this.hide, true);
    proto.insert = dc(this, this.insert, true);
    proto.isElement = dc(this, this.isElement, true);
    proto.isHidden = dc(this, this.isHidden, true);
    proto.lastElement = dc(this, this.lastElement, true);
    proto.next = dc(this, this.next, true);
    proto.onClick = dc(this, this.onClick, true);
    proto.parent = dc(this, this.parent, true);
    proto.prev = dc(this, this.prev, true);
    proto.putAtBottom = dc(this, this.putAtBottom, true);
    proto.putAtTop = dc(this, this.putAtTop, true);
    proto.putAfter = dc(this, this.putAfter, true);
    proto.putBefore = dc(this, this.putBefore, true);
    proto.remove = dc(this, this.remove, true);
    proto.removeClass = dc(this, this.removeClass, true);
    proto.removeStyle = dc(this, this.removeStyle, true);
    proto.replace = dc(this, this.replace, true);
    proto.show = dc(this, this.show, true);
    proto.serialize = dc(this, this.serialize, true);
    proto.setAlpha = dc(this, this.setAlpha, true);
    proto.setClass = dc(this, this.setClass, true);
    proto.setContent = dc(this, this.setContent, true);
    proto.setEnabled = dc(this, this.setEnabled, true);
    proto.setHeight = dc(this, this.setHeight, true);
    proto.setPosition = dc(this, this.setPosition, true);
    proto.setStyle = dc(this, this.setStyle, true);
    proto.setVisible = dc(this, this.setVisible, true);
    proto.setWidth = dc(this, this.setWidth, true);
    proto.setX = dc(this, this.setX, true);
    proto.setY = dc(this, this.setY, true);
    proto.toggle = dc(this, this.toggle, true);
    proto.toggleClass = dc(this, this.toggleClass, true);
  }
};
