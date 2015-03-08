artjs.DatePicker = artjs.component.DatePicker = artjs.Class(
  function(element) {
    this.super(element);

    artjs.$BA(this);
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var data = artjs.ElementUtils.getData(this._element);
    var firstDay = parseInt(data['first-day']);
    
    this.year = year;
    this.month = month;
    this.yearsRange = new artjs.Point(parseInt(data['year-from']) || year - 100, parseInt(data['year-to']) || year + 20);
    this.firstDay = isNaN(firstDay) ? 1 : firstDay;
    this.getElement().setAttribute('readonly', 'readonly');
    
    artjs.on('click', this._element, this._onClick.delegate);
    
    this.calendar = artjs.Component.onLoad('artjs-Calendar', this._onCalendarLoad.delegate);
  },
  {
    _onCalendarLoad: function(component) {
      this.calendar = component;
    },
    
    _onClick: function(e) {
      e.preventDefault();
      
      this.calendar.setSource(this);
    }
  },
  null,
  artjs.Component
);

artjs.Calendar = artjs.ui.Calendar = artjs.Class(
  function(element) {
    this.super(element);

    artjs.$BA(this);

    this._hide();
    
    artjs.Component.onLoad('artjs-Calendar-years', this._onYearsSelectLoaded.delegate);
    artjs.Component.onLoad('artjs-Calendar-months', this._onMonthsSelectLoaded.delegate);
    artjs.Component.onLoad('artjs-Calendar-days', this._onDaysTableLoaded.delegate);
    artjs.Component.onLoad('artjs-Calendar-prev', this._onPrevLoaded.delegate);
    artjs.Component.onLoad('artjs-Calendar-next', this._onNextLoaded.delegate);
  },
  {
    setSource: function(source) {
      var rt = artjs.ElementUtils.getBounds(source.getElement()).getRightTop();
      var position = rt.add(new artjs.Point(2, 0));
      
      this._source = source;
      this._setPosition(position);
      this._toggle();
    },
    
    _onYearsSelectLoaded: function(select) {
      this._years = select;
      this._years.onChange.add(this._onYearSelect.delegate);
    },
    
    _onMonthsSelectLoaded: function(select) {
      this._months = select;
      this._months.onChange.add(this._onMonthSelect.delegate);
      this._months.setOptions(artjs.ArrayUtils.map(artjs.Lang.t('datepicker', 'months'), this.ctor._toMonthOption));
    },
    
    _onDaysTableLoaded: function(table) {
      this._days = table;
      this._days.setData({
        head: this._getDaysRow(),
        body: artjs.ArrayUtils.build(this.ctor.ROWS_NUM, this._getDaysRow)
      });
      this._days.onItem.add(this._onItem.delegate);
    },
    
    _onPrevLoaded: function(prev) {
      prev.onClick.add(this._onPrevMonth.delegate);
    },
    
    _onNextLoaded: function(next) {
      next.onClick.add(this._onNextMonth.delegate);
    },
    
    _getDaysRow: function() {
      return artjs.ArrayUtils.build(7, artjs.StringUtils.blank);
    },
    
    _toggle: function() {
      this._isHidden() ? this._show() : this._hide();
    },
    
    _show: function() {
      this._years.setOptions(artjs.ArrayUtils.map(artjs.ArrayUtils.fromRange(this._source.yearsRange), this.ctor._toYearOption));
      this._years.setSelected(this._source.year);
      this._months.setSelected(this._source.month);
      
      this.firstDay = this._source.firstDay;
      
      var value = this._source.getElement().value;
      
      this.selectedDate = artjs.StringUtils.isEmpty(value) 
        ? new Date() 
        : artjs.DateUtils.fromYMD(value, this.ctor.SEPARATOR);
      this.currentDate = new Date(this.selectedDate);
      
      this._update();
      
      artjs.ElementUtils.show(this._element);
    },
    
    _setPosition: function(position) {
      artjs.ElementUtils.setPosition(this._element, position);
    },
    
    _hide: function() {
      artjs.ElementUtils.hide(this._element);
    },
    
    _isHidden: function() {
      return artjs.ElementUtils.isHidden(this._element);
    },
    
    _update: function() {
      var monthFirstDate = artjs.DateUtils.firstDate(this.currentDate);
      var monthFirstDay = monthFirstDate.getDay();
      var monthDaysNum = artjs.DateUtils.monthDaysNum(this.currentDate);
      
      this._months.setSelected(this.currentDate.getMonth() + 1);
      this._years.setSelected(this.currentDate.getFullYear());
      this.startIndex = artjs.MathUtils.sawtooth(monthFirstDay - this.firstDay, 0, 7);
      
      var rowsNum = artjs.MathUtils.stairs(this.startIndex + monthDaysNum - 1, 0, 7) + 1;
      
      for (var i = 0; i < this.ctor.ROWS_NUM; i++) {
        this._days.setRowVisible(i, i < rowsNum);
      }

      this._days.updateHead(artjs.ArrayUtils.build(7, this._eachHeadData, this));
      this._days.iterate(this._onEachDay.delegate);
    },
    
    _eachHeadData: function(idx) {
      var index = artjs.MathUtils.sawtooth(this.firstDay + idx, 0, 7);
      
      return artjs.Lang.t('datepicker', 'days')[index];
    },
    
    _onEachDay: function(item, idx) {
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
    
    _onItem: function(item) {
      var value = artjs.ElementUtils.getContent(item);
      var valid = !artjs.ElementUtils.hasClass(item, 'invalid');
      
      if (valid) {
        this.selectedDate.setFullYear(this.currentDate.getFullYear());
        this.selectedDate.setMonth(this.currentDate.getMonth());
        this.selectedDate.setDate(parseInt(value, 10));
        this._update();
        this._source.getElement().value = artjs.DateUtils.toYMD(this.selectedDate, this.ctor.SEPARATOR);
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
      
      this._update();
    },
    
    _onMonthSelect: function(select) {
      this.currentDate.setMonth(parseInt(select.getValue(), 10) - 1);
      
      this._update();
    },
    
    _onYearSelect: function(select) {
      this.currentDate.setFullYear(parseInt(select.getValue(), 10));
      
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
    WEEKEND_DAYS: [6, 0],
    ROWS_NUM: 7,
    SEPARATOR: '-',
    CELL_BG: {valid: 'none', weekend: '#CFFFDF', invalid: '#AAAAAA'},
    
    init: function() {
      artjs.onLibraryLoad.add(artjs.$D(this, '_onLibraryLoad'));
    },
    
    _toMonthOption: function(i, idx) {
      return {value: idx + 1, text: i};
    },
    
    _toYearOption: function(i, idx) {
      return {value: i, text: i};
    },
    
    _onLibraryLoad: function() {
      artjs.TemplateLibrary.loadTemplate('artjs/calendar');
    }
  },
  artjs.Component
);
