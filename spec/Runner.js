artjs.SpecRunner = artjs.spec.Runner = {
  _specs: [],
  _duration: undefined,
  _it: null,
  _subject: undefined,
  _itsCount: undefined,
  _countMode: undefined,
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
  
  count: function() {
    this._itsCount = 0;
    this._countMode = true;
    
    artjs.ArrayUtils.invoke(this._specs, 'execute');
    
    this._countMode = false;
    
    var result = this._itsCount;
    
    this._itsCount = undefined;
    
    return result;
  },
  
  executeIt: function(it, itsArguments) {
    if (this._countMode) {
      this._itsCount++;
    }
    else {
      this._it = it;
      this._receivers = [];
      
      it.super(itsArguments);
      
      artjs.ArrayUtils.each(this._receivers, this._testReceiver, this);
    }
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
  
  pushResult: function(result) {
    if (!this.alreadyFailed()) {
      result.it = this._it;
      
      this._results.push(result);
      
      this.onResult.fire(this);
    }
  },
  
  getTotalSpecsNum: function() {
    return this._specs.length;
  },
  
  getTotalItsNum: function() {
    return this._itsCount;
  },
  
  _testReceiver: function(receiver) {
    var result = receiver.getResult();
    
    this.pushResult(result);
    
    receiver.rollback();
  }
};
