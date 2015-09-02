artjs.ScreenManager = artjs.ui.ScreenManager = function(screens, dontShow) {
  if (screens.length == 0) {
    throw new Error('ScreenManager: invalid args');
  }
  
  this.screens = screens;
  this.hideAll();
  
  if (!dontShow) {
    this.setScreenAt(0);
  }
};

artjs.ScreenManager.prototype = {
  next: function() {
    this.index = Math.min(this.index + 1, this.screens.length);
    this.switchScreens();
  },
  
  prev: function() {
    this.index = Math.max(this.index - 1, 0);
    this.switchScreens();
  },
  
  switchScreens: function() {
    if (this.screen) {
      this.hideScreen(this.screen);
    }
    this.screen = this.screens[this.index];
    this.showScreen(this.screen);
  },
  
  hideAll: function() {
    this.screens.each(this.hideScreen);
  },
  
  showAll: function() {
    this.screens.each(this.showScreen);
  },
  
  setScreenAt: function(i) {
    this.index = artjs.Math.limit(i, 0, this.screens.length);
    this.switchScreens();
  },
  
  setScreen: function(screen) {
    var idx = this.screens.indexOf(screen);
    
    if (idx == -1) {
      throw new Error('ScreenManager: cannot set Screen ' + screen + ' as it is not included in screens collection.');
    }
    this.setScreenAt(idx);
  },
  
  showScreen: function(screen) {
    artjs.Element.show(screen);
  },
  
  hideScreen: function(screen) {
    artjs.Element.hide(screen);
  }
};
