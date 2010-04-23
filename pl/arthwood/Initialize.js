var pl = {
  arthwood: {
    data: {},
    dom: {},
    events: {},
    math: {},
    net: {},
    tween: {},
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
    
    delete window.globalize;
    delete window.doInjection;
    delete window.VERSION;
  },
  doInjection: function() {
    this.ArrayUtils.doInjection();
    this.ObjectUtils.doInjection();
    this.StringUtils.doInjection();
    this.DateUtils.doInjection();
    this.Selector.doInjection();
    this.ElementUtils.doInjection();
    this.EventUtils.doInjection();
    this.Delegate.doInjection();
  }
};
