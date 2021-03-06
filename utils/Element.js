artjs.Element = artjs.utils.Element = {
  HIDDEN_ELEMENTS: [],
  DEFAULT_DISPLAY: '',
  MAIN_OBJ_RE: /^\w+/,
  SUB_OBJ_RE: /\[\w+\]/g,
  SIZE_STYLE_RE: /^(\d+)px$/,
  BROWSERS_STYLES: ['', '-o-', '-ms-', '-moz-', '-khtml-', '-webkit-'],
  
  _name: 'Element',
  
  toString: function() {
    return this._name; 
  },
  
  show: function(e) {
    var hidden = this._getHidden(e);
    
    artjs.Array.removeItem(this.HIDDEN_ELEMENTS, hidden);
    
    var display = hidden && hidden.display || e.style.display;
    
    e.style.display = (display == 'none') ? this.DEFAULT_DISPLAY : display;
  },
  
  hide: function(e) {
    var hidden = this._getHidden(e);
    
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
    var hidden = this._getHidden(e);
    
    return hidden || e.style.display == 'none';
  },
  
  _getHidden: function(e) {
    var delegate = artjs.$D(this, '_detectHiddenElement', e);
    
    return artjs.Array.detect(this.HIDDEN_ELEMENTS, delegate.callback(), this);
  },
  
  _detectHiddenElement: function(i, idx, arr, e) {
    return i.element == e;
  },
  
  getSize: function(e, real) {
    return this.getBounds(e, real).getSize(); 
  },
  
  getBounds: function(e, real, withoutScroll) {
    var toggle = real && this.isHidden(e);
    
    if (toggle) { this.show(e); }
    
    var b = e.getBoundingClientRect();
    var layout = new artjs.Rectangle(b.left, b.top, b.right, b.bottom);
    
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
    artjs.Object.extend(e.style, style);
  },
  
  transitionStyle: function(prop, duration, type, delay) {
    return this._effectStyle(this._getTransitionStyleValue(prop, duration, type, delay));  
  },

  getSizeStyle: function(e, prop) {
    return this.getSizeStyleValue(this.getStyle(e, prop));
  },
  
  getSizeStyleValue: function(value) {
    var v = value.match(this.SIZE_STYLE_RE);
    
    return v && Number(v[1]) || 0;
  },

  children: function(e) {
    return artjs.$A(e.childNodes);
  },
  
  elements: function(e) {
    return this.filterElements(this.children(e));
  },
  
  elementAt: function(e, i) {
    return artjs.Array.getItemAt(this.elements(e), i);
  },
  
  filterElements: function(items) {
    return artjs.Array.select(items, this.isElement, this);
  },
  
  isElement: function(e) {
    return e.nodeType == Node.ELEMENT_NODE;
  },

  isText: function(e) {
    return e.nodeType == Node.TEXT_NODE;
  },
  
  remove: function(e) {
    return e.parentNode.removeChild(e);
  },
  
  removeAt: function(e, idx) {
    return this.remove(this.elementAt(e, idx));
  },
  
  parent: function(e) {
    return e.parentNode;
  },
  
  firstElement: function(e) {
    return artjs.Array.first(this.elements(e));
  },
  
  lastElement: function(e) {
    return artjs.Array.last(this.elements(e));
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

  insert: function(ref, e) {
    return this.putAtBottom(e, ref);
  },
  
  putAtBottom: function(e, ref) {
    var result = this.clone(e, true);
    
    ref.appendChild(result);
    
    return result;
  },
    
  putAtTop: function(e, ref) {
    var first = artjs.Array.first(this.children(ref));
    
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
    var s = artjs.Selector;
    var au = artjs.Array;
    var textfields = s.findAll(e, 'input[type=text]');
    var checkboxes = au.select(s.findAll(e, 'input[type=checkbox]'), this.selectChecked, this);
    var radios = au.select(s.findAll(e, 'input[type=radio]'), this.selectChecked, this);
    var selects = s.findAll(e, 'select');
    var textareas = s.findAll(e, 'textarea');
    var hiddenfields = s.findAll(e, 'input[type=hidden]');
    var inputs = au.flatten([textfields, checkboxes, radios, selects, textareas, hiddenfields]);
    
    return au.inject(inputs, {}, this.serializeInject, this);
  },
  
  selectChecked: function(i) {
    return i.checked;
  },
  
  serializeInject: function(mem, i, idx) {
    var name = i.name;
    var value = i.value;
    var main = artjs.Array.first(name.match(this.MAIN_OBJ_RE));
    var subobjectMatches = name.match(this.SUB_OBJ_RE);
    var props = subobjectMatches && artjs.Array.map(artjs.$A(subobjectMatches), this.mapSub, this) || [];
    
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
    return artjs.String.sub(i, 1, -1);
  },
  
  getContent: function(e) {
    return e.innerHTML;
  },
  
  setContent: function(e, v) {
    e.innerHTML = v;
  },
  
  clear: function(e) {
    this.setContent(e, '');
  },
  
  hasClass: function(e, className) {
    return artjs.Array.includes(this.getClasses(e), className);
  },
  
  getClasses: function(e) {
    var className = artjs.String.trim(e.className);
    
    return artjs.String.isBlank(className) ? [] : className.split(' ');
  },
  
  setClass: function(e, className, add) {
    if (add) {
      this.addClass(e, className);
    }
    else {
      this.removeClass(e, className);
    }
  },
  
  setClasses: function(e, classes) {
    this._setClassPair.element = e;
    
    artjs.Object.each(classes, this._setClassPair, this);
  },
  
  _setClassPair: function(className, add) {
    this.setClass(arguments.callee.element, className, add);
  },
  
  addClasses: function(e, classes) {
    this._addClass.element = e;
    
    artjs.Array.each(classes, this._addClass, this);
  },
  
  _addClass: function(className) {
    this.addClass(arguments.callee.element, className);
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
      artjs.Array.removeItem(classes, className);
      e.className = classes.join(' ');
    }
  },
  
  toggleClass: function(e, className) {
    this.setClass(e, className, !this.hasClass(e, className));
  },
  
  getAttributes: function(e) {
    return artjs.Object.fromArray(artjs.Array.map(artjs.$A(e.attributes), this._mapAttribute, this));
  },
  
  getData: function(e) {
    var attrs = this.getAttributes(e);
    var data = artjs.Object.select(attrs, this._isDataAttribute, this);
    
    return artjs.Object.mapKey(data, this._removeDataPrefix, this);
  },
  
  getDataValue: function(e, name) {
    return this.getData(e)[name];
  },
  
  _isDataAttribute: function(v, k) {
    return artjs.String.startsWith(k, 'data-');
  },
  
  _removeDataPrefix: function(k) {
    return k.replace(/^data\-/, '');
  },
  
  _mapAttribute: function(i) {
    return [i.name, i.value];
  },

  setAlpha: function(e, v) {
    e.style.opacity = v;
    e.style.filter = 'alpha(opacity=' + 100 * v + ')';
  },

  getAlpha: function(e) {
    if (e.style.filter) {
      var re = /alpha\(opacity=(\d+(\.\d+)?)\)/;

      return Number(artjs.Array.second(e.style.filter.match(re)));
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
    return new artjs.Rectangle(
      this.getSizeStyle(e, 'padding-left') || this.getSizeStyle(e, 'paddingLeft'),
      this.getSizeStyle(e, 'padding-top') || this.getSizeStyle(e, 'paddingTop'),
      this.getSizeStyle(e, 'padding-right') || this.getSizeStyle(e, 'paddingRight'),
      this.getSizeStyle(e, 'padding-bottom') || this.getSizeStyle(e, 'paddingBottom')
    );
  },

  getDocumentSize: function() {
    var doc = window.document;
    var body = doc.body;

    return new artjs.Point(body.clientWidth || doc.width, body.clientHeight || doc.height);
  },

  getWindowSize: function() {
    var de = document.documentElement;

    return new artjs.Point(de.clientWidth || window.innerWidth, de.clientHeight || window.innerHeight);
  },

  getScrollPosition: function() {
    var de = document.documentElement;
    
    return new artjs.Point(de.scrollLeft || window.scrollX, de.scrollTop || window.scrollY);
  },

  onClick: function(e, delegate) {
    return artjs.on('click', e, delegate);
  },
  
  render: function(e) {
    var classes = this.getClasses(e);
    var attr = this.getAttributes(e);
    
    delete attr['id'];
    delete attr['class'];
    
    return this.toTagString(e)
      + this.toIdString(e) 
      + artjs.Array.map(classes, this.toClassString).join('') 
      + artjs.Object.map(attr, this.toAttrString).join('');
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
  
  _getTransitionStyleValue: function(prop, duration, type, delay) {
    return [prop, duration + 's', type, delay + 's'].join(' ');
  },
  
  _effectStyle: function(value) {
    this._browserMap.value = value;

    return artjs.Object.fromArray(artjs.Array.map(this.BROWSERS_STYLES, this._browserMap, this));
  },

  _browserMap: function(browser) {
    return [browser + 'transition', arguments.callee.value];
  }
};
