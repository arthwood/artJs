artjs.Tree = artjs.component.Tree = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.$BA(this);
    
    this._leafClassToggler = new artjs.ClassToggler('selected');
    this.onLeaf = new artjs.CustomEvent('artjs.Tree::onLeaf');
  },
  {
    setData: function(data) {
      var content = artjs.$P(this._renderNode(data));
      
      artjs.ElementUtils.insert(this.element, content);
      
      var point = artjs.ArrayUtils.partition(artjs.Selector.find(this.element, 'li'), function(item, idx) {
        return artjs.ArrayUtils.isNotEmpty(artjs.Selector.find(item, 'ul'));
      });
      
      this._nodes = point.x;
      this._leaves = point.y;
      
      artjs.ArrayUtils.each(this._nodes, this._eachNode, this);
      artjs.ArrayUtils.each(this._leaves, this._eachLeaf, this);
    },
    
    open: function() {
      this._toggleNode(artjs.ElementUtils.firstElement(artjs.ArrayUtils.first(this._nodes)));
      this._leafAction(artjs.ElementUtils.firstElement(artjs.ArrayUtils.first(this._leaves)));
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
    
    _eachNode: function(i) {
      artjs.on('click', artjs.ElementUtils.firstElement(i), this._onNode.delegate);
      artjs.ElementUtils.hide(artjs.$first(i, 'ul'));
    },
    
    _onNode: function(originalEvent, elementEvent) {
      originalEvent.preventDefault();
      
      this._toggleNode(elementEvent.element);
    },
    
    _toggleNode: function(a) {
      var ul = artjs.ElementUtils.next(a);
      
      artjs.ElementUtils.toggle(ul);
      artjs.ElementUtils.setClass(artjs.$parent(a), 'expanded', !artjs.ElementUtils.isHidden(ul));
    },
    
    _eachLeaf: function(i) {
      artjs.on('click', artjs.ElementUtils.firstElement(i), this._onLeaf.delegate);
      artjs.ElementUtils.addClass(i, 'leaf');
    },
    
    _onLeaf: function(originalEvent, elementEvent) {
      originalEvent.preventDefault();
      
      this._leafAction(elementEvent.element);
    },
    
    _leafAction: function(element) {
      this._leafClassToggler.toggle(element);
      
      this.onLeaf.fire(this);
    },
    
    getCurrent: function() {
      return this._leafClassToggler.getCurrent();
    }
  },
  null,
  artjs.Component
);