artjs.ModalBox = artjs.ui.ModalBox = function(element, size, draggable) {
  this.element = element;
  this.size = size;
  this.elementStyle = this.element.style;
  this.elementStyle.width = this.size.x + 'px';
  this.elementStyle.height = this.size.y + 'px';
  
  this.content = artjs.Array.first(artjs.$down(this.element, '.content'));
  this.header = artjs.Array.first(artjs.$down(this.element, '.header'));
  this.onDataLoadD = artjs.$D(this, this.onDataLoad);
  this.onHeaderMouseDownDC = artjs.$DC(this, this.onHeaderMouseDown);
  this.onHeaderMouseDownDC = artjs.$DC(this, this.onHeaderMouseDown);
  this.onHeaderMouseUpDC = artjs.$DC(this, this.onHeaderMouseUp);
  this.onMouseMoveDC = artjs.$DC(this, this.onMouseMove);
  
  window.addEventListener('resize', artjs.$DC(this, this.onResize), false);
  
  this.onResize();
  
  /* this.setDraggable(draggable); */
};

artjs.ModalBox.prototype = {
  setTitle: function(title) {
    this.header.innerHTML = title || '&nbpsp;';
  },

  show: function(url) {
    this.elementStyle.display = 'block';
    artjs.Ajax.get(url, null, this.onDataLoadD);
  },

  onDataLoad: function(ajax) {
    artjs.Element.setContent(this.content, ajax.getResponseText());
  },

  onResize: function() {
    artjs.Element.center(this.element, this.size);
  },

  setDraggable: function(draggable) {
    this.draggable = Boolean(draggable);
    
    if (this.draggable) {
      this.header.addEventListener('mousedown', this.onHeaderMouseDownDC);
      this.header.addEventListener('mouseup', this.onHeaderMouseUpDC);
    }
    else {
      this.header.removeEventListener('mousedown', this.onHeaderMouseDownDC);
      this.header.removeEventListener('mouseup', this.onHeaderMouseUpDC);
    }
  },

  onHeaderMouseDown: function(event) {
    this.shift = new artjs.Point();
    
    window.addEventListener('mousemove', this.onMouseMoveDC);
  },

  onHeaderMouseUp: function(event) {
    window.removeEventListener('mousemove', this.onMouseMoveDC);
  },

  onMouseMove: function(event) {
    artjs.Element.setPosition(new artjs.Point());
  }
};
