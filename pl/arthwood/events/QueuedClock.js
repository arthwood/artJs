var QueuedClock = pl.arthwood.events.QueuedClock = function(interval_) {
  this._busy = false;
  this._interval = interval_;
  this._queue = new Queue();
  this._startDelegate = $DC(this, this._start);
  this.clock = new Clock(this._startDelegate, this._interval);
};

QueuedClock.prototype._start = function() {
  if (this._queue.isEmpty()) {
    this.clock.stop();
  }
  else {
    this._queue.getItem()();
  }
};

QueuedClock.prototype.addCallback = function(i_) {
  this._queue.addItem(i_);

  if (!this.clock.isRunning()) {
    this.clock.start(true);
  }
};
