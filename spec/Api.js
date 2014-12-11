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
  },
  
  eq: function(expected) {
    return new artjs.EqMatcher(expected);
  },
  
  beA: function(expected) {
    return new artjs.AMatcher(expected);
  },

  beFalse: function() {
    return new artjs.FalseMatcher();
  },
  
  beNull: function() {
    return new artjs.NullMatcher();
  },

  receive: function(expected) {
    return new artjs.ReceiveMatcher(expected);
  },

  beTrue: function() {
    return new artjs.TrueMatcher();
  },
  
  expect: function(value) {
    return new artjs.Actual(value);
  },
  
  mock: function() {
    return new artjs.Mock();
  },

  subject: function() {
    return artjs.SpecRunner.getSubject();
  }
};
