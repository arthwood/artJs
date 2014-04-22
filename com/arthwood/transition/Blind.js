ArtJs.Blind = com.arthwood.transition.Blind = ArtJs.Class(
  function() {
    this.super(arguments, 'height');
  },
  {
    _setStyle: function(value) {
      this.super(arguments, value + 'px');
      
      ArtJs.ElementUtils.setStyle(this.element, 'overflow', 'hidden');
    }
  },
  {
    toggle: function (e, value, duration, type, delay) {
      var v = e.style.height == '0px' ? value : 0;
      
      this.run(e, v, duration, type, delay);
    },
  
    doInjection: function () {
      var proto = Element.prototype;
  
      proto.blindToggle = ArtJs.$DC(this, this.toggle, true);
      proto.blindTo = ArtJs.$DC(this, this.run, true);
    }
  },
  ArtJs.TransitionBase
);
