artjs.Blind = artjs.transition.Blind = artjs.Class(
  function() {
    this.super(arguments, 'height');
  },
  {
    _setStyle: function(value) {
      this.super(arguments, value + 'px');
      
      artjs.ElementUtils.setStyle(this.element, 'overflow', 'hidden');
    }
  },
  {
    toggle: function (e, value, duration, type, delay) {
      var v = e.style.height == '0px' ? value : 0;
      
      this.run(e, v, duration, type, delay);
    }
  },
  artjs.TransitionBase
);
