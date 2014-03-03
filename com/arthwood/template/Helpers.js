ArtJs.TemplateHelpers = com.arthwood.template.Helpers = {
  list: function(items) {
    var ul = ArtJs.$B('ul');
    
    return ArtJs.ArrayUtils.map(items, this.renderItem, this).toString();
  },
  
  renderItem: function(i) {
    return ArtJs.$B('li', null, i.render()).toString();
  }
};
