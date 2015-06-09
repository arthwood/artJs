artjs.BrowserSpecView = artjs.spec.view.Browser = artjs.Class(
  function(container) {
    this.super();
    
    this._container = container || document.body;
    this._runnerTemplate = artjs.$C('div', {className: 'runner'});
    this._testTemplate = artjs.$C('span', {className: 'test'});
    this._resultsTemplate = artjs.$C('div', {className: 'results'});
  },
  {
    beforeRun: function() {
      this.super();
      
      this._element = artjs.$I(this._container, this._runnerTemplate);
      this._resultsElement = artjs.$I(this._container, this._resultsTemplate);
    },
    
    onItComplete: function(runner) {
      var success = runner.getCurrentTest().isSuccess();
      
      artjs.Element.setContent(this._testTemplate, success ? '.' : 'F');
      this._testTemplate.className = success ? 'success' : 'failure';
      artjs.Element.insert(this._element, this._testTemplate);
    },
    
    onComplete: function(runner) {
      var its = artjs.It.getRunInstances();
      var duration = runner.getDuration();
      var failures = artjs.Array.reject(its, this._isSuccess);
      var success = artjs.Array.isEmpty(failures);
      var classNames = ['results'];
      var n = its.length;
      var k = failures.length;
      
      classNames.push(success ? 'success' : 'failure');
      
      this._resultsTemplate.className = classNames.join(' ');
      
      var resultText = success ? 'Success!' : 'Failure!';
      var statsText = success
        ? n + ' tests in total.'
        : k + ' tests failed of ' + n + ' total.';
      var durationText = 'Duration: ' + artjs.Date.msToHMSM(duration);
      var resultElement = artjs.$E('p', {className: 'result'}, resultText);
      var statElement = artjs.$E('p', {className: 'stat'}, statsText + '<br/>' + durationText);
      
      artjs.$I(this._resultsElement, resultElement);
      artjs.$I(this._resultsElement, statElement);
      
      if (!success) {
        var list = artjs.$E('ul');
        
        this._getFailureHtml.list = list;
        
        artjs.Array.each(failures, this._getFailureHtml, this);
        
        artjs.$I(this._resultsElement, list);
      }
    },
    
    _isSuccess: function(it) { 
      return it.isSuccess(); 
    },
    
    _getFailureHtml: function(it) {
      var path = artjs.Array.map(it.getPath(), this._nodeToString).join(' ');
      var info = it.failureText();
      var pathElement = artjs.$E('p', {className: 'path'}, path);
      var infoElement = artjs.$E('p', {className: 'info'}, info);
      var item = artjs.$E('li');
      
      artjs.$I(item, pathElement);
      artjs.$I(item, infoElement);
      artjs.$I(arguments.callee.list, item);
    },
    
    _nodeToString: function(i) {
      var facet = i.facet;
      
      return typeof(facet) == 'string' ? facet : facet._name;
    }
  },
  {
    run: function(container) {
      var view = new this(container);
  
      artjs.Spec.init(view);
      artjs.Spec.run();
    }
  },
  artjs.BaseSpecView
);
