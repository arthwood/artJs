artjs.RealSpecRunner = artjs.spec.runner.Real = artjs.Class(
  function() {
    this._duration = undefined;
    this._timeline = new artjs.Timeline();
    this._subject = undefined;
    this.onComplete = new artjs.Event('artjs.SpecRunner::onComplete');
    this.onItComplete = new artjs.Event('artjs.SpecRunner::onItComplete');
  },
  {
    run: function () {
      this._timeline.mark();

      this.super();

      this._duration = this._timeline.mark();

      this.onComplete.fire(this);
    },

    getDuration: function() {
      return this._duration;
    },
    
    pushResult: function(result) {
      this._it.pushResult(result);
    },
    
    testComplete: function() {
      this.onItComplete.fire(this);
    }
  },
  null,
  artjs.BaseSpecRunner
);
