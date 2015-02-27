artjs.Broadcaster = artjs.events.Broadcaster = {
  _events: {},
  
  register: function(id) {
    this._events[id] = new artjs.Event(id);
  },
  
  addListener: function(id, delegate) {
    this._events[id].add(delegate);
  },
  
  fire: function(id, data) {
    this._events[id].fire(data);
  }
};
