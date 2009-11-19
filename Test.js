var event = new Event('test event');
var object1 = {
  name: 'bolek',
  method: function(message, value) {
    log(this.name + ' from obj 1 - ' + message + ' : ' + value);
  }
};
var object2 = {
  name: 'lolek',
  method: function(message) {
    log(this.name + ' from obj 2 - ' + message);
  }
};
var delegate11 = $D(object1, object1.method, 3);
var delegate12 = $D(object1, object2.method);
var delegate21 = $D(object2, object1.method);
var delegate22 = $D(object2, object2.method);

event.add(delegate11);
/*event.add(delegate12);
event.add(delegate21);
event.add(delegate22);
*/
event.fire('hey!');
