var ArtJs = {
  VERSION: '2.0',
  
  name: 'ArtJs',
  
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
    this.Delegate.doInjection();
    this.Blind.doInjection();
  }
};

var com = {
  arthwood: {
    data: {
      tree: {}
    },
    dom: {},
    events: {},
    math: {},
    module: {},
    net: {},
    spec: {
      matchers: {}
    },
    template: {},
    transition: {},
    ui: {},
    utils: {}
  }
};
