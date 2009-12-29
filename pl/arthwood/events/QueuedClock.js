ArtJs.QueuedClock = pl.arthwood.events.QueuedClock = function(interval_) {
  this._busy = false;
  this._interval = interval_;
  this._queue = new ArtJs.Queue();
  this._startDelegate = ArtJs.$DC(this, this._start);
  this.clock = new ArtJs.Clock(this._startDelegate, this._interval);
};

ArtJs.QueuedClock.prototype._start = function() {
  if (this._queue.isEmpty()) {
    this.clock.stop();
  }
  else {
    this._queue.getItem()();
  }
};

ArtJs.QueuedClock.prototype.addCallback = function(i_) {
  this._queue.addItem(i_);

  if (!this.clock.isRunning()) {
    this.clock.start(true);
  }
};
