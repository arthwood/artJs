var Selector = pl.arthwood.dom.Selector = {
  tagRE: /^[a-z]+/gi,
  classesRE: /\.{1}\w+/gi,
  idsRE: /#{1}\w+/gi,

  init: function() {
    this.filterFamilyDelegate = $DC(this, this.filterFamily);
    this.getFamilyDelegate = $DC(this, this.getFamily);
    this.getFamilyDescendantDelegate = $DC(this, this.getFamilyDescendant);

    window.$ = $DC(this, this.getElementById);
    window.$$ = $DC(this, this.getElements);
  },

  getElements: function(path) {
    var items = path.split(' ');

    this.signatures = ArrayUtils.map(items, $DC(this, this.getSignature));

    if (ArrayUtils.empty(this.signatures)) return [];

    var signature = ArrayUtils.last(this.signatures);
    var candidates = Selector.getElementsBySignature(signature);
    var families = ArrayUtils.map(candidates, this.getFamilyDelegate);
    var firteredFamilies = ArrayUtils.select(families, this.filterFamilyDelegate);
    var result = ArrayUtils.map(firteredFamilies, this.getFamilyDescendantDelegate);

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
    var i = this.signatures.length - 1;
    var j = 1;
    var n = family.length;
    var signature;
    var ok;

    if (n == 1) return true;

    this.immediateParent = false;

    while (i--) {
      signature = this.signatures[i];

      var immediateParent = (signature == '>');

      if (!immediateParent) {
        do {
          ok = this.checkNode(family[j++], signature);
        }
        while (!ok && !this.immediateParent && j < n);

        if (!ok) return false;
      }

      this.immediateParent = immediateParent;
    }
    
    return true;
  },

  checkNode: function(node, signature) {
    var tag = signature.tag;
    var ids = signature.ids;
    var classes = signature.classes;

    return (!tag || (node.tagName.toLowerCase() == tag))
      && (ArrayUtils.empty(ids) || ArrayUtils.include(ids, node.id))
      && (ArrayUtils.empty(classes) || ArrayUtils.includeAll(node.className.split(' '), classes));
  },

  getSignature: function(selector) {
    return (selector == '>')
      ? selector
      : {tag: this.getTag(selector), ids: this.getIds(selector), classes: this.getClasses(selector)};
  },

  getFamilyDescendant: function(i) {
    return ArrayUtils.first(i);
  },

  getElementsBySignature: function(signature) {
    var elementsOfClasses = ArrayUtils.map(signature.classes, Selector.getElementsByClassName);
    var elementsByTag = Selector.getElementsByTagName(signature.tag);
    var elementsById = ArrayUtils.uniq(ArrayUtils.map(signature.ids, Selector.getElementById));
    var elementsByClass = ArrayUtils.uniq(ArrayUtils.flattenHtmlCollections(elementsOfClasses));
    var nonEmpty = ArrayUtils.selectNonEmpty([elementsByTag, elementsById, elementsByClass]);
    
    return ArrayUtils.empty(nonEmpty) ? [] : ArrayUtils.commonElement(nonEmpty);
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

Selector.init();
