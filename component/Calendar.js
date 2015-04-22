artjs.Calendar = artjs.ui.Calendar = artjs.Class(
  function(element) {
    this.super(element);

    this._hide();
    
    this._register({
      'artjs-Calendar-years': '_onYearsSelectLoaded',
      'artjs-Calendar-months': '_onMonthsSelectLoaded',
      'artjs-Calendar-days': '_onDaysTableLoaded',
      'artjs-Calendar-prev': '_onPrevLoaded',
      'artjs-Calendar-next': '_onNextLoaded'
    });
    
    this._onEachDayDelegate = artjs.$D(this, '_onEachDay');
    this._onItemDelegate = artjs.$D(this, '_onItem');
    this._onPrevMonthDelegate = artjs.$D(this, '_onPrevMonth');
    this._onNextMonthDelegate = artjs.$D(this, '_onNextMonth');
    this._onMonthSelectDelegate = artjs.$D(this, '_onMonthSelect');
    this._onYearSelectDelegate = artjs.$D(this, '_onYearSelect');
  },
  {
    setSource: function(source) {
      var rt = artjs.Element.getBounds(source.getElement()).getRightTop();
      var position = rt.add(new artjs.Point(2, 0));
      
      this._source = source;
      this._setPosition(position);
      this._toggle();
    },
    
    _onYearsSelectLoaded: function(select) {
      this._years = select;
      this._years.onChange.add(this._onYearSelectDelegate);
    },
    
    _onMonthsSelectLoaded: function(select) {
      this._months = select;
      this._months.onChange.add(this._onMonthSelectDelegate);
      this._months.setOptions(artjs.Array.map(artjs.Lang.t('datepicker', 'months'), this.ctor._toMonthOption));
    },
    
    _onDaysTableLoaded: function(table) {
      this._days = table;
      this._days.setData({
        head: this._getDaysRow(),
        body: artjs.Array.build(this.ctor.ROWS_NUM, this._getDaysRow)
      });
      this._days.onItem.add(this._onItemDelegate);
    },
    
    _onPrevLoaded: function(prev) {
      prev.onClick.add(this._onPrevMonthDelegate);
    },
    
    _onNextLoaded: function(next) {
      next.onClick.add(this._onNextMonthDelegate);
    },
    
    _getDaysRow: function() {
      return artjs.Array.build(7, artjs.String.blank);
    },
    
    _toggle: function() {
      this._isHidden() ? this._show() : this._hide();
    },
    
    _show: function() {
      var value = this._source.getModel().value;
      
      this._selectedDate = artjs.String.isEmpty(value) 
        ? new Date() 
        : artjs.Date.fromYMD(value, this.ctor.SEPARATOR);
      this._currentDate = new Date(this._selectedDate);
      this._firstDay = this._source.firstDay;
      this._years.setOptions(artjs.Array.map(artjs.Array.fromRange(this._source.yearsRange), this.ctor._toYearOption));
      
      this._update();
      
      artjs.Element.show(this._element);
    },
    
    _update: function() {
      var monthFirstDate = artjs.Date.firstDate(this._currentDate);
      var monthFirstDay = monthFirstDate.getDay();
      var monthDaysNum = artjs.Date.monthDaysNum(this._currentDate);
      
      this._months.setValue(this._currentDate.getMonth() + 1);
      this._years.setValue(this._currentDate.getFullYear());
      this.startIndex = artjs.Math.sawtooth(monthFirstDay - this._firstDay, 0, 7);
      
      var rowsNum = artjs.Math.stairs(this.startIndex + monthDaysNum - 1, 0, 7) + 1;
      
      for (var i = 0; i < this.ctor.ROWS_NUM; i++) {
        this._days.setRowVisible(i, i < rowsNum);
      }

      this._days.updateHead(artjs.Array.build(7, this._eachHeadData, this));
      this._days.iterate(this._onEachDayDelegate);
    },
    
    _eachHeadData: function(idx) {
      var index = artjs.Math.sawtooth(this._firstDay + idx, 0, 7);
      
      return artjs.Lang.t('datepicker', 'days')[index];
    },
    
    _onEachDay: function(item, idx) {
      var date = new Date(this._currentDate);
      
      date.setDate(idx - this.startIndex + 1);
      
      var value = date.getDate();
      var valid = (date.getMonth() == this._currentDate.getMonth());
      var weekend = artjs.Array.includes(this.ctor.WEEKEND_DAYS, (idx + this._firstDay) % 7); 
      var selected = (date.getTime() == this._selectedDate.getTime());
      
      artjs.Element.setClasses(item, {
        weekend: weekend,
        selected: selected,
        invalid: !valid
      });

      artjs.Element.setContent(item, value);
    },
    
    _onItem: function(item) {
      var value = artjs.Element.getContent(item);
      var valid = !artjs.Element.hasClass(item, 'invalid');
      
      if (valid) {
        this._selectedDate.setFullYear(this._currentDate.getFullYear());
        this._selectedDate.setMonth(this._currentDate.getMonth());
        this._selectedDate.setDate(parseInt(value, 10));
        this._update();
        this._source.getModel().value = artjs.Date.toYMD(this._selectedDate, this.ctor.SEPARATOR);
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
      this._currentDate.setMonth(this._currentDate.getMonth() + v);
      
      this._update();
    },
    
    _onMonthSelect: function(select) {
      this._currentDate.setMonth(parseInt(select.getValue(), 10) - 1);
      
      this._update();
    },
    
    _onYearSelect: function(select) {
      this._currentDate.setFullYear(parseInt(select.getValue(), 10));
      
      this._update();
    },
    
    _setYearSpan: function(span) {
      this.yearSpan = span;
      this.years = artjs.Array.build(this.yearSpan.y - this.yearSpan.x + 1, this._buildYearSpan);
    },
    
    _buildYearSpan: function(i) {
      return this.yearSpan.x + i;
    },
    
    _setPosition: function(position) {
      artjs.Element.setPosition(this._element, position);
    },
    
    _hide: function() {
      artjs.Element.hide(this._element);
    },
    
    _isHidden: function() {
      return artjs.Element.isHidden(this._element);
    }
  },
  {
    WEEKEND_DAYS: [6, 0],
    ROWS_NUM: 7,
    SEPARATOR: '-',
    
    _name:  'artjs.Calendar',
    
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
