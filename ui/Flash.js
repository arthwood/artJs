artjs.Flash = artjs.ui.Flash = function(element, path, delay, yPosition) {
  this.element = element;
  this.image = artjs.Selector.find(this.element, 'img');
  this.span = artjs.Selector.find(this.element, 'span');
  this.path = path;
  this.fade = new artjs.Fade(this.element, - 0.05);
  this.fade.onComplete.add(artjs.$D(this, this.onFadeComplete));
  this.element.onclick = artjs.$DC(this, this.onFlashClick);
  this.delay = (delay || 6) * 1000;
  this.yPosition = yPosition || 100;
  
  var visible = !artjs.StringUtils.isEmpty(artjs.ElementUtils.getContent(this.span));
  var instances = arguments.callee.instances;
  
  this.id = instances.length;
  
  instances.push(this);
  
  if (visible) { this.display(); }
};

artjs.Flash.prototype = {
  show: function(type, message) {
    this.image.src = this.path + '/' + type + '.png';
    this.span.innerHTML = message;
    this.display();
  },
  
  display: function() {
    var eu = artjs.ElementUtils;
    
    this.fade.stop();
    this.clearDelay();
    eu.show(this.element);
    eu.centerH(this.element);
    eu.setY(this.element, eu.getScrollPosition().y + this.yPosition);
    eu.setAlpha(this.element, 1);
    
    var code = 'Flash.findA(' + this.id + ').hide()';
    
    this.intervalId = setInterval(code, this.delay);
  },
  
  hide: function() {
    this.clearDelay();
    this.fade.setFinalState();
    this.fade.start();
  },
  
  clearDelay: function() {
    clearInterval(this.intervalId);
    
    this.intervalId = null;
  },
  
  onFadeComplete: function() {
    artjs.ElementUtils.hide(this.element);
    this.span.innerHTML = null;
    this.image.src = this.path + '/blank.png';
  },
  
  onFlashClick: function() {
    if (this.intervalId) {
      this.hide();
    }
    
    return false;
  },
  
  getIdentifier: function() {
    return this.id;
  }
};

artjs.Locator.register(artjs.Flash);
