var pl = {
  arthwood: {
    data: {},
    dom: {},
    events: {},
    net: {},
    utils: {}
  }
};

var ArtJs = {
  globalize: function() {
    this.ObjectUtils.copyProps(this, window);
  },
  doInjection: function() {
    this.ArrayUtils.doInjection();
    this.ObjectUtils.doInjection();
  }
};
