var ArtJs = {
  CLIENT_MAPPING: {
    'Microsoft Internet Explorer': 'ie',
    'Netscape': 'ff',
    'Opera': 'ff'
  },
  
  VERSION: '1.0',
  
  globalize: function() {
    var copy = this.ObjectUtils.copy(this);
  
    delete copy.globalize;
    delete copy.doInjection;
    delete copy.extendClient;
    delete copy.CLIENT_MAPPING;
    delete copy.VERSION;
    delete copy.CLIENT;
  
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
    com.arthwood.tween.Reveal.doInjection();
    com.arthwood.tween.Fade.doInjection();
  },
  
  extendClient: function(obj) {
    this.ObjectUtils.extend(obj, obj[this.CLIENT]);
  }
};

ArtJs.CLIENT = ArtJs.CLIENT_MAPPING[navigator.appName];

var com = {
  arthwood: {
    data: {},
    dom: {},
    events: {},
    math: {},
    modules: {},
    net: {},
    tween: {},
    ui: {
      containers: {}
    },
    utils: {}
  }
};
