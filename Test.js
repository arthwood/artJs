window.onload = function() {
  var clock = new Clock($DC(this, this.onTick, true), 200, 40);

  clock.trigger(true);
};

function onTick(clock_) {
  p('tick# ' + clock_.getCounter());
}