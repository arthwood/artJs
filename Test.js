/*var event = new Event('test event');
var object = {
  name: 'bolek',
  method: function(message, value) {
    log(this.name + ' from obj 1 - ' + message + ' : ' + value);
  }
};

var delegate = $D(object, object.method, 3);

event.add(delegate);

event.fire('hey!');

alert(event);
*/

var element = new Element('div', {id: 'column'}, null, true);

log(element.toString());