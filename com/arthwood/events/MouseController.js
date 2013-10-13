ArtJs.MouseController = com.arthwood.events.MouseController = function(e) {
  this.onOver = new ArtJs.CustomEvent('MouseController::onOver');
  this.onOut = new ArtJs.CustomEvent('MouseController::onOut');
  this.onClick = new ArtJs.CustomEvent('MouseController::onClick');
  
  this._attachEvents(e);
  
  this.element = e;
  this.over = false;
  
  arguments.callee.instances.push(this);
};

ArtJs.MouseController.prototype = {
  _onOver: function(e) {
    if (ArtJs.EventUtils.edge(this.getTargets(e, true)) && !this.over) {
      this.over = true;
      this.onOver.fire(e, this);
    }
  },
  
  _onOut: function(e) {
    if (ArtJs.EventUtils.edge(this.getTargets(e, false)) && this.over) {
      this.over = false;
      this.onOut.fire(e, this);
    }
  },
  
  _onClick: function(e) {
    this.onClick.fire(e, this);
  },
  
  getIdentifier: function() {
    return this.element;
  },
  
  ff: {
    _attachEvents: function() {
      e.addEventListener('mouseover', ArtJs.$DC(this, this._onOver), false);
      e.addEventListener('mouseout', ArtJs.$DC(this, this._onOut), false);
      e.addEventListener('click', ArtJs.$DC(this, this._onClick), false);
    },
    
    getTargets: function(e, over) {
      return {origin: e.target, current: e.currentTarget, related: e.relatedTarget};
    }
  },
  
  ie: {
    _attachEvents: function() {
      e.attachEvent('onmouseover', ArtJs.$DC(this, this._onOver));
      e.attachEvent('onmouseout', ArtJs.$DC(this, this._onOut));
      e.attachEvent('onclick', ArtJs.$DC(this, this._onClick));
    },
    getTargets: function(e, over) {
      var originRelated = [e.fromElement, e.toElement];

      if (over) originRelated.reverse();

      return {origin: originRelated[0], current: this.element, related: originRelated[1]};
    }
  }
};

ArtJs.extendClient(ArtJs.MouseController.prototype);

ArtJs.Locator.init(ArtJs.MouseController);
