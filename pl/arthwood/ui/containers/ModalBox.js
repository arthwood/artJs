ArtJs.ModalBox = pl.arthwood.ui.containers.ModalBox = function(size, draggable) {
  this.node = ArtJs.$('modalbox');
  this.size = size;
  this.nodeStyle = this.node.style;
  this.nodeStyle.width = this.size.x + 'px';
  this.nodeStyle.height = this.size.y + 'px';
  
  this.content = ArtJs.ArrayUtils.first(ArtJs.$down(this.node, '.content'));
  this.header = ArtJs.ArrayUtils.first(ArtJs.$down(this.node, '.header'));
  this.onDataLoadDelegate = ArtJs.$D(this, this.onDataLoad);
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
    this.nodeStyle.display = 'block';
    ArtJs.Ajax.get(url, this.onDataLoadDelegate);
  },

  onDataLoad: function(ajax) {
    this.content.innerHTML = ajax.getResponseText();
  },

  onResize: function() {
    ArtJs.ElementUtils.center(this.node, this.size);
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
