artjs.utils.component.Sweeper = artjs.ComponentSweeper = {
  INTERVAL: 1000,
  
  init: function() {
    var sweep = artjs.$D(this, '_onSweep');
    var clock = new artjs.Clock(this.INTERVAL);
    
    clock.onChange.add(sweep);
    
    clock.start();
    
    artjs.$T(sweep, 100);
  },
  
  _onSweep: function() {
    this._sweepSubclasses(artjs.Component);
  },
  
  _sweepSubclasses: function(componentClass) {
    artjs.Array.each(componentClass.subclasses, this._sweep, this);
  },
  
  _sweep: function(i) {
    var instances = artjs.Array.partition(i.instances, this._isOnStage, this);

    artjs.Array.invoke(instances.y, '_destroy');
    
    i.instances = instances.x;
    
    this._sweepSubclasses(i);
  },
  
  _isOnStage: function(i) {
    return artjs.Selector.isOnStage(i.getElement());
  }
};
