artjs.DateUtils = artjs.utils.Date = {
  _name: 'DateUtils',
  
  toString: function() {
    return this._name; 
  },
  
  getTime: function() {
    return (new Date()).getTime();
  },

  monthDaysNum: function(date) {
    var d = this.copy(date);
    
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    
    return d.getDate();
  },
  
  firstDate: function(date) {
    var d = this.copy(date);
    
    d.setDate(1);
    
    return d;
  },
  
  firstDay: function(date) {
    return this.firstDate(date).getDay();
  },
  
  toHMS: function(date, separator) {
    var su = artjs.StringUtils;
    
    separator = separator || ':';
    
    return su.addZeros(date.getHours().toString(), 2, false) + 
      separator + su.addZeros(date.getMinutes().toString(), 2, false) + 
      separator + su.addZeros(date.getSeconds().toString(), 2, false);
  },
  
  toYMD: function(date, separator) {
    var su = artjs.StringUtils;
    
    separator = separator || '-';
    
    return date.getFullYear() +
      separator + su.addZeros((date.getMonth() + 1).toString(), 2, false) +
      separator + su.addZeros(date.getDate().toString(), 2, false);
  },
  
  toDMY: function(date, separator) {
    separator = separator || '-';
    
    var ymd = this.toYMD(date, separator);
    var arr = ymd.split(separator);
    
    arr.reverse();
    
    return arr.join(separator);
  },
  
  fromYMD: function(str, separator) {
    separator = separator || '-';
    
    var arr = str.split(separator);
    var au = artjs.ArrayUtils;
    
    return new Date(parseInt(au.first(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.third(arr), 10));
  },

  fromDMY: function(str, separator) {
    separator = separator || '-';

    var arr = str.split(separator);
    var au = artjs.ArrayUtils;

    return new Date(parseInt(au.third(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.first(arr), 10));
  },

  minutesToHM: function(minutes, separator) {
    separator = separator || ':';
    
    return Math.floor(minutes / 60) + separator + artjs.StringUtils.addZeros((minutes % 60).toString(), 2);
  },
  
  hmToMinutes: function(hm, separator) {
    separator = separator || ':';
    
    var arr = hm.split(separator);
  
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  
  secondsToMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    var su = artjs.StringUtils;
    
    separator = separator || ':';
    
    return su.addZeros(minutes.toString(), 2) + separator + su.addZeros(seconds.toString(), 2);
  },
  
  msToSeconds: function(ms, separator) {
    separator = separator || ':';
    
    var arr = ms.split(separator);
    
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  
  secondsToHMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    
    separator = (separator || ':');
    
    return this.minutesToHM(minutes, separator) + separator + artjs.StringUtils.addZeros(seconds.toString(), 2);
  },

  miliToHMSM: function(v) {
    var mili = v % 1000;
    var totalSeconds = (v - mili) / 1000;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes % 60;
    var totalHours = (totalMinutes - minutes) / 60;
    var hours = totalHours;

    return hours.toString() +
      ':' +
      artjs.StringUtils.addZeros(minutes.toString(), 2) +
      ':' +
      artjs.StringUtils.addZeros(seconds.toString(), 2) +
      '.' +
      artjs.StringUtils.addZeros(mili.toString(), 3);
  },

  miliToMSM: function(v) {
    var mili = v % 1000;
    var totalSeconds = (v - mili) / 1000;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes;

    return minutes.toString() +
      ':' +
      artjs.StringUtils.addZeros(seconds.toString(), 2) +
      '.' +
      artjs.StringUtils.addZeros(mili.toString(), 3);
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
  }
};
