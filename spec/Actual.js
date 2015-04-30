artjs.Actual = artjs.spec.Actual = artjs.Class(
  function(value) {
    this.value = value;
    this.not = false;
  },
  {
    to: function(matcher) {
      var value = matcher.resolve(this);
      
      if (typeof value == 'boolean')  {
        artjs.Spec.pushResult(new artjs.SpecResult(this, matcher, Boolean(this.not ^ value)));
      }
      else {
        artjs.Spec.pushReceiver(value);
      }
      
      return value;
    },
    
    toNot: function(matcher) {
      this.not = true;
      
      return this.to(matcher);
    }
  }
);
