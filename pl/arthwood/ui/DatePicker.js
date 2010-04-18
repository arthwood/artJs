ArtJs.DatePicker = pl.arthwood.ui.DatePicker = function(firstDay) {
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

ArtJs.Calendar = pl.arthwood.ui.Calendar = function(firstDay) {
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
  this.items = ArtJs.Selector.down(this.node, 'td');
  this.updateHeaderDC = ArtJs.$DC(this, this.updateHeader);
  this.updateItemDC = ArtJs.$DC(this, this.updateItem);
  this.onItemDC = ArtJs.$DC(this, this.onItem);
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
  EMPTY_CELL_VALUE: '&nbsp;',
    
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
    this.monthsFirstDay = ArtJs.DateUtils.firstDay(this.date);
    this.monthsLastDate = ArtJs.DateUtils.monthDaysNum(this.date);
    
    this.monthSelect.value = this.date.getMonth() + 1;
    this.yearSelect.value = this.date.getFullYear();
    
    ArtJs.ArrayUtils.eachPair(this.headers, this.updateHeaderDC);
    ArtJs.ArrayUtils.eachPair(this.items, this.updateItemDC);
  },
  
  updateHeader: function(idx, header) {
    var index = ArtJs.MathUtils.castToSet(this.firstDay + idx, 0, 7);
    
    header.innerHTML = this.DAYS[index];
  },
  
  updateItem: function(idx, item) {
    var value = idx + 1 - this.monthsFirstDay + this.firstDay;
    var valid = value > 0 && value <= this.monthsLastDate;
    var weekend = ArtJs.ArrayUtils.include(this.WEEKEND_DAYS, (idx + this.firstDay) % 7); 
    
    item.style.background = valid ? (weekend ? this.WEEKEND_CELL_BACKGROUND : this.VALID_CELL_BACKGROUND) : this.INVALID_CELL_BACKGROUND;
    item.className = (value == this.date.getDate()) ? 'selected' : '';
    item.innerHTML = valid ? value : this.EMPTY_CELL_VALUE;
  },
  
  initItem: function(item) {
    item.onclick = this.onItemDC;
  },
  
  onItem: function(e) {
    var item = e.target;
    var value = item.innerHTML;
    var valid = !(value == this.EMPTY_CELL_VALUE);
    
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
