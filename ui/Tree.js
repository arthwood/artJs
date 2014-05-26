artjs.Tree = artjs.ui.Tree = artjs.Class(
  function(data, element) {
    this.data = data;
    
    this._onNodeDelegate = artjs.$D(this, this._onNode);
    this._onLeafDelegate = artjs.$D(this, this._onLeaf);
    this._leafClassToggler = new artjs.ClassToggler('selected');
    
    this.onLeaf = new artjs.CustomEvent('onLeaf');

    artjs.ElementUtils.insert(element, this.render());
    
    var point = artjs.ArrayUtils.partition(artjs.Selector.find(element, 'li'), function(item, idx) {
      return artjs.ArrayUtils.isNotEmpty(artjs.Selector.find(item, 'ul'));
    });
    
    this._nodes = point.x;
    this._leaves = point.y;
    
    artjs.ArrayUtils.each(this._nodes, artjs.$DC(this, this._eachNode));
    artjs.ArrayUtils.each(this._leaves, artjs.$DC(this, this._eachLeaf));
  },
  {
    render: function() {
      return artjs.$P(this._renderNode(this.data));
    },
    
    open: function() {
      this._expandNode(artjs.ElementUtils.firstElement(artjs.ArrayUtils.first(this._nodes)));
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
      artjs.ElementUtils.onClick(artjs.ElementUtils.firstElement(i), this._onNodeDelegate);
      artjs.ElementUtils.hide(artjs.ArrayUtils.first(artjs.Selector.find(i, 'ul')));

      i.style.listStyleImage = this.ctor.FOLDED;
    },
    
    _onNode: function(originalEvent, elementEvent) {
      originalEvent.preventDefault();
      
      this._expandNode(elementEvent.element);
    },
    
    _expandNode: function(a) {
      var ul = artjs.ElementUtils.next(a);
      
      artjs.ElementUtils.toggle(ul);
      artjs.Selector.parent(a).style.listStyleImage = artjs.ElementUtils.isHidden(ul) ? this.ctor.FOLDED : this.ctor.UNFOLDED;
    },
    
    _eachLeaf: function(i) {
      artjs.ElementUtils.onClick(artjs.ElementUtils.firstElement(i), this._onLeafDelegate);
      i.style.listStyleImage = this.ctor.LEAF;
    },
    
    _onLeaf: function(originalEvent, elementEvent) {
      originalEvent.preventDefault();
      
      this._leafAction(elementEvent.element);
    },
    
    _leafAction: function(element) {
      this._leafClassToggler.toggle(element);
      
      this.onLeaf.fire(element);
    }
  },
  {
    FOLDED: 'url(../images/plus.png)',
    UNFOLDED: 'url(../images/minus.png)',
    LEAF: 'url(../images/leaf.png)'
  }
);
