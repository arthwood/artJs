var QueuedClock = pl.arthwood.events.QueuedClock = function(interval_) {
  this._interval = interval_;
  this._queue = new Queue();
  this._triggerDelegate = $DC(this, this.trigger);
};

QueuedClock.prototype.trigger = function() {
  if (!this.isBusy()) {
    return;
  }

  var element = this._queue.getItem();

  element();

  Clock.fire(this._triggerDelegate, this._interval, 1);
};

QueuedClock.prototype.addCall = function(delegate_) {
  this._queue.addItem(delegate_);

  this.trigger();
};

QueuedClock.prototype.isBusy = function() {
  return !this._queue.isEmpty();
};

QueuedClock.prototype.getLength = function() {
  return this._queue.getLength();
};
