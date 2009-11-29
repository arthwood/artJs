var Selector = pl.arthwood.dom.Selector = function() {};

Selector.getElements = function(path) {
  var items = path.split(' ');
  var item;
  var n = items.length;
  var i = n - 1;
  var result = new Array();
  var immediateParent = false;

  item = items[i];

  Selector.getElementsBySingleSelector(item);

  while (i--) {
    item = items[i];
    
    if (item == '>') {
      if (i == n - 1) return null;
      immediateParent = true;
    }
    else {
      immediateParent = false;
      
    }
  }
};

Selector.getElementsBySingleSelector = function(selector) {
  var tagRE = /^[a-z]+/gi;
  var classesRE = /\.{1}\w+/gi;
  var idsRE = /#{1}\w+/gi;

  var tag = selector.match(tagRE);
  var ids = selector.match(idsRE);
  var classes = selector.match(classesRE);

  ids = ids && ArrayUtils.map(ids, Selector.stripSelector);
  classes = classes && ArrayUtils.map(classes, Selector.stripSelector);

  var elementsByTag = tag && Selector.getElementsByTagName(tag);
  var elementsById = ids && ArrayUtils.uniq(ArrayUtils.map(ids, Selector.getElementById));
  var elementsByClass = classes && ArrayUtils.uniq(ArrayUtils.flatten(ArrayUtils.map(classes, Selector.getElementsByClassName)));
  alert(elementsByClass);
  //log(ArrayUtils.toString(elementsByTag));
  //log(ArrayUtils.toString([3, 4, 5, 6]));
  return ArrayUtils.uniq(ArrayUtils.flatten([elementsByTag, elementsById, elementsByClass]));
};

Selector.stripSelector = function(selector) {
  return selector.slice(1);
};

var $ = Selector.getElementById = function(id) {
  return document.getElementById(id);
};

Selector.getElementsByClassName = function(selector) {
  return document.getElementsByClassName(selector);
};

Selector.getElementsByTagName = function(selector) {
  return document.getElementsByTagName(selector);
};

/*
      .myClass p > span.sClass
      ['.myClass', 'p', '>', 'span.sClass']
*/
