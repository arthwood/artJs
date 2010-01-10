ArtJs.Selector = pl.arthwood.dom.Selector = {
  tagRE: /^\w+/gi,
  classesRE: /\.\w+/gi,
  idsRE: /#\w+/gi,
  attrsRE: /\[.*\]/gi,

  init: function() {
    this.filterFamilyDelegate = ArtJs.$DC(this, this.filterFamily);
    this.getFamilyDelegate = ArtJs.$DC(this, this.getFamily);
    this.getFamilyDescendantDelegate = ArtJs.$DC(this, this.getFamilyDescendant);
    this.attrToArrayDelegate = ArtJs.$DC(this, this.attrToArray);
    this.getElementsByTagNameDelegate = ArtJs.$DC(this, this.getElementsByTagName);
    this.getElementsByClassNameDelegate = ArtJs.$DC(this, this.getElementsByClassName);
    this.getElementByIdDelegate = ArtJs.$DC(this, this.getElementById);
    this.filterByAttributesDelegate = ArtJs.$DC(this, this.filterByAttributes);

    ArtJs.$ = ArtJs.$DC(this, this.getElementById);
    ArtJs.$$ = ArtJs.$DC(this, this.getElements);
    ArtJs.$down = ArtJs.$DC(this, this.down);
    ArtJs.$up = ArtJs.$DC(this, this.up);
    
    this.injected = false;
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
    var au = ArtJs.ArrayUtils;

    this.root = root || document.body;
    this.signatures = au.map(items, ArtJs.$DC(this, this.getSignature));
    
    var signature = au.last(this.signatures);
    var candidates = this.getElementsBySignature(signature);
    var families = au.map(candidates, this.getFamilyDelegate);
    var firteredFamilies = au.select(au.compact(families), this.filterFamilyDelegate);
    
    return au.map(firteredFamilies, this.getFamilyDescendantDelegate);
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
    var au = ArtJs.ArrayUtils;
    var ou = ArtJs.ObjectUtils;

    return (!tag || (node.tagName.toLowerCase() == tag))
      && (au.empty(ids) || au.include(ids, node.id))
      && (au.empty(classes) || au.includeAll(node.className.split(' '), classes))
      && (ou.empty(attributes) || ou.includeAll(node.attributes, attributes));
  },

  getSignature: function(selector) {
    return (selector == '>')
      ? selector
      : {tag: this.getTag(selector), ids: this.getIds(selector), classes: this.getClasses(selector),
        attributes: this.getAttributes(selector)};
  },

  getFamilyDescendant: function(i) {
    return ArtJs.ArrayUtils.first(i);
  },

  getElementsBySignature: function(signature) {
    var au = ArtJs.ArrayUtils;
    var elementsOfClasses = au.map(signature.classes, this.getElementsByClassNameDelegate);
    var elementsByTag = this.getElementsByTagName(signature.tag);
    var elementsById = au.uniq(au.map(signature.ids, this.getElementByIdDelegate));
    var elementsByClass = au.uniq(au.flattenHtmlCollections(elementsOfClasses));
    var nonEmpty = au.selectNonEmpty([elementsByTag, elementsById, elementsByClass]);
    var commonElements = au.empty(nonEmpty) ? [] : au.commonElement(nonEmpty);
    
    this.filterByAttributesDelegate.delegate.args = [signature.attributes];

    return au.select(commonElements, this.filterByAttributesDelegate);
  },

  filterByAttributes: function(i, attributes) {
    return ArtJs.ObjectUtils.includeAll(i, attributes);
  },

  getTag: function(selector) {
    return selector.match(this.tagRE);
  },

  getIds: function(selector) {
    return ArtJs.ArrayUtils.map(selector.match(this.idsRE) || [], this.stripIdSelector);
  },

  getClasses: function(selector) {
    return ArtJs.ArrayUtils.map(selector.match(this.classesRE) || [], this.stripClassSelector);
  },

  getAttributes: function(selector) {
    var au = ArtJs.ArrayUtils;
    var matches = au.map(selector.match(this.attrsRE) || [], this.stripAttributeSelector);
    var arr = au.map(matches[0] && matches[0].split(',') || [], this.attrToArrayDelegate);

    return ArtJs.ObjectUtils.fromArray(arr);
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
  },

  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    
    proto.up = dc(this, this.up, true);
    proto.down = dc(this, this.down, true);

    this.injected = true;
  }
};

ArtJs.Selector.init();
