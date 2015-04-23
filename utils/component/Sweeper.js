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
    var instances = artjs.Array.partition(artjs.Component.instances, this._isOnStage, this);

    artjs.Array.invoke(instances.y, '_destroy');
    
    artjs.Component.instances = instances.x;
  },
  
  _isOnStage: function(i) {
    return artjs.Selector.isOnStage(i.getElement());
  }
};
