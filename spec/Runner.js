artjs.SpecRunner = artjs.spec.Runner = {
  _specs: [],
  _duration: null,
  _it: null,
  _subject: null,
  _path: [],
  _results: [],
  _receivers: [],
  _timeline: new artjs.Timeline(),
  onComplete: new artjs.CustomEvent('artjs.SpecRunner::onComplete'),
  onResult: new artjs.CustomEvent('artjs.SpecRunner::onResult'),
  
  run: function() {
    this._timeline.mark();
    
    artjs.ArrayUtils.invoke(this._specs, 'execute');
    
    this._duration = this._timeline.mark();
    
    this.onComplete.fire(this);
  },
  
  pushSpec: function(spec) {
    this._specs.push(spec);
  },
  
  pushNode: function(node) {
    this._path.push(node);
  },
  
  popNode: function(node) {
    this._path.pop()
  },
  
  setSubject: function(subject) {
    this._subject = subject;
  },
  
  setIt: function(it) {
    this._it = it;
  },
  
  getDuration: function() {
    return this._duration;
  },
  
  getSubject: function() {
    return this._subject;
  },
  
  getPath: function() {
    return this._path;
  },
  
  getResults: function() {
    return this._results;
  },
  
  getLastResult: function() {
    return artjs.ArrayUtils.last(this._results);
  },
  
  alreadyFailed: function() {
    var lastResult = this.getLastResult();
    
    return lastResult && lastResult.it == this._it && !lastResult.value;
  },
  
  pushReceiver: function(receiver) {
    this._receivers.push(receiver);
  },
  
  resetReceivers: function() {
    this._receivers = [];
  },
  
  testReceivers: function() {
    artjs.ArrayUtils.each(this._receivers, this.testReceiver, this);
  },
  
  testReceiver: function(receiver) {
    var result = receiver.getResult();
    
    this.pushResult(result);
    
    receiver.rollback();
  },
  
  pushResult: function(result) {
    if (!this.alreadyFailed()) {
      result.it = this._it;
      
      this._results.push(result);
      
      this.onResult.fire(this);
    }
  }
};
