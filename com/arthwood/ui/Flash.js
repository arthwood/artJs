ArtJs.Flash = com.arthwood.ui.Flash = function(element, path, delay) {
  this.element = element;
  this.image = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.element, 'img'));
  this.span = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.element, 'span'));
  this.path = path;
  this.fade = new ArtJs.Fade(this.element, - 0.05);
  this.fade.onFinish.add(ArtJs.$D(this, this.onFadeFinish));
  this.element.onclick = ArtJs.$DC(this, this.onFlashClick);
  this.delay = (delay || 6) * 1000;
  
  var visible = !ArtJs.StringUtils.empty(this.span.innerHTML);
  var instances = arguments.callee.instances;
  
  this.id = instances.length;
  
  instances.push(this);
  
  visible && this.display();
};

ArtJs.ObjectUtils.extend(ArtJs.Flash, {
  findById: function(id) {
    this.found.id = id;
    
    return ArtJs.ArrayUtils.detect(this.instances, this.found);
  },
  
  found: function(i) {
    return arguments.callee.id == i.id;
  }
});

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
    eu.setY(this.element, 0.2 * ArtJs.ElementUtils.getWindowSize().y);
    eu.setAlpha(this.element, 1);
    
    var code = 'Flash.findById(' + this.id + ').hide()';
    
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
  
  onFadeFinish: function() {
    ArtJs.ElementUtils.hide(this.element);
    this.span.innerHTML = null;
    this.image.src = this.path + '/blank.png';
  },
  
  onFlashClick: function() {
    if (this.intervalId) {
      this.hide();
    }
    
    return false;
  }
};

ArtJs.Flash.instances = new Array();
