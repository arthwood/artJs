artjs.utils.TreeCrawler = artjs.TreeCrawler = {
  find: function(data, value) {
    var result = [];
    
    this._value = value;
    this._result = result;
    this._path = [];
    
    this._traverse(data);
    
    return result;
  },
  
  _each: function(v, idx) {
    this._path.push(idx);
    
    if (artjs.Object.isObject(v)) {
      this._traverse(v);
    }
    else if (v == this._value) {
      this._result.push(artjs.Array.clone(this._path));
    }
    
    this._path.pop();
  },
  
  _traverse: function(obj) {
    artjs.Array.each(artjs.Object.values(obj), this._each, this);
  }
};
