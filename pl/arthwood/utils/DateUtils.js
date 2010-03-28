ArtJs.DateUtils = pl.arthwood.utils.DateUtils = {
  INJECTED_PROPS: ['monthDaysNum', 'firstDay'],
  
  init: function() {
    this.injected = false;
  },
  
  ownProperty: function(property) {
    return !this.injected || !ArtJs.DateUtils.include(this.INJECTED_PROPS, property);
  },
  
  monthDaysNum: function(date) {
    var d = new Date(date);
    
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    
    return d.getDate();
  },
  
  firstDay: function(date) {
    var d = new Date(date);
    
    d.setDate(1);
    
    return d.getDay();
  },
  
  doInjection: function() {
    var proto = Date.prototype;
    var dc = ArtJs.$DC;
    
    proto.monthDaysNum = dc(this, this.monthDaysNum, true);
    proto.firstDay = dc(this, this.firstDay, true);
    
    this.injected = true;
  }
};
