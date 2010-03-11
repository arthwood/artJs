var pl = {
  arthwood: {
    data: {},
    dom: {},
    events: {},
    math: {},
    net: {},
    ui: {
      containers: {}
    },
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
    this.StringUtils.doInjection();
    this.Selector.doInjection();
    this.ElementUtils.doInjection();
    this.Delegate.doInjection();
  }
};
