artjs.Date = artjs.utils.Date = {
  _name: 'Date',
  
  copy: function(date) {
    return new Date(date);
  },

  firstDate: function(date) {
    var d = this.copy(date);
    
    d.setDate(1);
    
    return d;
  },
  
  firstDay: function(date) {
    return this.firstDate(date).getDay();
  },

  fromDMY: function(str, separator) {
    separator = separator || '-';

    var arr = str.split(separator);
    var au = artjs.Array;

    return new Date(parseInt(au.third(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.first(arr), 10));
  },

  fromYMD: function(str, separator) {
    separator = separator || '-';
    
    var arr = str.split(separator);
    var au = artjs.Array;
    
    return new Date(parseInt(au.first(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.third(arr), 10));
  },
  
  getDateShifted: function (date, days) {
    var dateCopy = this.copy(date);
  
    dateCopy.setDate(date.getDate() + days);
  
    return dateCopy;
  },
  
  getTime: function() {
    return (new Date()).getTime();
  },
  
  hmToMinutes: function(hm, separator) {
    separator = separator || ':';
    
    var arr = hm.split(separator);
  
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  
  minutesToHM: function(minutes, separator) {
    separator = separator || ':';
    
    return Math.floor(minutes / 60) + separator + artjs.String.addZeros((minutes % 60).toString(), 2);
  },
  
  monthDaysNum: function(date) {
    var d = this.copy(date);
    
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    
    return d.getDate();
  },
  
  msToHMSM: function(v) {
    var mili = v % 1000;
    var totalSeconds = (v - mili) / 1000;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes % 60;
    var totalHours = (totalMinutes - minutes) / 60;
    var hours = totalHours;

    return hours.toString() +
      ':' +
      artjs.String.addZeros(minutes.toString(), 2) +
      ':' +
      artjs.String.addZeros(seconds.toString(), 2) +
      '.' +
      artjs.String.addZeros(mili.toString(), 3);
  },

  msToMSM: function(v) {
    var mili = v % 1000;
    var totalSeconds = (v - mili) / 1000;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes;

    return minutes.toString() +
      ':' +
      artjs.String.addZeros(seconds.toString(), 2) +
      '.' +
      artjs.String.addZeros(mili.toString(), 3);
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
    
    return this.minutesToHM(minutes, separator) + separator + artjs.String.addZeros(seconds.toString(), 2);
  },
  
  secondsToMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    var su = artjs.String;
    
    separator = separator || ':';
    
    return su.addZeros(minutes.toString(), 2) + separator + su.addZeros(seconds.toString(), 2);
  },
  
  stripDayTime: function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },
  
  toDMY: function(date, separator) {
    separator = separator || '-';
    
    var ymd = this.toYMD(date, separator);
    var arr = ymd.split(separator);
    
    arr.reverse();
    
    return arr.join(separator);
  },
  
  toHMS: function(date, separator) {
    var su = artjs.String;
    
    separator = separator || ':';
    
    return su.addZeros(date.getHours().toString(), 2, false) + 
      separator + su.addZeros(date.getMinutes().toString(), 2, false) + 
      separator + su.addZeros(date.getSeconds().toString(), 2, false);
  },
  
  toString: function() {
    return this._name; 
  },
  
  toYMD: function(date, separator) {
    var su = artjs.String;
    
    separator = separator || '-';
    
    return date.getFullYear() +
      separator + su.addZeros((date.getMonth() + 1).toString(), 2, false) +
      separator + su.addZeros(date.getDate().toString(), 2, false);
  }
};
