ArtJs.Locator = com.arthwood.module.Locator = {
  register: function(object) {
    object.instances = [];
    
    ArtJs.ObjectUtils.extend(object, this.extensions);
  },
  
  extensions: {
    find: function(i) {
      this.identifier = i;
      
      return ArtJs.ArrayUtils.detect(this.instances, this.found, this);
    },
  
    found: function(i) {
      return i.getIdentifier() == this.identifier;
    }
  }
};
