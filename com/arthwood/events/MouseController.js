ArtJs.MouseController = com.arthwood.events.MouseController = function(e) {
  this.onOver = new ArtJs.CustomEvent('MouseController::onOver');
  this.onOut = new ArtJs.CustomEvent('MouseController::onOut');
  
  e.addEventListener('mouseover', ArtJs.$DC(this, this._onOver), false);
  e.addEventListener('mouseout', ArtJs.$DC(this, this._onOut), false);
  
  this.element = e;
  this.over = false;
  
  var instances = arguments.callee.instances;
  
  instances.push(this);
};

ArtJs.MouseController.prototype = {
  _onOver: function(e) {
    if (ArtJs.EventUtils.edge(this.targets(e)) && !this.over) {
      this.over = true;
      this.onOver.fire(e, this);
    }
  },
  
  _onOut: function(e) {
    if (ArtJs.EventUtils.edge(this.targets(e)) && this.over) {
      this.over = false;
      this.onOut.fire(e, this);
    }
  },
  
  targets: function(e, over) {
    return {origin: e.target, current: e.currentTarget, related: e.relatedTarget};
  }
};

ArtJs.MouseController.instances = new Array();

ArtJs.ObjectUtils.extend(ArtJs.MouseController, {
  find: function(e) {
    this.found.element = e;
  
    return ArtJs.ArrayUtils.detect(this.instances, this.found);
  },

  found: function(i) {
    return arguments.callee.element == i.element;
  }
});
