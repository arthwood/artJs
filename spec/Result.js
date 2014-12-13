artjs.SpecResult = artjs.spec.Result = artjs.Class(
  function(actual, matcher, value) {
    this.path = artjs.SpecRunner.getPath().concat();
    this.actual = actual;
    this.matcher = matcher;
    this.value = value;
  },
  {
    failureText: function() {
      return this.matcher.failureText(this.actual);
    },
    
    getPathAsString: function() {
      return artjs.ArrayUtils.map(this.path, this.ctor._nodeToString).join(' ');
    }
  },
  {
    _nodeToString: function(i) {
      var facet = i.facet;
      
      return typeof(facet) == 'string' ? facet : facet._name;
    }
  }
);
