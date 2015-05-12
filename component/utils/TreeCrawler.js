artjs.component.utils.TreeCrawler = artjs.TreeCrawler = {
  find: function(tree, value) {
    var result = [];
    
    this._valueToFind = value;
    this._findResult = result;
    this._findPath = [];
    
    this._traverse(tree.getData());
    
    return result;
  },
  
  _traverse: function(obj) {
    artjs.Array.each(artjs.Object.values(obj), this._each, this);
  },
  
  _each: function(v, idx) {
    this._findPath.push(idx);
    
    if (artjs.Object.isObject(v)) {
      this._traverse(v);
    }
    else if (v == this._valueToFind) {
      this._findResult.push(artjs.Array.clone(this._findPath));
    }
    
    this._findPath.pop();
  }
};
