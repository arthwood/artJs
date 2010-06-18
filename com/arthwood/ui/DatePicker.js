ArtJs.DatePicker = com.arthwood.ui.DatePicker = function(container, firstDay, yearSpan) {
  this.items = ArtJs.$$('.datepicker');
  this.onImgDC = ArtJs.$DC(this, this.onImg);
  ArtJs.ArrayUtils.each(this.items, ArtJs.$DC(this, this.initField));
  this.calendar = new ArtJs.Calendar(container, firstDay, yearSpan);
};

ArtJs.DatePicker.prototype = {
  initField: function(item) {
    var input = ArtJs.ArrayUtils.first(ArtJs.Selector.down(item, 'input'));
    var img = ArtJs.ElementUtils.putAfter(
      ArtJs.$C('img', {src: '/images/datepicker/cal.gif', alt: 'calendar_icon', className: 'datepicker'}), input
    );
    
    input.editable = false;
    img.onclick = this.onImgDC;
  },
  
  onImg: function(e) {
    var img = e.currentTarget;
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

ArtJs.Calendar = com.arthwood.ui.Calendar = function(container, firstDay, yearSpan) {
  this.buildYearSpanDC = ArtJs.$DC(this, this.buildYearSpan);
  
  this.setYearSpan(yearSpan);
  
  var eb = ArtJs.ElementBuilder;
  var au = ArtJs.ArrayUtils;
  var s = ArtJs.Selector;
  var imgPrev = ArtJs.$B('img', {src: '/images/datepicker/prev.gif', alt: 'prev'});
  var imgNext = ArtJs.$B('img', {src: '/images/datepicker/next.gif', alt: 'next'});
  var aPrev = ArtJs.$B('a', {href: '#'}, imgPrev);
  var aNext = ArtJs.$B('a', {href: '#'}, imgNext);
  var selectYearOptions = au.map(this.years, arguments.callee.yearToOption).join('');
  var selectYear = ArtJs.$B('select', {id: 'date_year', name: 'date[year]'}, selectYearOptions);
  var selectMonthOptions = au.map(ArtJs.Calendar.MONTHS, arguments.callee.monthToOption).join('');
  var selectMonth = ArtJs.$B('select', {id: 'date_month', name: 'date[month]'}, selectMonthOptions);
  var nav = ArtJs.$B('div', {className: 'nav'}, aPrev + selectMonth + selectYear + aNext);
  var headElement = ArtJs.$B('th', null, '&nbsp;');
  var headRow = ArtJs.$B('tr', null, eb.getCollection(7, headElement));
  var cellElement = ArtJs.$B('td', null, '&nbsp;');
  var row = ArtJs.$B('tr', null, eb.getCollection(7, cellElement));
  var rows = eb.getCollection(5, row);
  var table = ArtJs.$B('table', null, headRow + rows);
  var element = ArtJs.$B('div', {className: 'datepicker_calendar', style: 'display: none'}, nav + table);
  
  ArtJs.ElementUtils.putAtBottom(ArtJs.$P(element), container);
  
  this.element = ArtJs.$$('.datepicker_calendar').first();
  
  var arrows = s.down(this.element, '.nav a');
  
  this.prevMonth = arrows[0];
  this.nextMonth = arrows[1];
  this.prevMonth.onclick = ArtJs.$DC(this, this.onPrevMonth);
  this.nextMonth.onclick = ArtJs.$DC(this, this.onNextMonth);
  
  var selects = s.down(this.element, '.nav select');
  
  this.monthSelect = selects[0];
  this.yearSelect = selects[1];
  this.monthSelect.onchange = ArtJs.$DC(this, this.onMonthSelect);
  this.yearSelect.onchange = ArtJs.$DC(this, this.onYearSelect);
  
  this.headers = s.down(this.element, 'th');
  this.rows = s.down(this.element, 'tr').slice(1);
  this.items = s.down(this.element, 'td');
  this.updateHeaderDC = ArtJs.$DC(this, this.updateHeader);
  this.updateItemDC = ArtJs.$DC(this, this.updateItem);
  this.onItemDC = ArtJs.$DC(this, this.onItem);
  this.updateRowVisibilityDC = ArtJs.$DC(this, this.updateRowVisibility);
  au.each(this.items, ArtJs.$DC(this, this.initItem));
  this.field = null;
  this.firstDay = firstDay || 0;
  this.date = new Date();
  this.update();
};

ArtJs.ObjectUtils.extend(ArtJs.Calendar, {
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 
    'November', 'December'],
  DAYS: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  WEEKEND_DAYS: [6, 0],
  SEPARATOR: '-',
  VALID_CELL_BACKGROUND : 'none',
  WEEKEND_CELL_BACKGROUND : '#CFFFDF',
  INVALID_CELL_BACKGROUND : "url(/images/datepicker/backstripes.gif)",
  monthToOption: function(i, idx) {
    return new ArtJs.ElementBuilder('option', {value: idx + 1}, i);
  },
  yearToOption: function(i, idx) {
    return new ArtJs.ElementBuilder('option', {value: i}, i);
  }
});

ArtJs.Calendar.prototype = {
  show: function(field, position) {
    this.field = field;
    
    var value = this.field.value;
    
    this.date = ArtJs.StringUtils.empty(value) ? new Date() : ArtJs.DateUtils.fromDMY(value, ArtJs.Calendar.SEPARATOR);
    this.update();
    ArtJs.ElementUtils.setPosition(this.element, position);
    ArtJs.ElementUtils.show(this.element);
  },
  
  hide: function() {
    this.field = null;
    ArtJs.ElementUtils.hide(this.element);
  },
  
  isHidden: function() {
    return ArtJs.ElementUtils.isHidden(this.element);
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
    
    ArtJs.ElementUtils.setContent(header, ArtJs.Calendar.DAYS[index]);
  },
  
  updateItem: function(idx, item) {
    var day = new Date(this.date);
    
    day.setDate(idx - this.startIndex + 1);
    
    var value = day.getDate();
    var valid = (day.getMonth() == this.date.getMonth());
    var weekend = ArtJs.ArrayUtils.include(ArtJs.Calendar.WEEKEND_DAYS, (idx + this.firstDay) % 7); 
    
    item.style.background = valid 
      ? (weekend ? ArtJs.Calendar.WEEKEND_CELL_BACKGROUND : ArtJs.Calendar.VALID_CELL_BACKGROUND) 
      : ArtJs.Calendar.INVALID_CELL_BACKGROUND;
    item.className = (value == this.date.getDate()) ? 'selected' : '';
    ArtJs.ElementUtils.setClass(item, 'invalid', !valid);
    ArtJs.ElementUtils.setContent(item, value);
  },
  
  initItem: function(item) {
    item.onclick = this.onItemDC;
  },
  
  onItem: function(e) {
    var item = e.currentTarget;
    var value = ArtJs.ElementUtils.getContent(item);
    var valid = !ArtJs.ElementUtils.hasClass(item, 'invalid');
    
    if (valid) {
      this.date.setDate(parseInt(value));
      this.update();
      this.field.value = ArtJs.DateUtils.toDMY(this.date, ArtJs.Calendar.SEPARATOR);
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
    var select = e.currentTarget;
    
    this.date.setMonth(parseInt(select.value) - 1);
    
    this.update();
    
    return false;
  },
  
  onYearSelect: function(e) {
    var select = e.currentTarget;
    
    this.date.setFullYear(parseInt(select.value));
    
    this.update();
    
    return false;
  },
  
  setYearSpan: function(span) {
    this.yearSpan = span;
    this.years = ArtJs.ArrayUtils.build(this.yearSpan.y - this.yearSpan.x + 1, this.buildYearSpanDC);
  },
  
  buildYearSpan: function(i) {
    return this.yearSpan.x + i;
  }
};
