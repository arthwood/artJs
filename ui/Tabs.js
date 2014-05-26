artjs.Tabs = artjs.ui.Tabs = artjs.Class(
  function(tabs, screens, onTabOn, onTabOff) {
    this.locked = false;
    this.tabs = tabs;
    this.tabScreenManager = new artjs.ScreenManager(screens, true);
    this.tabOverToggler = new artjs.ClassToggler('over');
    this.tabSelectToggler = new artjs.ClassToggler('active');
    this.tabSelectToggler.onActivate.add(artjs.$D(this, this.onTab));
    this.onTabOnCallback = onTabOn;
    this.onTabOffCallback = onTabOff;
    this.onTabOverD = artjs.$D(this, this.onTabOver);
    this.onTabOutD = artjs.$D(this, this.onTabOut);
    this.onTabClickD = artjs.$D(this, this.onTabClick);
    this.updateTabCursorBind = artjs.$DC(this, this.updateTabCursor);
    
    artjs.ArrayUtils.each(this.tabs, this.eachTab, this);
    
    this.setTabAt(0);
  },
  {
    eachTab: function(tab) {
      var mc = new artjs.MouseController(tab);
      
      artjs.on(tab, 'mouseover', this.onTabOverD);
      artjs.on(tab, 'mouseout', this.onTabOutD);
      artjs.on(tab, 'click', this.onTabClickD);
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
      
      this.tabScreenManager.setScreenAt(artjs.ArrayUtils.indexOf(this.tabs, ct.getCurrent()));
      
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
      artjs.ArrayUtils.each(this.tabs, this.updateTabCursorBind);
    },
    
    updateTabCursor: function(tab) {
      artjs.ElementUtils.setStyle(tab, {cursor: this.locked ? 'wait' : ''});
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
  }
);  
