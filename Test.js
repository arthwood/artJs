/*
var event = new Event('test event');
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

/*
var element = new Element('div', {id: 'column'}, null, true);

log(element.toString());
*/

//var body = $$('body')[0];

/*
var str = 'span#ojoj.sClass.dClass#bleh';

var tagRE = /^[a-z]+/gi;
var classesRE = /\.{1}\w+/gi;
var idsRE = /#{1}\w+/gi;

var tag = str.match(tagRE);
var ids = str.match(idsRE);
var classes = str.match(classesRE);

log(tag);
log(ids);
log(classes);
*/

/*
var arr = [{name: 'mike'}, {name: 'john'}, {name: 'steven'}, {name: 'mike'}, {name: 'john'}];

log(ArrayUtils.uniq(arr, function(i, j) {return i.name.length == j.name.length}));
*/

window.onload = function() {
  ArrayUtils.print(Selector.getElementsBySingleSelector('p'));
};
