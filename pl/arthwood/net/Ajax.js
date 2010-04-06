ArtJs.Ajax = pl.arthwood.net.Ajax = function(url, data, method) {
  this.onReadyStateChangeDelegate = ArtJs.$DC(this, this.onReadyStateChange);
  this.onProgressDelegate = ArtJs.$DC(this, this.onProgress);
  this.onLoadDelegate = ArtJs.$DC(this, this.onLoad);
  this.onErrorDelegate = ArtJs.$DC(this, this.onError);
  this.onSuccess = new ArtJs.Event('Ajax:onSuccess');
  this.onFailure = new ArtJs.Event('Ajax:onFailure');
  this.onProgress = new ArtJs.Event('Ajax:onProgress');
  
  var methods = ArtJs.Ajax.Methods;
  
  this.url = url;
  this.data = data;
  this.method = method;
  this.requestData = data;
  this.requestMethod = method || methods.GET;
  
  if (!ArtJs.ArrayUtils.include(ArtJs.Ajax.SupportedMethods, this.requestMethod)) {
    this.requestData = this.requestData || {};
    this.requestData._method = this.requestMethod;
    this.requestMethod = methods.POST;
  }
  
  var r = this._request = new XMLHttpRequest();
  
  r.open(this.requestMethod, this.url, true);  
  
  this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  this.setRequestHeader('X-ArtJs-Version', ArtJs.VERSION);
  this.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
  
  r.onreadystatechange = this.onReadyStateChangeDelegate;
  r.onprogress = this.onProgressDelegate;
  r.onload = this.onLoadDelegate;
  r.onerror = this.onErrorDelegate;
};

ArtJs.Ajax.prototype = {
  request: function() {
    var data;
    
    if (this.requestMethod == ArtJs.Ajax.Methods.POST) {
      this.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
      
      if (this.requestData) data = ArtJs.ObjectUtils.toQueryString(this.requestData);
    }
    
    this._request.send(data);
  },

  abort: function() {
    this._request.abort();
  },

  onReadyStateChange: function(event) {
  },

  onProgress: function(event) {
    var r = event.position / event.totalSize;
    
    this.onProgress.fire(this, r);
  },

  onLoad: function(event) {
    this.onSuccess.fire(this);
  },

  onError: function(event) {
    p('onError');
    p(event);
  },

  getReadyState: function() {
    return this._request.readyState;
  },

  getStatus: function() {
    return this._request.status;
  },

  getStatusText: function() {
    return this._request.statusText;
  },

  getResponseText: function() {
    return this._request.responseText;
  },
  
  getResponseXML: function() {
    return this._request.responseXML;
  },

  setRequestHeader: function(header, value) {
    return this._request.setRequestHeader(header, value);
  },

  getResponseHeader: function(header) {
    return this._request.getResponseHeader(header);
  },
  
  getAllResponseHeaders: function() {
    return this._request.getAllResponseHeaders();
  }
};

ArtJs.Ajax.Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
ArtJs.Ajax.SupportedMethods = [ArtJs.Ajax.Methods.GET, ArtJs.Ajax.Methods.POST];
ArtJs.Ajax.ReadyState = {
  UNINITIALIZED: 0,
  OPEN: 1,
  SENT: 2,
  RECEIVING: 3,
  LOADED: 4
};

ArtJs.Ajax.get = ArtJs.$get = function(url, onSuccess) {
  return ArtJs.Ajax.request(url, null, Ajax.Methods.GET, onSuccess);
};

ArtJs.Ajax.post = ArtJs.$post = function(url, data, onSuccess) {
  return ArtJs.Ajax.request(url, data, Ajax.Methods.POST, onSuccess);
};

ArtJs.Ajax.put = ArtJs.$put = function(url, data, onSuccess) {
  return ArtJs.Ajax.request(url, data, Ajax.Methods.PUT, onSuccess);
};

ArtJs.Ajax.del = ArtJs.$del = function(url, data, onSuccess) {
  return ArtJs.Ajax.request(url, data, Ajax.Methods.DELETE, onSuccess);
};

ArtJs.Ajax.request = function(url, data, method, onSuccess) {
  var ajax = new Ajax(url, data, method);
  
  onSuccess && ajax.onSuccess.add(onSuccess);
  
  ajax.request();
  
  return ajax;
};
