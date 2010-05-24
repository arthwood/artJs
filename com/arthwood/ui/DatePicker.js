ArtJs.DatePicker = com.arthwood.ui.DatePicker = function(firstDay) {
  this.items = ArtJs.$$('.datepicker');
  this.onImgDC = ArtJs.$DC(this, this.onImg);
  ArtJs.ArrayUtils.each(this.items, ArtJs.$DC(this, this.initField));
  this.calendar = new ArtJs.Calendar(firstDay);
};

ArtJs.DatePicker.prototype = {
  initField: function(item) {
    var input = ArtJs.ArrayUtils.first(ArtJs.Selector.down(item, 'input'));
    var img = ArtJs.ArrayUtils.first(ArtJs.Selector.down(item, 'img'));
    
    input.editable = false;
    img.onclick = this.onImgDC;
  },
  
  onImg: function(e) {
    var img = e.target;
    var imgRT = ArtJs.ElementUtils.getLayout(img).getRightTop();
    var position = imgRT.add(new ArtJs.Point(1, 1));
    
    if (this.calendar.isHidden()) {
      this.calendar.show(ArtJs.ElementUtils.prev(img), position);
    }
    else {
      this.calendar.hide();
    }
    
    return false;
  }
};

ArtJs.Calendar = com.arthwood.ui.Calendar = function(firstDay) {
  this.node = ArtJs.ArrayUtils.first(ArtJs.$$('.datepicker_calendar'));
  
  var arrows = ArtJs.Selector.down(this.node, '.nav a');
  
  this.prevMonth = arrows[0];
  this.nextMonth = arrows[1];
  this.prevMonth.onclick = ArtJs.$DC(this, this.onPrevMonth);
  this.nextMonth.onclick = ArtJs.$DC(this, this.onNextMonth);
  
  var selects = ArtJs.Selector.down(this.node, '.nav select');
  
  this.monthSelect = selects[0];
  this.yearSelect = selects[1];
  this.monthSelect.onchange = ArtJs.$DC(this, this.onMonthSelect);
  this.yearSelect.onchange = ArtJs.$DC(this, this.onYearSelect);
  
  this.headers = ArtJs.Selector.down(this.node, 'th');
  this.rows = ArtJs.Selector.down(this.node, 'tr').slice(1);
  this.items = ArtJs.Selector.down(this.node, 'td');
  this.updateHeaderDC = ArtJs.$DC(this, this.updateHeader);
  this.updateItemDC = ArtJs.$DC(this, this.updateItem);
  this.onItemDC = ArtJs.$DC(this, this.onItem);
  this.updateRowVisibilityDC = ArtJs.$DC(this, this.updateRowVisibility);
  ArtJs.ArrayUtils.each(this.items, ArtJs.$DC(this, this.initItem));
  this.field = null;
  this.firstDay = firstDay || 0;
  this.date = new Date();
  this.update();
};

ArtJs.Calendar.prototype = {
  DAYS: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  WEEKEND_DAYS: [6, 0],
  SEPARATOR: '-',
  VALID_CELL_BACKGROUND : 'none',
  WEEKEND_CELL_BACKGROUND : '#CFFFDF',
  INVALID_CELL_BACKGROUND : "url(/images/datepicker/backstripes.gif)",
      
  show: function(field, position) {
    this.field = field;
    
    var value = this.field.value;
    
    this.date = ArtJs.StringUtils.empty(value) ? new Date() : ArtJs.DateUtils.fromDMY(value, this.SEPARATOR);
    this.update();
    ArtJs.ElementUtils.setPosition(this.node, position);
    ArtJs.ElementUtils.show(this.node);
  },
  
  hide: function() {
    this.field = null;
    ArtJs.ElementUtils.hide(this.node);
  },
  
  isHidden: function() {
    return ArtJs.ElementUtils.isHidden(this.node);
  },
  
  update: function() {
    var au = ArtJs.ArrayUtils;
    var du = ArtJs.DateUtils;
    var mu = ArtJs.MathUtils;
    var monthFirstDate = du.firstDate(this.date);
    var monthFirstDay = monthFirstDate.getDay();
    var monthDaysNum = du.monthDaysNum(this.date);
    
    this.startIndex = mu.periodicLimit(monthFirstDay - this.firstDay, 0, 7);
    this.rowsNum = mu.stairs(this.startIndex + monthDaysNum - 1, 0, 7) + 1;
    this.monthSelect.value = this.date.getMonth() + 1;
    this.yearSelect.value = this.date.getFullYear();
    
    au.eachPair(this.rows, this.updateRowVisibilityDC);
    au.eachPair(this.headers, this.updateHeaderDC);
    au.eachPair(this.items, this.updateItemDC);
  },
  
  updateRowVisibility: function(idx, row) {
    ArtJs.ElementUtils.setVisible(row, idx < this.rowsNum);
  },
  
  updateHeader: function(idx, header) {
    var index = ArtJs.MathUtils.periodicLimit(this.firstDay + idx, 0, 7);
    
    ArtJs.ElementUtils.setContent(header, this.DAYS[index]);
  },
  
  updateItem: function(idx, item) {
    var day = new Date(this.date);
    
    day.setDate(idx - this.startIndex + 1);
    
    var value = day.getDate();
    var valid = (day.getMonth() == this.date.getMonth());
    var weekend = ArtJs.ArrayUtils.include(this.WEEKEND_DAYS, (idx + this.firstDay) % 7); 
    
    item.style.background = valid ? (weekend ? this.WEEKEND_CELL_BACKGROUND : this.VALID_CELL_BACKGROUND) : this.INVALID_CELL_BACKGROUND;
    item.className = (value == this.date.getDate()) ? 'selected' : '';
    ArtJs.ElementUtils.setClass(item, 'invalid', !valid);
    ArtJs.ElementUtils.setContent(item, value);
  },
  
  initItem: function(item) {
    item.onclick = this.onItemDC;
  },
  
  onItem: function(e) {
    var item = e.target;
    var value = ArtJs.ElementUtils.getContent(item);
    var valid = !ArtJs.ElementUtils.hasClass(item, 'invalid');
    
    if (valid) {
      this.date.setDate(parseInt(value));
      this.update();
      this.field.value = ArtJs.DateUtils.toDMY(this.date, this.SEPARATOR);
      this.hide();
    }
    
    return false;
  },
  
  onPrevMonth: function(e) {
    return this.onMonth(-1);
  },
  
  onNextMonth: function(e) {
    return this.onMonth(1);
  },
  
  onMonth: function(v) {
    this.date.setMonth(this.date.getMonth() + v);
    
    this.monthSelect.value = this.date.getMonth() + 1;
    this.yearSelect.value = this.date.getFullYear();
    
    this.update();
    
    return false;
  },
  
  onMonthSelect: function(e) {
    this.date.setMonth(parseInt(e.target.value) - 1);
    
    this.update();
    
    return false;
  },
  
  onYearSelect: function(e) {
    this.date.setFullYear(parseInt(e.target.value));
    
    this.update();
    
    return false;
  }
};
