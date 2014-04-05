ArtJs.Tree = com.arthwood.ui.Tree = ArtJs.Class(
  function(data, element) {
    this.data = data;
    
    this._onNodeDelegate = ArtJs.$D(this, this._onNode);
    this._onLeafDelegate = ArtJs.$D(this, this._onLeaf);
    this._leafClassToggler = new ArtJs.ClassToggler('selected');
    
    this.onLeaf = new ArtJs.CustomEvent('onLeaf');

    ArtJs.ElementUtils.insert(element, this.render());
    
    var point = ArtJs.ArrayUtils.partition(ArtJs.Selector.find(element, 'li'), function(item, idx) {
      return ArtJs.ArrayUtils.isNotEmpty(ArtJs.Selector.find(item, 'ul'));
    });
    
    var nodes = point.x;
    var leaves = point.y;
    
    ArtJs.ArrayUtils.each(nodes, ArtJs.$DC(this, this._eachNode));
    ArtJs.ArrayUtils.each(leaves, ArtJs.$DC(this, this._eachLeaf));
  },
  {
    render: function() {
      return ArtJs.$P(this._renderNode(this.data));
    },
    
    _renderNode: function(node) {
      return ArtJs.$B('ul', null, ArtJs.ObjectUtils.map(node, this._mapNode, this).join('')).toString();
    },
    
    _mapNode: function(k, v) {
      var leaf = (typeof v == 'string');
      var href = leaf ? v : '#';
      var value = ArtJs.$B('a', {href: href}, k).toString() + (leaf ? '' : this._renderNode(v));
      
      return ArtJs.$B('li', null, value).toString();
    },
    
    _eachNode: function(i) {
      ArtJs.ElementUtils.onClick(ArtJs.ElementUtils.firstElement(i), this._onNodeDelegate);
      ArtJs.ElementUtils.hide(ArtJs.ArrayUtils.first(ArtJs.Selector.find(i, 'ul')));

      i.style.listStyleImage = this.ctor.FOLDED;
    },
    
    _onNode: function(originalEvent, elementEvent) {
      originalEvent.preventDefault();
      
      this._expandNode(elementEvent.element);
    },
    
    _expandNode: function(a) {
      var ul = ArtJs.ElementUtils.next(a);
      
      ArtJs.ElementUtils.toggle(ul);
      ArtJs.Selector.parent(a).style.listStyleImage = ArtJs.ElementUtils.isHidden(ul) ? this.ctor.FOLDED : this.ctor.UNFOLDED;
    },
    
    _eachLeaf: function(i) {
      ArtJs.ElementUtils.onClick(ArtJs.ElementUtils.firstElement(i), this._onLeafDelegate);
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
