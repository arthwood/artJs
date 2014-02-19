ArtJs.Definition = com.arthwood.spec.Definition = ArtJs.Class(
  function(value) {
    this.value = value;
  
    this.evaluation = ArtJs.$DC(this, this.evaluate);
  },
  {
    evaluate: function() {
      if (!this.isEvaluated) {
        this.result = this.value();
        this.isEvaluated = true;
      }
  
      return this.result;
    }
  },
  {
    getEvaluation: function(value) {
      var definition = new this(value);
  
      return definition.evaluation;
    }
  }
);

function define(value) {
  return ArtJs.Definition.getEvaluation(value);
}
