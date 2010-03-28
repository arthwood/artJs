ArtJs.DatePicker = pl.arthwood.ui.DatePicker = function() {
  this.items = ArtJs.$$('.datepicker');
  this.onImgDC = ArtJs.$DC(this, this.onImg);
  ArtJs.ArrayUtils.each(this.items, ArtJs.$DC(this, this.initField));
  this.calendar = new ArtJs.Calendar();
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
    var position = new ArtJs.Point(img.x + img.width + 1, img.y + 1);
    
    this.calendar.show(ArtJs.ElementUtils.prev(img), position);
    
    return false;
  }
};

ArtJs.Calendar = pl.arthwood.ui.Calendar = function() {
  this.node = ArtJs.ArrayUtils.first(ArtJs.$$('.datepicker_calendar'));
  this.headers = ArtJs.Selector.down(this.node, 'th');
  this.items = ArtJs.Selector.down(this.node, 'td');
  this.updateHeaderDC = ArtJs.$DC(this, this.updateHeader);
  this.updateItemDC = ArtJs.$DC(this, this.updateItem);
  this.onItemDC = ArtJs.$DC(this, this.onItem);
  ArtJs.ArrayUtils.each(this.items, ArtJs.$DC(this, this.initItem));
  this.field = null;
  this.firstDay = 0;
  this.update();
};

ArtJs.Calendar.prototype = {
  DAYS: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  VALID_CELL_BACKGROUND : 'none',
  INVALID_CELL_BACKGROUND : "url(/images/datepicker/backstripes.gif)",
  EMPTY_CELL_VALUE: '&nbsp;',
    
  show: function(field, position) {
    this.field = field;
    ArtJs.ElementUtils.setPosition(this.node, position);
    ArtJs.ElementUtils.show(this.node);
  },
  
  hide: function() {
    this.field = null;
    ArtJs.ElementUtils.hide(this.node);
  },
  
  update: function(date) {
    this.date = date || new Date();
    
    this.monthsFirstDay = ArtJs.DateUtils.firstDay(this.date);
    this.monthsLastDate = ArtJs.DateUtils.monthDaysNum(this.date);
    
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
    
    item.style.background = valid ? this.VALID_CELL_BACKGROUND : this.INVALID_CELL_BACKGROUND;
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
      var date = new Date(this.date);
      
      date.setDate(parseInt(value));
    
      this.field.value = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      this.hide();
    }
    
    return false;
  }
};
