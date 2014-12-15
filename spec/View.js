artjs.SpecView = artjs.spec.View = {
  init: function() {
    this._runnerTemplate = artjs.$C('div', {className: 'runner'});
    this._testTemplate = artjs.$C('span');
    this._resultsTemplate = artjs.$C('div');
    
    artjs.SpecRunner.onItComplete.add(artjs.$D(this, '_onItComplete'));
    artjs.SpecRunner.onComplete.add(artjs.$D(this, '_onComplete'));
    artjs.$DT(artjs.SpecApi, window);
  },
  
  run: function() {
    this._element = artjs.$insert(document.body, this._runnerTemplate);

    artjs.SpecRunner.count();
    artjs.SpecRunner.run();
  },
  
  _onItComplete: function(runner) {
    var success = runner.getCurrentTest().isSuccess();
    
    artjs.ElementUtils.setContent(this._testTemplate, success ? '.' : 'F');
    this._testTemplate.className = success ? 'success' : 'failure';
    artjs.ElementUtils.insert(this._element, this._testTemplate);
  },
  
  _onComplete: function(runner) {
    var its = runner.getIts();
    var duration = runner.getDuration();
    var failures = artjs.ArrayUtils.reject(artjs.ArrayUtils.pluck(its, 'success'));
    var success = artjs.ArrayUtils.isEmpty(failures);
    var classNames = ['results'];
    var n = its.length;
    var k = failures.length;
    
    classNames.push(success ? 'success' : 'failure');
    
    this._resultsTemplate.className = classNames.join(' ');
    var resultsElement = artjs.$insert(document.body, this._resultsTemplate);
    
    var resultText = success ? 'Success!' : 'Failure!';
    var statsText = success
      ? n + ' tests in total.'
      : k + ' tests failed of ' + n + ' total.';
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
  }
};
