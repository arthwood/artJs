ArtJs.EventUtils = com.arthwood.utils.EventUtils = {
  edge: function(targets) {
    var t = targets.origin;
    var ct = targets.current;
    var rt = targets.related;
    var s = ArtJs.Selector;
    
    return (t == ct) && !s.descendantOf(rt, ct) || s.descendantOf(t, ct) && !(rt == ct || s.descendantOf(rt, ct));
  },
  
  inner: function(e) {
    return !this.edge(e);
  },
  
  doInjection: function() {
    var proto = Event.prototype;
    var dc = ArtJs.$DC;
    
    proto.edge = dc(this, this.edge, true);
    proto.inner = dc(this, this.inner, true);
  }
};
