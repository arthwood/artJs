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

ArtJs.ModalBox.prototype.setTitle = function(title) {
  this.header.innerHTML = title || '&nbpsp;';
};

ArtJs.ModalBox.prototype.show = function(url) {
  this.nodeStyle.display = 'block';
  ArtJs.Ajax.get(url, this.onDataLoadDelegate);
};

ArtJs.ModalBox.prototype.onDataLoad = function(ajax) {
  this.content.innerHTML = ajax.getResponseText();
};

ArtJs.ModalBox.prototype.onResize = function() {
  ArtJs.ElementUtils.setPosition(this.node, new ArtJs.Point(
    (window.document.height - this.size.y) / 2,
    (window.document.width - this.size.x) / 2
  ));
};

ArtJs.ModalBox.prototype.setDraggable = function(draggable) {
  this.draggable = Boolean(draggable);
  
  if (this.draggable) {
    this.header.addEventListener('mousedown', this.onHeaderMouseDownCallback);
    this.header.addEventListener('mouseup', this.onHeaderMouseUpCallback);
  }
  else {
    this.header.removeEventListener('mousedown', this.onHeaderMouseDownCallback);
    this.header.removeEventListener('mouseup', this.onHeaderMouseUpCallback);
  }
};

ArtJs.ModalBox.prototype.onHeaderMouseDown = function(event) {
  this.shift = new ArtJs.Point();
  
  window.addEventListener('mousemove', this.onMouseMoveCallback);
};

ArtJs.ModalBox.prototype.onHeaderMouseUp = function(event) {
  window.removeEventListener('mousemove', this.onMouseMoveCallback);
};

ArtJs.ModalBox.prototype.onMouseMove = function(event) {
  ArtJs.ElementUtils.setPosition(new ArtJs.Point());
};
