artjs.SpecApi = artjs.spec.Api = {
  register: function(type, facet, body, focus) {
    var node = new type(facet, body, focus);
    
    node.register();
    
    return node;
  }
};

function spec(facet, body, focus) {
  return artjs.SpecApi.register(artjs.Specify, facet, body, focus);
}

function describe(facet, body, focus) {
  return artjs.SpecApi.register(artjs.Describe, facet, body, focus);
}

function context(facet, body, focus) {
  return artjs.SpecApi.register(artjs.Context, facet, body, focus);
}

function it(facet, body, focus) {
  return artjs.SpecApi.register(artjs.It, facet, body, focus);
}

function before(body) {
  return artjs.SpecApi.register(artjs.Before, body);
}

function eq(expected) {
  return new artjs.EqMatcher(expected);
}

function beA(expected) {
  return new artjs.AMatcher(expected);
}

function beTrue() {
  return new artjs.TrueMatcher();
}

function beFalse() {
  return new artjs.FalseMatcher();
}

function beNull() {
  return new artjs.NullMatcher();
}

function receive(expected) {
  return new artjs.ReceiveMatcher(expected);
}

function expect(value) {
  return new artjs.Actual(value);
}

function mock() {
  return new artjs.Mock(artjs.$A(arguments));
}

function subject() {
  return artjs.Spec.getSubject();
}

/* focused */
function sspec(facet, body) {
  return spec(facet, body, true);
}

function ddescribe(facet, body, focus) {
  return describe(facet, body, true);
}

function ccontext(facet, body, focus) {
  return context(facet, body, true);
}

function iit(facet, body, focus) {
  return it(facet, body, true);
}
/* end */
