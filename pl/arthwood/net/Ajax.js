var Ajax = pl.arthwood.net.Ajax = function(url, data, method) {
  this.url = url;
  this.data = data;
  this.method = method || Ajax.Methods.GET;
  this.onReadyStateChangeDelegate = $DC(this, this.onReadyStateChange);
  this.onProgressDelegate = $DC(this, this.onProgress);
  this.onLoadDelegate = $DC(this, this.onLoad);
  this.onErrorDelegate = $DC(this, this.onError);
  this.onSuccess = new Event('Ajax:onSuccess');
  this.onFailure = new Event('Ajax:onFailure');
  this.onProgress = new Event('Ajax:onProgress');

  var r = new XMLHttpRequest();

  //r.overrideMimeType('text/xml');
  r.onreadystatechange = this.onReadyStateChangeDelegate;
/*  r.onprogress = this.onProgressDelegate;
  r.onload = this.onLoadDelegate;
  r.onerror = this.onErrorDelegate;
*/
  this._request = r;
};

Ajax.prototype.request = function() {
  this._request.open(this.method, this.url, true);
  this._request.send();
};

Ajax.prototype.abort = function() {
  this._request.abort();
};

Ajax.prototype.onReadyStateChange = function(event) {
  p(this.getReadyState());
  p(this.getStatus());
  //p('[' + this.getStatusText() + ']');
};

Ajax.prototype.onProgress = function(event) {
  var r = event.position / event.totalSize;
  
  this.onProgress.fire(this, r);

  p('onProgress ' + r);
};

Ajax.prototype.onLoad = function(event) {
  p('onLoad');
};

Ajax.prototype.onError = function(event) {
  p('onError');
  p(event.target.status);
};

Ajax.prototype.getReadyState = function() {
  return this._request.readyState;
};

Ajax.prototype.getStatus = function() {
  return this._request.status;
};

Ajax.prototype.getStatusText = function() {
  return this._request.statusText;
};

Ajax.prototype.getResponseText = function() {
  return this._request.responseText;
};

Ajax.prototype.getResponseXML = function() {
  return this._request.responseXML;
};

Ajax.prototype.setRequestHeader = function(header, value) {
  return this._request.setRequestHeader(header, value);
};

Ajax.prototype.getResponseHeader = function(header) {
  return this._request.getResponseHeader(header);
};

Ajax.prototype.getAllResponseHeaders = function() {
  return this._request.getAllResponseHeaders();
};


Ajax.Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

Ajax.ReadyState = {
  UNINITIALIZED: 0,
  OPEN: 1,
  SENT: 2,
  RECEIVING: 3,
  LOADED: 4
};
