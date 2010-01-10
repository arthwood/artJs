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
  VERSION: '1.0',
  globalize: function() {
    this.ObjectUtils.copyProps(this, window);
  },
  doInjection: function() {
    this.ArrayUtils.doInjection();
    this.ObjectUtils.doInjection();
    this.Selector.doInjection();
  }
};
