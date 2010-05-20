ArtJs.EventUtils = com.arthwood.net.EventUtils = {
  edge: function(ct, t, rt) {
    var s = ArtJs.Selector;
    
    return (t == ct) && !s.descendantOf(rt, ct) || s.descendantOf(t, ct) && !s.descendantOf(rt, ct, true);
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
