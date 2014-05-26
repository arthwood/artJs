artjs.Timeline = artjs.events.Timeline = artjs.Class(
  null, 
  {
    mark: function() {
      this._t2 = artjs.DateUtils.getTime();
      
      var interval = this._t2 - (this._t1 || this._t2);
      
      this._t1 = this._t2;
      
      return interval;
    }
  }
);
