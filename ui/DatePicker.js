artjs.DatePicker = artjs.ui.DatePicker = artjs.Class(
  function() {
    this.super(arguments);
    
    artjs.$BA(this);
    
    var now = new Date();
    var year = now.getFullYear();
    var data = artjs.ElementUtils.getData(this.element);
    
    this.yearSpan = new artjs.Point(parseInt(data['year-from']) || year - 100, parseInt(data['year-to']) || year + 20);
    this.firstDay = parseInt(data['first-day']) || 0;
    
    var img = artjs.ElementUtils.putAfter(
      artjs.$C('img', {
        src: '../images/cal.png', 
        alt: 'calendar_icon', 
        className: 'artjs-DatepickerImg'
      }), 
      this.element
    );
    
    this.element.editable = false;
    
    artjs.ElementUtils.onClick(img, this._onImg.delegate);
    
    this.calendar = artjs.$first(this.element, '.artjs-Calendar');
  },
  {
    _onImg: function(e) {
      e.preventDefault();
      
      var img = e.currentTarget;
      var imgRT = artjs.ElementUtils.getBounds(img).getRightTop();
      var position = imgRT.add(new artjs.Point(2, 2));
      
      this.calendar.source = this;
      this.calendar.toggle(this, position);
    }
  },
  null,
  artjs.Component
);

