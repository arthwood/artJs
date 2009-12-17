window.onload = function() {
  this.onTickDelegate = $DC(this, this.onTick, true);
  this.qc = new QueuedClock(2000);
  ArrayUtils.first($$('.box')).onclick = $DC(this, this.onClick);
};

function onClick() {
  this.qc.addCall(this.onTickDelegate);
}

function onTick(source) {
  p('tick ' + source);
}