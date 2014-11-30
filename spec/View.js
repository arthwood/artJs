artjs.SpecView = artjs.spec.View = {
  init: function() {
    this._runnerTemplate = artjs.$C('div', {className: 'runner'});
    this._testTemplate = artjs.$C('span');
    this._resultsTemplate = artjs.$C('div');
    
    artjs.SpecRunner.onResult.add(artjs.$D(this, '_onResult'));
    artjs.SpecRunner.onComplete.add(artjs.$D(this, '_onComplete'));
  },
  
  run: function() {
    this._element = artjs.$insert(document.body, this._runnerTemplate);

    artjs.SpecRunner.run();
  },
  
  _onResult: function(runner) {
    var result = runner.getLastResult();
    
    artjs.ElementUtils.setContent(this._testTemplate, result.value ? '.' : 'F');
    this._testTemplate.className = result.value ? 'success' : 'failure';
    artjs.ElementUtils.insert(this._element, this._testTemplate);
  },
  
  _onComplete: function(runner) {
    var results = runner.getResults();
    var duration = runner.getDuration();
    var failures = artjs.ArrayUtils.select(results, this._isFailure, this);
    var success = artjs.ArrayUtils.isEmpty(failures);
    var classNames = ['results'];
    var n = results.length;
    var k = failures.length;
    
    classNames.push(success ? 'success' : 'failure');
    
    this._resultsTemplate.className = classNames.join(' ');
    var resultsElement = artjs.$insert(document.body, this._resultsTemplate);
    
    var resultText = success ? 'Success!' : 'Failure!';
    var statsText = success
      ? n + ' assertions in total.'
      : k + ' assertions failed of ' + n + ' total.';
    var durationText = 'Duration: ' + artjs.DateUtils.miliToHMSM(duration);
    var resultElement = artjs.$E('p', {className: 'result'}, resultText);
    var statElement = artjs.$E('p', {className: 'stat'}, statsText + '<br/>' + durationText);
    
    artjs.$insert(resultsElement, resultElement);
    artjs.$insert(resultsElement, statElement);
    
    if (!success) {
      var list = artjs.$E('ul');
      
      this._getFailureHtml.list = list;
      
      artjs.ArrayUtils.each(failures, this._getFailureHtml, this);
      
      artjs.$insert(resultsElement, list);
    }
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
};
