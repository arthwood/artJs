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
    if (ArtJs.EventUtils.edge(this._getTargets(e, true)) && !this.over) {
      this.over = true;
      this.onOver.fire(e, this);
    }
  },
  
  _onOut: function(e) {
    if (ArtJs.EventUtils.edge(this._getTargets(e, false)) && this.over) {
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
  

  _attachEvents: function(e) {
    var onOver = ArtJs.$DC(this, this._onOver);
    var onOut = ArtJs.$DC(this, this._onOut);
    var onClick = ArtJs.$DC(this, this._onClick);
    
    if (e.addEventListener) {
      e.addEventListener('mouseover', onOver, false);
      e.addEventListener('mouseout', onOut, false);
      e.addEventListener('click', onClick, false);
    }
    else {
      e.attachEvent('onmouseover', onOver);
      e.attachEvent('onmouseout', onOut);
      e.attachEvent('onclick', onClick);
    }
  },
    
  _getTargets: function(e, over) {
    if (e.target) {
      return {origin: e.target, current: e.currentTarget, related: e.relatedTarget};
    }
    else {
      var originRelated = [e.fromElement, e.toElement];

      if (over) originRelated.reverse();

      return {origin: originRelated[0], current: this.element, related: originRelated[1]};
    }
  }
};

ArtJs.Locator.register(ArtJs.MouseController);
