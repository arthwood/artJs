artjs.Tree = artjs.component.Tree = artjs.Class(
  function(element, hash) {
    this.super(element);
    
    this._hash = Boolean(hash);
    this._leafClassToggler = new artjs.ClassToggler('selected');
    this.onNode = new artjs.Event('artjs.Tree::onNode');
    this.onLeaf = new artjs.Event('artjs.Tree::onLeaf');
    artjs.on('click', this._element, artjs.$D(this, '_onClick'), 'li a');
  },
  {
    clickAt: function(path) {
      this._openingNode = this.getElement();
      
      artjs.Array.each(path, this._openAt, this);
    },
      
    getCurrent: function() {
      return this._current;
    },
    
    getData: function() {
      return this._data;
    },
    
    setData: function(data) {
      this._data = data;
      
      var content = artjs.$P(this._renderNode(data));
      
      artjs.Element.insert(this.getElement(), content);
      
      artjs.Array.each(artjs.Selector.findAll(this.getElement(), 'li'), this._eachElement, this);
    },
    
    _openAt: function(i) {
      this._openingNode = artjs.Element.elementAt(artjs.Selector.find(this._openingNode, 'ul'), i);
      this._onElement(artjs.Element.firstElement(this._openingNode));
    },
    
    _renderNode: function(node) {
      return artjs.$B('ul', null, artjs.Object.map(node, this._mapNode, this).join('')).toString();
    },
    
    _mapNode: function(k, v) {
      var leaf = artjs.Object.isString(v);
      var href = leaf ? (this._hash ? '#/' + v : v) : '#';
      var value = artjs.$B('a', {href: href}, k).toString() + (leaf ? '' : this._renderNode(v));
      
      return artjs.$B('li', null, value).toString();
    },
    
    _eachElement: function(i) {
      var a = artjs.Element.firstElement(i);
      
      if (this._isNode(a)) {
        artjs.Element.hide(artjs.$find(i, 'ul'));
      }
      else {
        artjs.Element.addClass(i, 'leaf');
      }
    },
    
    _onClick: function(e) {
      this._onElement(e.target, e);
    },
    
    _onElement: function(a, e) {
      this._current = a;
      
      if (this._isNode(this._current)) {
        this._onNode(e);
      }
      else {
        this._onLeaf(e);
      }
    },
    
    _isNode: function(a) {
      var li = artjs.Element.parent(a);
      
      return artjs.Array.isNotEmpty(artjs.Selector.findAll(li, 'ul'));
    },
    
    _onNode: function(e) {
      if (e) {
        e.preventDefault();
      }
      
      var ul = artjs.Element.next(this._current);
      
      artjs.Element.toggle(ul);
      artjs.Element.setClass(artjs.$parent(this._current), 'expanded', !artjs.Element.isHidden(ul));
      
      this.onNode.fire(this, e);
    },
    
    _onLeaf: function(e) {
      this._leafClassToggler.toggle(artjs.Element.parent(this._current));
      
      this.onLeaf.fire(this, e);
    }
  },
  {
    _name: 'artjs.Tree'
  },
  artjs.Component
);
