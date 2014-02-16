ArtJs.Locator = com.arthwood.modules.Locator = {
  register: function(object) {
    object.instances = [];
    
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
