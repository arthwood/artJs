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
  var ids = ArrayUtils.map(selector.match(idsRE) || [], Selector.stripSelector);
  var classes = ArrayUtils.map(selector.match(classesRE) || [], Selector.stripSelector);

  var elementsOfClasses = ArrayUtils.map(classes, Selector.getElementsByClassName);

  var elementsByTag = Selector.getElementsByTagName(tag);
  var elementsById = ArrayUtils.uniq(ArrayUtils.map(ids, Selector.getElementById));
  var elementsByClass = ArrayUtils.uniq(ArrayUtils.flattenHtmlCollections(elementsOfClasses));
  var nonEmpty = ArrayUtils.selectNonEmpty([elementsByTag, elementsById, elementsByClass]);

  return ArrayUtils.commonElement(nonEmpty);
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
