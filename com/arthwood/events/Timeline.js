ArtJs.Timeline = com.arthwood.events.Timeline = ArtJs.Class(
  null, 
  {
    mark: function() {
      this._t2 = ArtJs.DateUtils.getTime();
      
      var interval = this._t2 - (this._t1 || this._t2);
      
      this._t1 = this._t2;
      
      return interval;
    }
  }
);
