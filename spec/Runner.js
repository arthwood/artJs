artjs.SpecRunner = artjs.spec.Runner = {
  _specs: [],
  _duration: undefined,
  _it: null,
  _subject: undefined,
  _itsPreCount: undefined,
  _countMode: undefined,
  _path: [],
  _its: [],
  _receivers: [],
  _timeline: new artjs.Timeline(),
  onComplete: new artjs.CustomEvent('artjs.SpecRunner::onComplete'),
  onItComplete: new artjs.CustomEvent('artjs.SpecRunner::onItComplete'),
  
  run: function() {
    this._timeline.mark();
    
    artjs.ArrayUtils.invoke(this._specs, 'execute');
    
    this._duration = this._timeline.mark();
    
    this.onComplete.fire(this);
  },
  
  count: function() {
    this._itsPreCount = 0;
    this._countMode = true;
    
    artjs.ArrayUtils.invoke(this._specs, 'execute');
    
    this._countMode = false;
    
    return this._itsPreCount;
  },
  
  executeIt: function(it, itsArguments) {
    if (this._countMode) {
      this._itsPreCount++;
    }
    else {
      this._it = it;
      this._receivers = [];
      this._it.setPath(this._path.concat());
      this._its.push(this._it);
      
      it.super(itsArguments);
      
      artjs.ArrayUtils.each(this._receivers, this._testReceiver, this);
      
      this.onItComplete.fire(this);
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
  
  pushReceiver: function(receiver) {
    this._receivers.push(receiver);
  },
  
  pushResult: function(result) {
    this._it.pushResult(result);
  },
  
  getTotalSpecsNum: function() {
    return this._specs.length;
  },
  
  getIts: function() {
    return this._its;
  },
  
  getCurrentTest: function() {
    return this._it;
  },
  
  _testReceiver: function(receiver) {
    var result = receiver.getResult();
    
    this.pushResult(result);
    
    receiver.rollback();
  }
};
