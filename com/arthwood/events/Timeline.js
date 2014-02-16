ArtJs.Timeline = com.arthwood.events.Timeline = function() {
};

ArtJs.Timeline.prototype = {
  start: function() {
    this.t1 = ArtJs.DateUtils.getTime();
    this.markers = [];
  },
  
  mark: function() {
    this.t2 = ArtJs.DateUtils.getTime();
    
    this.markers.push();
    
    var interval = this.t2 - this.t1;
  
    this.t1 = this.t2;
  
    return interval;
  }
};
