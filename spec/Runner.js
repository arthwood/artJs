artjs.SpecRunner = artjs.spec.Runner = artjs.Class(
  function() {
    this.timeline = new artjs.Timeline();
    
    this.init();
  },
  {
    runnerTemplate: artjs.ElementBuilder.create('div', {className: 'runner'}),
    testTemplate: artjs.ElementBuilder.create('span'),
    resultsTemplate: artjs.ElementBuilder.create('div'),
  
    init: function() {
      this.specs = [];
      this.path = [];
      this.results = [];
      this.receivers = [];
    },
    
    run: function() {
      this.timeline.mark();
      
      this.runnerElement = artjs.$insert(document.body, this.runnerTemplate);
      
      artjs.ArrayUtils.invoke(this.specs, 'execute');
      
      var duration = this.timeline.mark();
      var failures = artjs.ArrayUtils.select(this.results, this._isFailure, this);
      var success = artjs.ArrayUtils.isEmpty(failures);
      var classNames = ['results'];
      var n = this.results.length;
      var k = failures.length;
      
      classNames.push(success ? 'success' : 'failure');
      
      this.resultsTemplate.className = classNames.join(' ');
      this.resultsElement = artjs.$insert(document.body, this.resultsTemplate);
      
      var resultText = success ? 'Success!' : 'Failure!';
      var statsText = success
        ? n + ' assertions in total.'
        : k + ' assertions failed of ' + n + ' total.';
      var durationText = 'Duration: ' + artjs.DateUtils.miliToHMSM(duration);
      var resultElement = artjs.$E('p', {className: 'result'}, resultText);
      var statElement = artjs.$E('p', {className: 'stat'}, statsText + '<br/>' + durationText);
      
      artjs.$insert(this.resultsElement, resultElement);
      artjs.$insert(this.resultsElement, statElement);
      
      if (!success) {
        var list = artjs.$E('ul');
        
        this._getFailureHtml.list = list;
        
        artjs.ArrayUtils.each(failures, this._getFailureHtml, this);
        
        artjs.$insert(this.resultsElement, list);
      }
    },
    
    alreadyFailed: function() {
      var lastResult = artjs.ArrayUtils.last(this.results);
      
      return lastResult && lastResult.it == this.it && !lastResult.value;
    },
    
    pushResult: function(result) {
      if (!this.alreadyFailed()) {
        result.it = this.it;
        this.results.push(result);
        
        artjs.ElementUtils.setContent(this.testTemplate, result.value ? '.' : 'F');
        this.testTemplate.className = result.value ? 'success' : 'failure';
        artjs.ElementUtils.insert(this.runnerElement, this.testTemplate);
      }
    },
    
    _testReceivers: function() {
      artjs.ArrayUtils.each(this.receivers, this.testReceiver, this);
    },
    
    testReceiver: function(receiver) {
      var result = receiver.getResult();
      
      this.pushResult(result);
      
      receiver.rollback();
    },
    
    _getFailureHtml: function(i) {
      var path = artjs.ArrayUtils.map(i.path, this._nodeToString).join(' ');
      var info = i.failureText();
      var pathElement = artjs.$E('p', {className: 'path'}, path);
      var infoElement = artjs.$E('p', {className: 'info'}, info);
      var item = artjs.$E('li');
      
      artjs.$insert(item, pathElement);
      artjs.$insert(item, infoElement);
      artjs.$insert(arguments.callee.list, item);
    },
    
    _nodeToString: function(i) {
      var facet = i.facet;
      
      return typeof(facet) == 'string' ? facet : facet._name;
    },
    
    _isFailure: function(i) {
      return !i.value;
    }
  }
);
