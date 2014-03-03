ArtJs.Tree = com.arthwood.ui.Tree = ArtJs.Class(
  function(data) {
    this.data = data;
  },
  {
    render: function() {
      return ArtJs.$P(this._renderNode(this.data));
    },
    
    _renderNode: function(node) {
      return ArtJs.$B('ul', null, ArtJs.ObjectUtils.map(node, this._eachNode, this).join('')).toString();
    },
    
    _eachNode: function(k, v) {
      var leaf = (typeof v == 'string');
      var href = leaf ? v : '#';
      var value = ArtJs.$B('a', {href: href}, k).toString() + (leaf ? '' : this._renderNode(v));
      
      return ArtJs.$B('li', null, value).toString();
    }
  }
);
