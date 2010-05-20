var com = {
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
    var copy = this.ObjectUtils.copy(this);
    
    delete copy.globalize;
    delete copy.doInjection;
    delete copy.VERSION;
    
    this.ObjectUtils.copyProps(copy, window);
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
