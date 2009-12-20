var Selector = pl.arthwood.dom.Selector = {
  tagRE: /^\w+/gi,
  classesRE: /\.\w+/gi,
  idsRE: /#\w+/gi,
  attrsRE: /\[.*\]/gi,

  init: function() {
    this.filterFamilyDelegate = $DC(this, this.filterFamily);
    this.getFamilyDelegate = $DC(this, this.getFamily);
    this.getFamilyDescendantDelegate = $DC(this, this.getFamilyDescendant);
    this.attrToArrayDelegate = $DC(this, this.attrToArray);
    this.getElementsByTagNameDelegate = $DC(this, this.getElementsByTagName);
    this.getElementsByClassNameDelegate = $DC(this, this.getElementsByClassName);
    this.getElementByIdDelegate = $DC(this, this.getElementById);
    this.filterByAttributesDelegate = $DC(this, this.filterByAttributes);

    window.$ = $DC(this, this.getElementById);
    window.$$ = $DC(this, this.getElements);
    window.$down = $DC(this, this.down);
    window.$up = $DC(this, this.up);
  },

  down: function(element, path) {
    return this.getElements(path, element);
  },

  up: function(element, path) {
    if (!path) return element.parentNode;

    var signature = this.getSignature(path);
    var family = this.getFamily(element);
    var j = 1;
    var n = family.length;
    var ok;

    do {
      ok = this.checkNode(family[j++], signature);
    }
    while (!ok && j < n);

    return ok ? family[j - 1] : null;
  },

  getElements: function(path, root) {
    var items = path.split(' ');

    this.root = root || document.body;
    this.signatures = ArrayUtils.map(items, $DC(this, this.getSignature));

    var signature = ArrayUtils.last(this.signatures);
    var candidates = this.getElementsBySignature(signature);
    var families = ArrayUtils.map(candidates, this.getFamilyDelegate);
    var firteredFamilies = ArrayUtils.select(ArrayUtils.compact(families), this.filterFamilyDelegate);
    
    return ArrayUtils.map(firteredFamilies, this.getFamilyDescendantDelegate);
  },

  getFamily: function(node) {
    var result = [node];
    
    while ((node = node.parentNode) != this.root && node) {
      result.push(node);
    }
    
    return node && result;
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
    var attributes = signature.attributes;

    return (!tag || (node.tagName.toLowerCase() == tag))
      && (ArrayUtils.empty(ids) || ArrayUtils.include(ids, node.id))
      && (ArrayUtils.empty(classes) || ArrayUtils.includeAll(node.className.split(' '), classes))
      && (ObjectUtils.empty(attributes) || ObjectUtils.includeAll(node.attributes, attributes));
  },

  getSignature: function(selector) {
    return (selector == '>')
      ? selector
      : {tag: this.getTag(selector), ids: this.getIds(selector), classes: this.getClasses(selector),
        attributes: this.getAttributes(selector)};
  },

  getFamilyDescendant: function(i) {
    return ArrayUtils.first(i);
  },

  getElementsBySignature: function(signature) {
    var elementsOfClasses = ArrayUtils.map(signature.classes, this.getElementsByClassNameDelegate);
    var elementsByTag = this.getElementsByTagName(signature.tag);
    var elementsById = ArrayUtils.uniq(ArrayUtils.map(signature.ids, this.getElementByIdDelegate));
    var elementsByClass = ArrayUtils.uniq(ArrayUtils.flattenHtmlCollections(elementsOfClasses));
    var nonEmpty = ArrayUtils.selectNonEmpty([elementsByTag, elementsById, elementsByClass]);
    var commonElements = ArrayUtils.empty(nonEmpty) ? [] : ArrayUtils.commonElement(nonEmpty);

    this.filterByAttributesDelegate.delegate.args = [signature.attributes];

    return ArrayUtils.select(commonElements, this.filterByAttributesDelegate);
  },

  filterByAttributes: function(i, attributes) {
    return ObjectUtils.includeAll(i, attributes);
  },

  getTag: function(selector) {
    return selector.match(this.tagRE);
  },

  getIds: function(selector) {
    return ArrayUtils.map(selector.match(this.idsRE) || [], this.stripIdSelector);
  },

  getClasses: function(selector) {
    return ArrayUtils.map(selector.match(this.classesRE) || [], this.stripClassSelector);
  },

  getAttributes: function(selector) {
    var matches = ArrayUtils.map(selector.match(this.attrsRE) || [], this.stripAttributeSelector);
    var arr = ArrayUtils.map(matches[0] && matches[0].split(',') || [], this.attrToArrayDelegate);

    return ObjectUtils.fromArray(arr);
  },

  attrToArray: function(i) {
    return i.split('=');
  },

  stripIdSelector: function(selector) {
    return selector.slice(1);
  },

  stripClassSelector: function(selector) {
    return selector.slice(1);
  },

  stripAttributeSelector: function(selector) {
    return selector.slice(1).slice(0, selector.length - 2);
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
