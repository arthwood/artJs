ArtJs.Locator = com.arthwood.modules.Locator = {
  init: function(object) {
    object.instances = new Array();
    ArtJs.ObjectUtils.extend(object, this.extensions);
  },
  
  extensions: {
    find: function(i) {
      this.found.identifier = i;
    
      return ArtJs.ArrayUtils.detect(this.instances, this.found);
    },
  
    found: function(i) {
      return i.getIdentifier() == arguments.callee.identifier;
    }
  }
};
