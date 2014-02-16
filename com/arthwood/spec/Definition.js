ArtJs.Definition = com.arthwood.spec.Definition = function(value) {
  this.value = value;

  this.evaluation = ArtJs.$DC(this, this.evaluate);
};

ArtJs.Definition.getEvaluation = function(value) {
  var definition = new this(value);

  return definition.evaluation;
};

ArtJs.Definition.prototype = {
  evaluate: function() {
    if (!this.isEvaluated) {
      this.result = this.value();
      this.isEvaluated = true;
    }

    return this.result;
  }
};

function define(value) {
  return ArtJs.Definition.getEvaluation(value);
}
