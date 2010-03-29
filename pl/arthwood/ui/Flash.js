ArtJs.Flash = pl.arthwood.ui.Flash = function() {
  this.flash = ArtJs.$('flash');
  this.image = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.flash, 'img'));
  this.span = ArtJs.ArrayUtils.first(ArtJs.Selector.down(this.flash, 'span'));
  
  this.fade = new ArtJs.Fade(this.flash, 1, 0, 0.05);
  this.fade.onFinish.add($D(this, this.onFadeFinish));
  this.flash.onclick = ArtJs.$DC(this, this.onFlashClick);
  
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
    ArtJs.ElementUtils.show(this.flash);
    ArtJs.ElementUtils.centerH(this.flash);
    ArtJs.ElementUtils.setAlpha(this.flash, 1);
    
    var code = 'Flash.findById(' + this._id + ').hide()';
    
    this._intervalId = setInterval(code, 5000);
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
    ArtJs.ElementUtils.hide(this.flash);
    this.span.innerHTML = null;
    this.image.src = '/images/blank.png';
  },
  
  onFlashClick: function(e) {
    if (this._intervalId) {
      this.hide();
    }
    
    return false;
  }
};

ArtJs.Flash.instances = new Array();