artjs.Calendar = artjs.ui.Calendar = artjs.Class(
  function(element) {
    this.super(arguments);
    
    this.years = [{value: 1999, text: '1999'}, {value: 2000, text: '2000'}];
    this.year = 2000;
    this.months = [{value: 'October', text: 'October'}, {value: 'November', text: 'November'}];
    this.month = 'November';
    this.table = [[1], [2]];
    
    artjs.ComponentScanner.addListener('artjs-Calendar-years', artjs.$D(this, '_onYearsLoaded'));
    artjs.ComponentScanner.addListener('artjs-Calendar-months', artjs.$D(this, '_onMonthsLoaded'));
    
//    var au = artjs.ArrayUtils;
//    var eu = artjs.ElementUtils;
//    var eb = artjs.ElementBuilder;
//    var s = artjs.Selector;
//    
//    artjs.$BA(this, '_buildYearSpan');
//    
//    var selectMonthOptions = au.map(this.ctor.MONTHS, this.ctor._monthToOption).join('');
//    
//    var headElement = artjs.$B('th', null, '&nbsp;');
//    var headRow = artjs.$B('tr', null, eb.getCollection(7, headElement));
//    var cellElement = artjs.$B('td', null, '&nbsp;');
//    var row = artjs.$B('tr', null, eb.getCollection(7, cellElement));
//    var rows = eb.getCollection(5, row);
//    
//    var nav = s.first(this.element, '.nav');
//    var arrows = s.find(nav, 'a');
//    var selects = s.find(nav, 'select');
//    var table = s.first(this.element, 'table');
//    var monthSelect = selects[0];
//    
//    eu.setContent(table, headRow + rows);
//    eu.setContent(monthSelect, selectMonthOptions);
//    
//    this.prevMonth = arrows[0];
//    this.nextMonth = arrows[1];
//    
//    eu.onClick(this.prevMonth, this._onPrevMonth.delegate);
//    eu.onClick(this.nextMonth, this._onNextMonth.delegate);
//    
//    this.monthSelect = selects[0];
//    this.yearSelect = selects[1];
//    
////    eu.onChange(this.monthSelect, this._onMonthSelect.delegate);
////    eu.onChange(this.yearSelect, this._onYearSelect.delegate);
//    this.monthSelect.onchange = this._onMonthSelect;
//    this.yearSelect.onchange = this._onYearSelect;
//    
//    this.headers = s.find(this.element, 'th');
//    this.rows = s.find(this.element, 'tr').slice(1);
//    this.items = s.find(this.element, 'td');
//    this.field = null;
//    
//    au.each(this.items, this._initItem, this);
  },
  {
    _onYearsLoaded: function(component) {
      component.setOptions(this.years);
      component.setSelected(this.year);
    },
    
    _onMonthsLoaded: function(component) {
      component.setOptions(this.months);
      component.setSelected(this.month);
    },
    
    getYear: function() {
      return this._year;
    },
    
    setYear: function(v) {
      this._year = v;
    },
    
    toggle: function(datePicker, position) {
      if (this._isHidden()) {
        this._show(datePicker, position);
      }
      else {
        this._hide();
      }
    },
    
    _show: function(datePicker, position) {
      this.firstDay = datePicker.firstDay;
      this._setYearSpan(datePicker.yearSpan);
      this.field = datePicker.element;
      
      var value = this.field.value;
      var nav = artjs.Selector.first(datePicker.element, '.nav');
      var selectYearOptions = artjs.ArrayUtils.map(this.years, this.ctor._yearToOption).join('');
      var selects = artjs.Selector.find(nav, 'select');
      var yearSelect = selects[1];
      
      artjs.ElementUtils.setContent(yearSelect, selectYearOptions);
      
      this.selectedDate = artjs.StringUtils.isEmpty(value) ? new Date() : artjs.DateUtils.fromYMD(value, this.ctor.SEPARATOR);
      this.currentDate = new Date(this.selectedDate);
      
      this._update();
      
      artjs.ElementUtils.setPosition(this.element, position);
      artjs.ElementUtils.show(this.element);
    },
    
    _hide: function() {
      this.field = null;
      artjs.ElementUtils.hide(this.element);
    },
    
    _isHidden: function() {
      return artjs.ElementUtils.isHidden(this.element);
    },
    
    _update: function() {
      var au = artjs.ArrayUtils;
      var du = artjs.DateUtils;
      var mu = artjs.MathUtils;
      var monthFirstDate = du.firstDate(this.currentDate);
      var monthFirstDay = monthFirstDate.getDay();
      var monthDaysNum = du.monthDaysNum(this.currentDate);
      
      this.startIndex = mu.sawtooth(monthFirstDay - this.firstDay, 0, 7);
      this.rowsNum = mu.stairs(this.startIndex + monthDaysNum - 1, 0, 7) + 1;
      this.monthSelect.value = this.currentDate.getMonth() + 1;
      this.yearSelect.value = this.currentDate.getFullYear();
      
      au.each(this.rows, this._updateRowVisibility, this);
      au.each(this.headers, this._updateHeader, this);
      au.each(this.items, this._updateItem, this);
    },
    
    _updateRowVisibility: function(row, idx) {
      artjs.ElementUtils.setVisible(row, idx < this.rowsNum);
    },
    
    _updateHeader: function(header, idx) {
      var index = artjs.MathUtils.sawtooth(this.firstDay + idx, 0, 7);
      
      artjs.ElementUtils.setContent(header, this.ctor.DAYS[index]);
    },
    
    _updateItem: function(item, idx) {
      var date = new Date(this.currentDate);
      
      date.setDate(idx - this.startIndex + 1);
      
      var value = date.getDate();
      var valid = (date.getMonth() == this.currentDate.getMonth());
      var weekend = artjs.ArrayUtils.includes(this.ctor.WEEKEND_DAYS, (idx + this.firstDay) % 7); 
      var selected = (date.getTime() == this.selectedDate.getTime());
      
      item.style.background = this.ctor.CELL_BG[valid ? (weekend ? 'weekend' : 'valid') : 'invalid'];
      
      artjs.ElementUtils.setClass(item, 'selected', selected);
      artjs.ElementUtils.setClass(item, 'invalid', !valid);
      artjs.ElementUtils.setContent(item, value);
    },
    
    _initItem: function(item) {
      artjs.ElementUtils.onClick(item, this._onItem.delegate);
    },
    
    _onItem: function(e) {
      var item = e.currentTarget;
      var value = artjs.ElementUtils.getContent(item);
      var valid = !artjs.ElementUtils.hasClass(item, 'invalid');
      
      if (valid) {
        this.selectedDate.setFullYear(this.currentDate.getFullYear());
        this.selectedDate.setMonth(this.currentDate.getMonth());
        this.selectedDate.setDate(parseInt(value, 10));
        this._update();
        this.field.value = artjs.DateUtils.toYMD(this.selectedDate, this.ctor.SEPARATOR);
        this._hide();
      }
      
      return false;
    },
    
    _onPrevMonth: function(e) {
      e.preventDefault();
      
      this._onMonth(-1);
    },
    
    _onNextMonth: function(e) {
      e.preventDefault();
      
      this._onMonth(1);
    },
    
    _onMonth: function(v) {
      this.currentDate.setMonth(this.currentDate.getMonth() + v);
      
      this.monthSelect.value = this.currentDate.getMonth() + 1;
      this.yearSelect.value = this.currentDate.getFullYear();
      
      this._update();
    },
    
    _onMonthSelect: function(e) {
      var select = e.currentTarget;
      
      this.currentDate.setMonth(parseInt(select.value, 10) - 1);
      
      this._update();
    },
    
    _onYearSelect: function(e) {
      var select = e.currentTarget;
      
      this.currentDate.setFullYear(parseInt(select.value, 10));
      
      this._update();
    },
    
    _setYearSpan: function(span) {
      this.yearSpan = span;
      this.years = artjs.ArrayUtils.build(this.yearSpan.y - this.yearSpan.x + 1, this._buildYearSpan);
    },
    
    _buildYearSpan: function(i) {
      return this.yearSpan.x + i;
    }
  },
  {
    MONTHS: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    DAYS: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
    WEEKEND_DAYS: [6, 0],
    SEPARATOR: '-',
    CELL_BG: {valid: 'none', weekend: '#CFFFDF', invalid: '#AAAAAA'},
    
    init: function() {
      artjs.onLibraryLoad.add(artjs.$D(this, '_onLibraryLoad'));
    },
    
    _monthToOption: function(i, idx) {
      return new artjs.ElementBuilder('option', {value: idx + 1}, i);
    },
    
    _yearToOption: function(i, idx) {
      return new artjs.ElementBuilder('option', {value: i}, i);
    },
    
    _onLibraryLoad: function() {
      artjs.TemplateLibrary.loadTemplate('artjs/calendar');
    }
  },
  artjs.Component
);
