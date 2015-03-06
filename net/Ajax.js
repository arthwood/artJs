artjs.Ajax = artjs.net.Ajax = artjs.Class(
  function(url, data, method) {
    this._onReadyStateChangeDC = artjs.$DC(this, this._onReadyStateChange, true);
    this._onProgressDC = artjs.$DC(this, this._onProgress, true);
    this._onErrorDC = artjs.$DC(this, this._onError, true);
    this.onSuccess = new artjs.Event('Ajax:onSuccess');
    this.onFailure = new artjs.Event('Ajax:onFailure');
    this.onProgress = new artjs.Event('Ajax:onProgress');
    
    var methods = artjs.Ajax.Methods;
    
    this.url = url;
    this.data = data;
    this.method = method;
    this.requestData = data;
    this.requestMethod = method || methods.GET;
    
    if (!artjs.ArrayUtils.includes(artjs.Ajax.SupportedMethods, this.requestMethod)) {
      this.requestData = this.requestData || {};
      this.requestData._method = this.requestMethod;
      this.requestMethod = methods.POST;
    }
    
    this._request = new XMLHttpRequest();
    
    this.requestUrl = this.url;
    
    if (this.requestData) {
      this.requestQueryData = artjs.ObjectUtils.toQueryString(this.requestData);
      
      if (this.requestMethod == methods.GET) {
        this.requestUrl += ('?' + this.requestQueryData);
        this.requestQueryData = null;
      }
    }
  
    this._request.open(this.requestMethod, this.requestUrl, true);
    
    this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.setRequestHeader('X-artjs-Version', artjs.VERSION);
    this.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
  
    if (this.requestMethod == methods.POST) {
      this.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    
    this._request.onreadystatechange = this._onReadyStateChangeDC;
    this._request.onprogress = this._onProgressDC;
    this._request.onerror = this._onErrorDC;
  },
  {
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
  
    _onProgress: function(request, event) {
      var r = event.loaded / event.total;
  
      this.onProgress.fire(this, r);
    },
  
    _onError: function(request, event) {
      this.onFailure.fire(this);
    },
  
    _onReadyStateChange: function(request) {
      if (this.getReadyState() == artjs.Ajax.ReadyState.LOADED) {
        this.onSuccess.fire(this);
      }
    }
  },
  {
    Methods: {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE'
    },
    
    ReadyState: {
      UNINITIALIZED: 0,
      OPEN: 1,
      SENT: 2,
      RECEIVING: 3,
      LOADED: 4
    },
    
    get: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.GET, onSuccess);
    },
    
    post: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.POST, onSuccess);
    },
    
    put: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.PUT, onSuccess);
    },
    
    del: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.DELETE, onSuccess);
    },
    
    request: function(url, data, method, onSuccess) {
      var ajax = new artjs.Ajax(url, data, method);
      
      if (onSuccess) { ajax.onSuccess.add(onSuccess); }
      
      ajax.request();
      
      return ajax;
    }
  }
);

artjs.Ajax.SupportedMethods = [artjs.Ajax.Methods.GET, artjs.Ajax.Methods.POST];
