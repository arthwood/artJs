ArtJs.Ajax = com.arthwood.net.Ajax = function(url, data, method) {
  this._onReadyStateChangeDC = ArtJs.$DC(this, this._onReadyStateChange, true);
  this._onProgressDC = ArtJs.$DC(this, this._onProgress, true);
  this._onErrorDC = ArtJs.$DC(this, this._onError, true);
  this._onLoadDC = ArtJs.$DC(this, this._onLoad, true);
  this.onSuccess = new ArtJs.CustomEvent('Ajax:onSuccess');
  this.onFailure = new ArtJs.CustomEvent('Ajax:onFailure');
  this.onProgress = new ArtJs.CustomEvent('Ajax:onProgress');
  
  var methods = ArtJs.Ajax.Methods;
  
  this.url = url;
  this.data = data;
  this.method = method;
  this.requestData = data;
  this.requestMethod = method || methods.GET;
  
  if (!ArtJs.ArrayUtils.includes(ArtJs.Ajax.SupportedMethods, this.requestMethod)) {
    this.requestData = this.requestData || {};
    this.requestData._method = this.requestMethod;
    this.requestMethod = methods.POST;
  }
  
  this._request = new XMLHttpRequest();
  
  this.requestUrl = this.url;
  
  if (this.requestData) {
    this.requestQueryData = ArtJs.ObjectUtils.toQueryString(this.requestData);
    
    if (this.requestMethod == methods.GET) {
      this.requestUrl += ('?' + this.requestQueryData);
      this.requestQueryData = null;
    }
  }

  this._request.open(this.requestMethod, this.requestUrl, true);
  
  this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  this.setRequestHeader('X-ArtJs-Version', ArtJs.VERSION);
  this.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');

  if (this.requestMethod == methods.POST) {
    this.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }
  
  this._request.onreadystatechange = this._onReadyStateChangeDC;
  this._request.onprogress = this._onProgressDC;
  this._request.onerror = this._onErrorDC;
  this._request.onload = this._onLoadDC;
};

ArtJs.Ajax.prototype = {
  request: function() {
    this._request.send(this.requestQueryData);
  },
  
  abort: function() {
    this._request.abort();
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
  },

  _onLoad: function(request, event) {
    this.onSuccess.fire(this);
  },

  _onProgress: function(request, event) {
    var r = event.position / event.totalSize;

    this.onProgress.fire(this, r);
  },

  _onError: function(request, event) {
    this.onFailure.fire(this);
  },

  _onReadyStateChange: function(request) {
    if (this.getReadyState() == ArtJs.Ajax.ReadyState.LOADED) {
      this.onSuccess.fire(this);
    }
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

ArtJs.Ajax.get = ArtJs.$get = function(url, data, onSuccess) {
  return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.GET, onSuccess);
};

ArtJs.Ajax.post = ArtJs.$post = function(url, data, onSuccess) {
  return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.POST, onSuccess);
};

ArtJs.Ajax.put = ArtJs.$put = function(url, data, onSuccess) {
  return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.PUT, onSuccess);
};

ArtJs.Ajax.del = ArtJs.$del = function(url, data, onSuccess) {
  return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.DELETE, onSuccess);
};

ArtJs.Ajax.request = function(url, data, method, onSuccess) {
  var ajax = new ArtJs.Ajax(url, data, method);
  
  if (onSuccess) { ajax.onSuccess.add(onSuccess); }
  
  ajax.request();
  
  return ajax;
};
