artjs.Tree = artjs.component.Tree = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.$BA(this);
    
    this._leafClassToggler = new artjs.ClassToggler('selected');
    this.onLeaf = new artjs.Event('artjs.Tree::onLeaf');
    artjs.on('click', this.getElement(), this._onElement.delegate, 'li a');
  },
  {
    setData: function(data) {
      var content = artjs.$P(this._renderNode(data));
      
      artjs.ElementUtils.insert(this.getElement(), content);
      
      artjs.ArrayUtils.each(artjs.Selector.findAll(this.getElement(), 'li'), this._eachElement, this);
    },
    
    clickAt: function() {
      this._openingNode = this.getElement();
      
      artjs.ArrayUtils.each(artjs.$A(arguments), this._openAt, this);
    },
    
    getCurrent: function() {
      return this._current;
    },
    
    _openAt: function(i) {
      this._openingNode = artjs.ElementUtils.elementAt(artjs.Selector.find(this._openingNode, 'ul'), i);
      this._handleClick(artjs.ElementUtils.firstElement(this._openingNode));
    },
    
    _renderNode: function(node) {
      return artjs.$B('ul', null, artjs.ObjectUtils.map(node, this._mapNode, this).join('')).toString();
    },
    
    _mapNode: function(k, v) {
      var leaf = (typeof v == 'string');
      var href = leaf ? v : '#';
      var value = artjs.$B('a', {href: href}, k).toString() + (leaf ? '' : this._renderNode(v));
      
      return artjs.$B('li', null, value).toString();
    },
    
    _eachElement: function(i) {
      var a = artjs.ElementUtils.firstElement(i);
      
      if (this._isNode(a)) {
        artjs.ElementUtils.hide(artjs.$find(i, 'ul'));
      }
      else {
        artjs.ElementUtils.addClass(i, 'leaf');
      }
    },
    
    _onElement: function(e) {
      e.preventDefault();
      
      this._handleClick(e.target);
    },
    
    _handleClick: function(a) {
      this._current = a;
      
      if (this._isNode(this._current)) {
        this._toggleNode();
      }
      else {
        this._leafAction();
      }
    },
    
    _isNode: function(a) {
      var li = artjs.ElementUtils.parent(a);
      
      return artjs.ArrayUtils.isNotEmpty(artjs.Selector.findAll(li, 'ul'));
    },
    
    _toggleNode: function() {
      var ul = artjs.ElementUtils.next(this._current);
      
      artjs.ElementUtils.toggle(ul);
      artjs.ElementUtils.setClass(artjs.$parent(this._current), 'expanded', !artjs.ElementUtils.isHidden(ul));
    },
    
    _leafAction: function() {
      this._leafClassToggler.toggle(artjs.ElementUtils.parent(this._current));
      
      this.onLeaf.fire(this);
    }
  },
  null,
  artjs.Component
);
