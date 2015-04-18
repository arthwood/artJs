artjs.utils.component.Scanner = artjs.ComponentScanner = {
  _channel: new artjs.Channel('ComponentScanner'),
  
  scan: function(element) {
    artjs.Array.each(artjs.$findAll(element, '.art'), this._onFound, this);
  },
  
  addListener: function(id, delegate) {
    this._channel.addListener(id, delegate);
  },
  
  _onFound: function(i) {
    this.initElement(i);
  },
  
  initElement: function(i) {
    this._element = i;
    
    var classnames = artjs.Element.getClasses(i);
    
    artjs.Array.removeItem(classnames, 'art');
    artjs.Array.each(classnames, this._eachClassName, this);
  },
  
  _eachClassName: function(i) {
    this.instantiateClass(i, this._element);
  },
  
  instantiateClass: function(className, element) {
    var path = className.split('-');
    var _class = artjs.Array.inject(path, window, this._injectPathChunk, this);
    var instance = null;
    
    if (_class instanceof Function) {
      instance = new _class(element);
    
      var id = artjs.Element.getAttributes(instance.getElement()).id;
      
      if (id) {
        artjs.Component.register(id, instance);
        this._channel.fire(id, instance);
      }
    }
    
    return instance;
  },
  
  _injectPathChunk: function(result, i) {
    return result && result[i];
  }
};
