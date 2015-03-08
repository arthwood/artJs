artjs.Locator = artjs.module.Locator = {
  register: function(object) {
    object.instances = [];
    
    artjs.Object.extend(object, this.extensions);
  },
  
  extensions: {
    find: function(i) {
      this.identifier = i;
      
      return artjs.Array.detect(this.instances, this.found, this);
    },
  
    found: function(i) {
      return i.getIdentifier() == this.identifier;
    }
  }
};
