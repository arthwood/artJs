ArtJs.EventUtils = com.arthwood.utils.Event = {
  edge: function(targets) {
    var t = targets.origin;
    var ct = targets.current;
    var rt = targets.related;
    var s = ArtJs.Selector;
    
    return (t == ct) && !s.isDescendantOf(rt, ct) || s.isDescendantOf(t, ct) && !s.isSelfOrDescendantOf(rt, ct);
  },
  
  doInjection: function() {
    var proto = Event.prototype;
    var dc = ArtJs.$DC;
    
    proto.edge = dc(this, this.edge, true);
  }
};
