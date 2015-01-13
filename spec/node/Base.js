artjs.BaseSpecNode = artjs.spec.node.Base = artjs.Class(
  function(facet, body, focus) {
    this.facet = facet;
    this.body = body;
    this.focus = Boolean(focus);
  },
  {
    register: function() {
      artjs.Spec.updateFocus(this.focus);
    },
    
    execute: function() {
      this.ctor.execute(this);
    },
    
    toString: function() {
      return this.facet.toString();
    }
  },
  {
    _path: [],
    
    getPath: function() {
      return this._path;
    },
    
    execute: function(node) {
      this._path.push(node);
      node.body();
      this._path.pop()
    }
  }
);
