ArtJs.SpecRunner = com.arthwood.spec.Runner = ArtJs.Class(
  function() {
    this.timeline = new ArtJs.Timeline();
    
    this.init();
  },
  {
    runnerTemplate: ArtJs.ElementBuilder.create('div', {className: 'runner'}),
    testTemplate: ArtJs.ElementBuilder.create('span'),
    resultsTemplate: ArtJs.ElementBuilder.create('div'),
  
    init: function() {
      this.specs = [];
      this.path = [];
      this.results = [];
      this.receivers = [];
    },
    
    run: function() {
      this.timeline.start();
      
      this.runnerElement = ArtJs.$insert(document.body, this.runnerTemplate);
      
      ArtJs.ArrayUtils.invoke(this.specs, 'execute');
      
      var duration = this.timeline.mark();
      var failures = ArtJs.ArrayUtils.select(this.results, this._isFailure, this);
      var success = ArtJs.ArrayUtils.isEmpty(failures);
      var classNames = ['results'];
      var n = this.results.length;
      var k = failures.length;
      
      classNames.push(success ? 'success' : 'failure');
      
      this.resultsTemplate.className = classNames.join(' ');
      this.resultsElement = ArtJs.$insert(document.body, this.resultsTemplate);
      
      var resultText = success ? 'Success!' : 'Failure!';
      var statsText = success
        ? n + ' assertions in total.'
        : k + ' assertions failed of ' + n + ' total.';
      var durationText = 'Duration: ' + ArtJs.DateUtils.miliToHMSM(duration);
      var resultElement = ArtJs.$E('p', {className: 'result'}, resultText);
      var statElement = ArtJs.$E('p', {className: 'stat'}, statsText + '<br/>' + durationText);
      
      ArtJs.$insert(this.resultsElement, resultElement);
      ArtJs.$insert(this.resultsElement, statElement);
      
      if (!success) {
        var list = ArtJs.$E('ul');
        
        this._getFailureHtml.list = list;
        
        ArtJs.ArrayUtils.each(failures, this._getFailureHtml, this);
        
        ArtJs.$insert(this.resultsElement, list);
      }
    },
    
    alreadyFailed: function() {
      var lastResult = ArtJs.ArrayUtils.last(this.results);
      
      return lastResult && lastResult.it == this.it && !lastResult.value;
    },
    
    pushResult: function(result) {
      if (!this.alreadyFailed()) {
        result.it = this.it;
        this.results.push(result);
        
        ArtJs.ElementUtils.setContent(this.testTemplate, result.value ? '.' : 'F');
        this.testTemplate.className = result.value ? 'success' : 'failure';
        ArtJs.ElementUtils.insert(this.runnerElement, this.testTemplate);
      }
    },
    
    _testReceivers: function() {
      ArtJs.ArrayUtils.each(this.receivers, this.testReceiver, this);
    },
    
    testReceiver: function(receiver) {
      var result = receiver.getResult();
      
      this.pushResult(result);
      
      receiver.rollback();
    },
    
    _getFailureHtml: function(i) {
      var path = ArtJs.ArrayUtils.map(i.path, this._nodeToString).join(' ');
      var info = i.failureText();
      var pathElement = ArtJs.$E('p', {className: 'path'}, path);
      var infoElement = ArtJs.$E('p', {className: 'info'}, info);
      var item = ArtJs.$E('li');
      
      ArtJs.$insert(item, pathElement);
      ArtJs.$insert(item, infoElement);
      ArtJs.$insert(arguments.callee.list, item);
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
