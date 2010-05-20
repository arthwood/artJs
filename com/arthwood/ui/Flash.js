ArtJs.Flash = com.arthwood.ui.Flash = function(delay) {
  this.node = ArtJs.$('flash');
  this.image = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.node, 'img'));
  this.span = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.node, 'span'));
  
  this.fade = new ArtJs.Fade(this.node, 1, 0);
  this.fade.onFinish.add($D(this, this.onFadeFinish));
  this.node.onclick = ArtJs.$DC(this, this.onFlashClick);
  this.delay = (delay || 6) * 1000;
  
  var visible = !ArtJs.StringUtils.empty(this.span.innerHTML);
  var instances = arguments.callee.instances;
  
  this._id = instances.length;
  
  instances.push(this);
  
  if (visible) {
    this.display();
  }
};

ArtJs.ObjectUtils.extend(ArtJs.Flash, {
  findById: function(id_) {
    this.found.id = id_;
    
    return ArtJs.ArrayUtils.detect(this.instances, this.found);
  },
  
  found: function(i) {
    return arguments.callee.id == i.getId();
  }
});

ArtJs.Flash.prototype = {
  show: function(type, message) {
    this.image.src = '/images/flash/' + type + '.png';
    this.span.innerHTML = message;
    this.display();
  },
  
  display: function() {
    this.fade.stop();
    this.clearDelay();
    ArtJs.ElementUtils.show(this.node);
    ArtJs.ElementUtils.centerH(this.node);
    ArtJs.ElementUtils.setY(this.node, 0.2 * ArtJs.ElementUtils.getWindowSize().y);
    ArtJs.ElementUtils.setAlpha(this.node, 1);
    
    var code = 'Flash.findById(' + this._id + ').hide()';
    
    this._intervalId = setInterval(code, this.delay);
  },
  
  hide: function() {
    this.clearDelay()
    this.fade.start();
  },
  
  clearDelay: function() {
    clearInterval(this._intervalId);
    
    this._intervalId = null;
  },
  
  getId: function() {
    return this._id;
  },
  
  onFadeFinish: function(arg) {
    ArtJs.ElementUtils.hide(this.node);
    this.span.innerHTML = null;
    this.image.src = '/images/flash/blank.png';
  },
  
  onFlashClick: function(e) {
    if (this._intervalId) {
      this.hide();
    }
    
    return false;
  }
};

ArtJs.Flash.instances = new Array();
