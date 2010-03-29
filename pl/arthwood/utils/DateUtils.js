ArtJs.DateUtils = pl.arthwood.utils.DateUtils = {
  INJECTED_PROPS: ['monthDaysNum', 'firstDay', 'toHFM', 'toYMD', 'toDMY', 'minutesToHM', 'hmToMinutes', 'secondsToMS',
    'secondsToHMS', 'copy', 'getDateShifted', 'stripDayTime'
  ],
  
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
  
  toHFM: function(date, separator) {
    var su = ArtJs.StringUtils;
    
    separator = separator || ':';
    
    return su.addZeros(date.getHours().toString(), 2) + 
      separator + su.addZeros(date.getMinutes().toString(), 2) + 
      separator + su.addZeros(date.getSeconds().toString(), 2);
  },
  
  toYMD: function(date, separator) {
    var su = ArtJs.StringUtils;
    
    separator = separator || '/';
    
    return date.getFullYear()
      + separator + su.addZeros((date.getMonth() + 1).toString(), 2)
      + separator + su.addZeros(date.getDate().toString(), 2);
  },
  
  toDMY: function(date, separator) {
    var ymd = this.toYMD(date, separator);;
    var arr = ymd.split(separator).reverse();
    
    return arr.join(separator);
  },
  
  minutesToHM: function(minutes, separator) {
    separator = separator || ':';
    
    return Math.floor(minutes / 60) + separator + ArtJs.StringUtils.addZeros((minutes % 60).toString(), 2);
  },
  
  hmToMinutes: function(hm) {
    var arr = hm.split(':');
  
    return 60*arr[0] + arr[1];
  },
  
  secondsToMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    var su = ArtJs.StringUtils;
    
    separator = separator || ':';
    
    return su.addZeros(minutes.toString(), 2) + separator + su.addZeros(seconds.toString(), 2);
  },
  
  secondsToHMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    
    separator = (separator || ':');
    
    return this.minutesToHM(minutes, separator) + separator + ArtJs.StringUtils.addZeros(seconds.toString(), 2);
  },

  /**
   * Overrides ObjectUtils.copy if injected.
   */
  copy: function(date) {
    return new Date(date);
  },
  
  getDateShifted: function (date, days) {
    var dateCopy = this.copy(date);
  
    dateCopy.setDate(date.getDate() + days);
  
    return dateCopy;
  },
  
  stripDayTime: function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },

  doInjection: function() {
    var proto = Date.prototype;
    var dc = ArtJs.$DC;
    
    proto.monthDaysNum = dc(this, this.monthDaysNum, true);
    proto.firstDay = dc(this, this.firstDay, true);
    proto.toHFM = dc(this, this.toHFM, true);
    proto.toYMD = dc(this, this.toYMD, true);
    proto.toDMY = dc(this, this.toDMY, true);
    proto.minutesToHM = dc(this, this.minutesToHM, false);
    proto.hmToMinutes = dc(this, this.hmToMinutes, false);
    proto.secondsToMS = dc(this, this.secondsToMS, false);
    proto.copy = dc(this, this.copy, true);
    proto.getDateShifted = dc(this, this.getDateShifted, true);
    proto.stripDayTime = dc(this, this.stripDayTime, true);
    
    this.injected = true;
  }
};
