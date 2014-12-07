artjs.SpecApi = artjs.spec.Api = {
  spec: function(facet, body) {
    var node = new artjs.Spec(facet, body);

    artjs.SpecRunner.pushSpec(node);
  },

  _executeNode: function(type, facet, body) {
    var node = new type(facet, body);
  
    node.execute();
  },

  describe: function(facet, body) {
    this._executeNode(artjs.Describe, facet, body);
  },

  context: function(facet, body) {
    this._executeNode(artjs.Context, facet, body);
  },

  it: function(facet, body) {
    this._executeNode(artjs.It, facet, body);
  }
};
