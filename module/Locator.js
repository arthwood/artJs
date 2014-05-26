artjs.Locator = artjs.module.Locator = {
  register: function(object) {
    object.instances = [];
    
    artjs.ObjectUtils.extend(object, this.extensions);
  },
  
  extensions: {
    find: function(i) {
      this.identifier = i;
      
      return artjs.ArrayUtils.detect(this.instances, this.found, this);
    },
  
    found: function(i) {
      return i.getIdentifier() == this.identifier;
    }
  }
};
