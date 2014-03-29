ArtJs.Ajax = com.arthwood.net.Ajax = ArtJs.Class(
  function(url, data, method) {
    this._onReadyStateChangeDC = ArtJs.$DC(this, this._onReadyStateChange, true);
    this._onProgressDC = ArtJs.$DC(this, this._onProgress, true);
    this._onErrorDC = ArtJs.$DC(this, this._onError, true);
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
      return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.GET, onSuccess);
    },
    
    post: function(url, data, onSuccess) {
      return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.POST, onSuccess);
    },
    
    put: function(url, data, onSuccess) {
      return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.PUT, onSuccess);
    },
    
    del: function(url, data, onSuccess) {
      return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.DELETE, onSuccess);
    },
    
    request: function(url, data, method, onSuccess) {
      var ajax = new ArtJs.Ajax(url, data, method);
      
      if (onSuccess) { ajax.onSuccess.add(onSuccess); }
      
      ajax.request();
      
      return ajax;
    }
  }
);

ArtJs.Ajax.SupportedMethods = [ArtJs.Ajax.Methods.GET, ArtJs.Ajax.Methods.POST];
  
ArtJs.$get = ArtJs.Ajax.get;
ArtJs.$post = ArtJs.Ajax.post;
ArtJs.$put = ArtJs.Ajax.put;
ArtJs.$del = ArtJs.Ajax.del;
