ArtJs.Flash = com.arthwood.ui.Flash = function(element, path, delay, position) {
  this.element = element;
  this.image = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.element, 'img'));
  this.span = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.element, 'span'));
  this.path = path;
  this.fade = new ArtJs.Fade(this.element, - 0.05);
  this.fade.onComplete.add(ArtJs.$D(this, this.onFadeComplete));
  this.element.onclick = ArtJs.$DC(this, this.onFlashClick);
  this.delay = (delay || 6) * 1000;
  this.position = position || 0.2;
  
  var visible = !ArtJs.StringUtils.empty(ArtJs.ElementUtils.getContent(this.span));
  var instances = arguments.callee.instances;
  
  this.id = instances.length;
  
  instances.push(this);
  
  if (visible) { this.display(); }
};

ArtJs.Flash.prototype = {
  show: function(type, message) {
    this.image.src = this.path + '/' + type + '.png';
    this.span.innerHTML = message;
    this.display();
  },
  
  display: function() {
    var eu = ArtJs.ElementUtils;
    
    this.fade.stop();
    this.clearDelay();
    eu.show(this.element);
    eu.centerH(this.element);
    eu.setY(this.element, eu.getScrollPosition().y + this.position * eu.getWindowSize().y);
    eu.setAlpha(this.element, 1);
    
    var code = 'Flash.find(' + this.id + ').hide()';
    
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
    ArtJs.ElementUtils.hide(this.element);
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

ArtJs.Locator.init(ArtJs.Flash);
