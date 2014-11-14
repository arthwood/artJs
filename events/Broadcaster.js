artjs.Broadcaster = artjs.events.Broadcaster = {
  _events: {},
  
  register: function(id, event) {
    this._events[id] = event;
  },
  
  addListener: function(id, delegate) {
    this._events[id].add(delegate);
  },
  
  fire: function(id, data) {
    this._events[id].fire(data);
  }
};
