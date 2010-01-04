ArtJs.Ajax = pl.arthwood.net.Ajax = function(url, data, method) {
  this.url = url;
  this.data = data;
  this.method = method || ArtJs.Ajax.Methods.GET;
  this.onReadyStateChangeDelegate = ArtJs.$DC(this, this.onReadyStateChange);
  this.onProgressDelegate = ArtJs.$DC(this, this.onProgress);
  this.onLoadDelegate = ArtJs.$DC(this, this.onLoad);
  this.onErrorDelegate = ArtJs.$DC(this, this.onError);
  this.onSuccess = new ArtJs.Event('Ajax:onSuccess');
  this.onFailure = new ArtJs.Event('Ajax:onFailure');
  this.onProgress = new ArtJs.Event('Ajax:onProgress');

  var r = new XMLHttpRequest();

  //r.overrideMimeType('text/xml');
  r.onreadystatechange = this.onReadyStateChangeDelegate;
/*  r.onprogress = this.onProgressDelegate;
  r.onload = this.onLoadDelegate;
  r.onerror = this.onErrorDelegate;
*/
  this._request = r;
};

ArtJs.Ajax.prototype.request = function() {
  this._request.open(this.method, this.url, true);
  this._request.send();
};

ArtJs.Ajax.prototype.abort = function() {
  this._request.abort();
};

ArtJs.Ajax.prototype.onReadyStateChange = function(event) {
  p(this.getReadyState());
  p(this.getStatus());
  //p('[' + this.getStatusText() + ']');
};

ArtJs.Ajax.prototype.onProgress = function(event) {
  var r = event.position / event.totalSize;
  
  this.onProgress.fire(this, r);

  p('onProgress ' + r);
};

ArtJs.Ajax.prototype.onLoad = function(event) {
  p('onLoad');
};

ArtJs.Ajax.prototype.onError = function(event) {
  p('onError');
  p(event.target.status);
};

ArtJs.Ajax.prototype.getReadyState = function() {
  return this._request.readyState;
};

ArtJs.Ajax.prototype.getStatus = function() {
  return this._request.status;
};

ArtJs.Ajax.prototype.getStatusText = function() {
  return this._request.statusText;
};

ArtJs.Ajax.prototype.getResponseText = function() {
  return this._request.responseText;
};

ArtJs.Ajax.prototype.getResponseXML = function() {
  return this._request.responseXML;
};

ArtJs.Ajax.prototype.setRequestHeader = function(header, value) {
  return this._request.setRequestHeader(header, value);
};

ArtJs.Ajax.prototype.getResponseHeader = function(header) {
  return this._request.getResponseHeader(header);
};

ArtJs.Ajax.prototype.getAllResponseHeaders = function() {
  return this._request.getAllResponseHeaders();
};


ArtJs.Ajax.Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

ArtJs.Ajax.ReadyState = {
  UNINITIALIZED: 0,
  OPEN: 1,
  SENT: 2,
  RECEIVING: 3,
  LOADED: 4
};
