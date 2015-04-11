artjs.DatePicker = artjs.view.DatePicker = artjs.Class(
  function(element) {
    this.super(element);
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var data = artjs.Element.getData(this._element);
    var firstDay = parseInt(data['first-day']);
    
    this.year = year;
    this.month = month;
    this.yearsRange = new artjs.Point(parseInt(data['year-from']) || year - 20, parseInt(data['year-to']) || year + 5);
    this.firstDay = isNaN(firstDay) ? 1 : firstDay;
    this.setReadOnly(true);
    
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
  {
    _name: 'artjs.DatePicker'
  },
  artjs.Input
);
