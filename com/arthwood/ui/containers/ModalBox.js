ArtJs.ModalBox = com.arthwood.ui.containers.ModalBox = function(element, size, draggable) {
  this.element = element;
  this.size = size;
  this.elementStyle = this.element.style;
  this.elementStyle.width = this.size.x + 'px';
  this.elementStyle.height = this.size.y + 'px';
  
  this.content = ArtJs.ArrayUtils.first(ArtJs.$down(this.element, '.content'));
  this.header = ArtJs.ArrayUtils.first(ArtJs.$down(this.element, '.header'));
  this.onDataLoadD = ArtJs.$D(this, this.onDataLoad);
  this.onHeaderMouseDownCallback = ArtJs.$DC(this, this.onHeaderMouseDown);
  this.onHeaderMouseUpCallback = ArtJs.$DC(this, this.onHeaderMouseUp);
  this.onMouseMoveCallback = ArtJs.$DC(this, this.onMouseMove);
  
  window.addEventListener('resize', ArtJs.$DC(this, this.onResize), false);
  
  this.onResize();
  
  //this.setDraggable(draggable);
};

ArtJs.ModalBox.prototype = {
  setTitle: function(title) {
    this.header.innerHTML = title || '&nbpsp;';
  },

  show: function(url) {
    this.elementStyle.display = 'block';
    ArtJs.Ajax.get(url, null, this.onDataLoadD);
  },

  onDataLoad: function(ajax) {
    ArtJs.ElementUtils.setContent(this.content, ajax.getResponseText());
  },

  onResize: function() {
    ArtJs.ElementUtils.center(this.element, this.size);
  },

  setDraggable: function(draggable) {
    this.draggable = Boolean(draggable);
    
    if (this.draggable) {
      this.header.addEventListener('mousedown', this.onHeaderMouseDownCallback);
      this.header.addEventListener('mouseup', this.onHeaderMouseUpCallback);
    }
    else {
      this.header.removeEventListener('mousedown', this.onHeaderMouseDownCallback);
      this.header.removeEventListener('mouseup', this.onHeaderMouseUpCallback);
    }
  },

  onHeaderMouseDown: function(event) {
    this.shift = new ArtJs.Point();
    
    window.addEventListener('mousemove', this.onMouseMoveCallback);
  },

  onHeaderMouseUp: function(event) {
    window.removeEventListener('mousemove', this.onMouseMoveCallback);
  },

  onMouseMove: function(event) {
    ArtJs.ElementUtils.setPosition(new ArtJs.Point());
  }
};
