artjs.QueuedClock = artjs.events.QueuedClock = artjs.Class(
  function(interval) {
    this.interval = interval;
    this.queue = new artjs.Queue();
    this.clock = new artjs.Clock(this.interval);
    this.clock.onChange.add(artjs.Delegate(this, 'start'));
  }, 
  {
    start: function() {
      if (this.queue.isEmpty()) {
        this.clock.stop();
      }
      else {
        this.queue.getItem().invoke();
      }
    },
    
    addItem: function(i) {
      this.queue.addItem(i);
    
      if (!this.clock.isRunning()) {
        this.clock.start(true);
      }
    },
    
    getLength: function() {
      return this.queue.getLength();
    },
    
    isBusy: function() {
      return !this.queue.isEmpty();
    }
  }
);
