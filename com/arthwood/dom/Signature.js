ArtJs.Signature = com.arthwood.dom.Signature = ArtJs.Class(
  function(selector) {
    this._selector = selector;
    
    this.tag = this._getTag(); 
    this.id = this._getId(); 
    this.classes = this._getClasses(); 
    this.attributes = this._getAttributes();
  },
  {
    _tagRE: /^\w+/gi,
    _classesRE: /\.[\w\-]+/gi,
    _idRE: /#[\w\-]+/gi,
    _attrsRE: /\[.*\]/gi,

    checkNode: function(e) {
      return (!this.tag || (e.tagName.toLowerCase() == this.tag)) &&
        (!this.id || e.id == this.id) &&
        this._checkInclusion(ArtJs.ArrayUtils, this.classes, e.className.split(' ')) &&
        this._checkInclusion(ArtJs.ObjectUtils, this.attributes, e.attributes)
    },
  
    _checkInclusion: function(utils, object, subset) {
      return utils.isEmpty(object) || ArtJs.ArrayUtils.includesAll(subset, object);
    },
    
    _getTag: function() {
      var matches = this._selector.match(this._tagRE);
      
      return matches && ArtJs.ArrayUtils.first(matches);
    },
    
    _getId: function() {
      var match = ArtJs.ArrayUtils.first(this._match(this._selector, this._idRE));
      
      return match && this._stripIdSelector(match);
    },
    
    _getClasses: function() {
      return ArtJs.ArrayUtils.map(this._match(this._selector, this._classesRE), this._stripClassSelector, this);
    },
    
    _getAttributes: function() {
      var matches = ArtJs.ArrayUtils.map(this._match(this._selector, this._attrsRE), this._stripAttributeSelector, this);
      var arr = ArtJs.ArrayUtils.map(matches[0] && matches[0].split(',') || [], this._attrToArray, this);
  
      return ArtJs.ObjectUtils.fromArray(arr);
    },
    
    _match: function(str, re) {
      var matches = str.match(re);
      
      return matches && ArtJs.$A(matches) || [];
    },
    
    _attrToArray: function(i) {
      return i.split('=');
    },
    
    _stripIdSelector: function(v) {
      return v.slice(1);
    },
    
    _stripClassSelector: function(v) {
      return v.slice(1);
    },
    
    _stripAttributeSelector: function(v) {
      return v.slice(1).slice(0, v.length - 2);
    }
  }
);
