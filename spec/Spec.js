artjs.Spec = artjs.spec.Spec = {
  init: function(view) {
    this._dryRunner = new artjs.DrySpecRunner();
    this._realRunner = new artjs.RealSpecRunner();
    this._realRunner.onComplete.add(artjs.$D(view, 'onComplete'));
    this._realRunner.onItComplete.add(artjs.$D(view, 'onItComplete'));
    this._view = view;
  },
  
  run: function() {
    this._view.beforeRun();
    
    this._runner = this._dryRunner;
    this._runner.run();
    
    this._view.afterDryRun();

    artjs.It.resetInstances();

    this._runner = this._realRunner;
    this._runner.run();
  },

  getRunner: function() {
    return this._runner;
  },
  
  isRealRun: function() {
    return this.getRunner() == this._realRunner;
  },
  
  updateFocus: function(focus) {
    this._hasFocus = this._hasFocus || focus;
  },
  
  hasFocus: function() {
    return this._hasFocus;
  },
  
  getSubject: function() {
    return this.getRunner().getSubject();
  },
  
  pushResult: function(result) {
    this.getRunner().pushResult(result);
  },
  
  pushReceiver: function(receiver) {
    return this.getRunner().getCurrentTest().pushReceiver(receiver);
  },
  
  setSubject: function(subject) {
    this.getRunner().setSubject(subject);
  },
  
  setCurrentTest: function(it) {
    this.getRunner().setCurrentTest(it);
  }
};
