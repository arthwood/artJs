ArtJs.Blind = com.arthwood.transition.Blind = {
  EASE_IN_OUT: 'ease-in-out',

  blindToggle: function (e, value, duration, type, delay) {
    this.blindTo(e, e.style.height == '0px' ? value : 0, duration, type, delay);
  },

  blindTo: function (e, value, duration, type, delay) {
    var eu = ArtJs.ElementUtils;
    var baseStyle = {overflow: 'hidden', height: value + 'px'};
    var effectStyle = eu.transitionStyle('height', duration || 0.4, type || this.EASE_IN_OUT, delay || 0);

    eu.extendStyle(e, baseStyle);
    eu.extendStyle(e, effectStyle);
  },

  doInjection: function () {
    var proto = Element.prototype;

    proto.blindToggle = ArtJs.$DC(this, this.blindToggle, true);
    proto.blindTo = ArtJs.$DC(this, this.blindTo, true);
  }
};
