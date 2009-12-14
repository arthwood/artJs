var Selector = pl.arthwood.dom.Selector = {
  tagRE: /^[a-z]+/gi,
  classesRE: /\.{1}\w+/gi,
  idsRE: /#{1}\w+/gi,

  getElements: function(path) {
    this.items = path.split(' ');

    var item = ArrayUtils.last(this.items);
    var candidates = Selector.getElementsBySingleSelector(item);
    var families = ArrayUtils.map(candidates, this.getFamilyDelegate);
    var firteredFamilies = ArrayUtils.select(families, this.filterFamilyDelegate);
    var result = ArrayUtils.map(firteredFamilies, this.getFamilyLastDescendantDelegate);

    return result;
  },

  getFamily: function(node) {
    var result = [node];

    while ((node = node.parentNode) != document.body) {
      result.push(node);
    }
    
    return result;
  },

  filterFamily: function(family) {
    var i = this.items.length - 1;
    var item;
    var result;
    var j = family.length - 2;

    while (i--) {
      item = this.items[i];

      var immediateParent = (item == '>');
      
      if (!immediateParent) {
        var tag = this.getTag(item);
        var ids = this.getIds(item);
        var classes = this.getClasses(item);

        if (this.immediateParent) {
        }
        else {
          while (j > -1 && !this.checkNode(family[j], item)) {

          }
        }
      }

      this.immediateParent = immediateParent;
    }
  },

  checkNode: function(node, item) {
    var signature = this.getSignature(item);
    var tag = signature.tag;
    var ids = signature.ids;
    var classes = signature.classes;

    return (!tag || (node.tagName == tag))
      && (ArrayUtils.empty(ids) || ArrayUtils.include(ids, node.id))
      && (ArrayUtils.empty(classes) || ArrayUtils.includeAll(node.class.split(' '), classes));
  },

  getSignature: function(selector) {
    return {tag: this.getTag(selector), ids: this.getIds(selector), classes: this.getClasses(selector)};
  },

  getFamilyLastDescendant: function(i) {
    return ArrayUtils.last(i);
  },

  getElementsBySingleSelector: function(selector) {
    var signature = this.getSignature(selector);
    var elementsOfClasses = ArrayUtils.map(signature.classes, Selector.getElementsByClassName);
    var elementsByTag = Selector.getElementsByTagName(signature.tag);
    var elementsById = ArrayUtils.uniq(ArrayUtils.map(signature.ids, Selector.getElementById));
    var elementsByClass = ArrayUtils.uniq(ArrayUtils.flattenHtmlCollections(elementsOfClasses));
    var nonEmpty = ArrayUtils.selectNonEmpty([elementsByTag, elementsById, elementsByClass]);

    return ArrayUtils.commonElement(nonEmpty);
  },

  getTag: function(selector) {
    return selector.match(this.tagRE);
  },

  getIds: function(selector) {
    return ArrayUtils.map(selector.match(this.idsRE) || [], Selector.stripSelector);
  },

  getClasses: function(selector) {
    return ArrayUtils.map(selector.match(this.classesRE) || [], Selector.stripSelector);
  },

  stripSelector: function(selector) {
    return selector.slice(1);
  },

  getElementById: function(id) {
    return document.getElementById(id);
  },

  getElementsByClassName: function(selector) {
    return document.getElementsByClassName(selector);
  },

  getElementsByTagName: function(selector) {
    return document.getElementsByTagName(selector);
  }
};

var $ = $DC(Selector, Selector.getElementById);
var $$ = $DC(Selector, Selector.getElements);

Selector.filterFamilyDelegate = $DC(Selector, Selector.filterFamily);
Selector.getFamilyDelegate = $DC(Selector, Selector.getFamily);
Selector.getFamilyLastDescendantDelegate = $DC(Selector, Selector.getFamilyLastDescendant);
