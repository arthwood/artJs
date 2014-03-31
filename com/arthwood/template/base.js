ArtJs.TemplateBase = com.arthwood.template.Base = ArtJs.Class(
  function(content, scope) {
    this.content = content;
    this.scope = scope;
  },
  {
    TAG_RE: /\{.+\}/g,
    METHOD_RE: /^(\w+)\((.*)\)$/,
    
    compile: function() {
      ArtJs.ArrayUtils.each(this.content.match(this.TAG_RE), this._eachTag, this);
    },
    
    _eachTag: function(i) {
      this.METHOD_RE.lastIndex = 0;
      
      var expression = ArtJs.StringUtils.sub(i, 1, -1);
      var exec = this.METHOD_RE.exec(expression);
      var result;
      
      if (exec) {
        exec.shift();
        
        var action = exec.shift();
        var argsStr = ArtJs.ArrayUtils.first(exec);
        var args = ArtJs.ArrayUtils.map(argsStr.split(','), this._stripArg, this);
        var argsValues = ArtJs.ArrayUtils.map(args, this._parseArg, this);
        
        result = ArtJs.TemplateHelpers.perform(action, argsValues);
      }
      else {
        result = this._fromScope(expression);
      }
      
      this.content = this.content.replace(i, result);
    },
    
    _parseArg: function(i) {
      var str = i;
      
      str = ArtJs.StringUtils.trim(str, "'");
      str = ArtJs.StringUtils.trim(str, '"');
      
      return (str == i) ? this.scope[i] || '' : str;
    },
    
    _fromScope: function(i) {
      return this.scope[i];
    },
    
    _stripArg: function(i) {
      return ArtJs.StringUtils.strip(i);
    }
  },
  {
    compile: function(content, scope) {
      var template = new this(content, scope);
      
      template.compile();
      
      return template.content;
    },
    
    compileInto: function(element, content, scope) {
      ArtJs.ElementUtils.setContent(element, this.compile(content, scope));
      
      ArtJs.Component.scan(element);
    }
  }
);
