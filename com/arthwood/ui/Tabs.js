ArtJs.Tabs = com.arthwood.ui.Tabs = function(tabs, screens, onTabOn, onTabOff) {
  this.locked = false;
  this.tabs = tabs;
  this.tabScreenManager = new ArtJs.ScreenManager(screens, true);
  this.tabOverToggler = new ArtJs.ClassToggler('over');
  this.tabSelectToggler = new ArtJs.ClassToggler('active');
  this.tabSelectToggler.onActivate.add(ArtJs.$D(this, this.onTab));
  this.onTabOnCallback = onTabOn;
  this.onTabOffCallback = onTabOff;
  this.onTabOverD = ArtJs.$D(this, this.onTabOver);
  this.onTabOutD = ArtJs.$D(this, this.onTabOut);
  this.onTabClickD = ArtJs.$D(this, this.onTabClick);
  this.updateTabCursorBind = ArtJs.$DC(this, this.updateTabCursor);
  ArtJs.ArrayUtils.each(this.tabs, ArtJs.$DC(this, this.eachTab));
  this.setTabAt(0);
};

ArtJs.Tabs.prototype = {
  eachTab: function(tab) {
    var mc = new ArtJs.MouseController(tab);
    
    mc.onOver.add(this.onTabOverD);
    mc.onOut.add(this.onTabOutD); 
    mc.onClick.add(this.onTabClickD); 
  },
  
  onTabOver: function(e, mc) {
    this.tabOverToggler.toggle(mc.getTargets(e).current);
  },
  
  onTabOut: function(e, mc) {
    this.tabOverToggler.toggle(null);
  },
  
  onTabClick: function(e, mc) {
    if (!this.locked) {
      this.tabSelectToggler.toggle(mc.getTargets(e).current);
    }
    
    e.preventDefault();
  },
  
  onTab: function(ct) {
    if (this.onTabOffCallback) this.onTabOffCallback(this);
    
    this.tabScreenManager.setScreenAt(ArtJs.ArrayUtils.indexOf(this.tabs, ct.getCurrent()));
    
    if (this.onTabOnCallback) this.onTabOnCallback(this);
  },
  
  currentIndex: function() {
    return this.tabScreenManager.index;
  },
  
  currentTab: function() {
    return this.tabSelectToggler.current;
  },
  
  currentScreen: function() {
    return this.tabScreenManager.screen;
  },
  
  setTabAt: function(i) {
    this.setTab(this.tabs[i]);
  },
  
  setTab: function(tab) {
    this.tabSelectToggler.toggle(tab);
  },
  
  next: function() {
    var ci = this.currentIndex();
    
    if (ci < this.tabs.length - 1) {
      this.tabSelectToggler.toggle(this.tabs[ci + 1]);
    }
  },
  
  prev: function() {
    var ci = this.currentIndex();
    
    if (ci > 0) {
      this.tabSelectToggler.toggle(this.tabs[ci - 1]);
    }
  },
  
  setLocked: function(locked) {
    this.locked = locked;
    ArtJs.ArrayUtils.each(this.tabs, this.updateTabCursorBind);
  },
  
  updateTabCursor: function(tab) {
    ArtJs.ElementUtils.setStyle(tab, {cursor: this.locked ? 'wait' : ''});
  },
  
  lock: function() {
    this.setLocked(true);
  },
  
  unlock: function() {
    this.setLocked(false);
  },
  
  length: function() {
    return this.tabs.length;
  }
};

