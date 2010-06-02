ArtJs.MouseController = com.arthwood.events.MouseController = function(e) {
  this.onOver = new ArtJs.CustomEvent('MouseController::onOver');
  this.onOut = new ArtJs.CustomEvent('MouseController::onOut');
  
  e.addEventListener('mouseover', ArtJs.$DC(this, this._onOver), false);
  e.addEventListener('mouseout', ArtJs.$DC(this, this._onOut), false);
  
  this.element = e;
  this.over = false;
  
  arguments.callee.instances.push(this);
};

ArtJs.MouseController.prototype = {
  _onOver: function(e) {
    if (ArtJs.EventUtils.edge(this.getTargets(e)) && !this.over) {
      this.over = true;
      this.onOver.fire(e, this);
    }
  },
  
  _onOut: function(e) {
    if (ArtJs.EventUtils.edge(this.getTargets(e)) && this.over) {
      this.over = false;
      this.onOut.fire(e, this);
    }
  },
  
  getTargets: function(e) {
    return {origin: e.target, current: e.currentTarget, related: e.relatedTarget};
  },
  
  getIdentifier: function() {
    return this.element;
  }
};

ArtJs.Locator.init(ArtJs.MouseController);
