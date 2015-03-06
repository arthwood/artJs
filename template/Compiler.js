artjs.TemplateCompiler = artjs.template.Compiler = artjs.Class(
  function(content, scope) {
    this._tagRegEx = /\{\{.+\}\}/g;
    this._methodRegEx = /^(\w+)\((.*)\)$/;
    this._content = content;
    this._scope = scope;
  },
  {
    compile: function() {
      var tags = this._content.match(this._tagRegEx);
      
      artjs.ArrayUtils.each(tags, this._eachTag, this);
      
      return this._content;
    },
    
    _eachTag: function(i) {
      var expression = artjs.StringUtils.sub(i, 2, -2);      
      var result = this._parseExpression(expression);
      
      this._content = this._content.replace(i, result);
    },
    
    _parseExpression: function(expression) {
      this._methodRegEx.lastIndex = 0;
      
      var exec = this._methodRegEx.exec(expression);
      
      return exec ? this._parseMethod(exec) : this._fromScope(expression);
    },
    
    _parseMethod: function(exec) {
      exec.shift();
      
      var action = exec.shift();
      var argsStr = artjs.ArrayUtils.first(exec);
      var args = artjs.ArrayUtils.map(argsStr.split(','), this._stripArg, this);
      var argsValues = artjs.ArrayUtils.map(args, this._parseArg, this);
      var helpers = artjs.TemplateHelpers;
      
      return helpers[action].apply(helpers, argsValues.concat(this._scope));
    },
    
    _parseArg: function(i) {
      var str = i;
      
      str = artjs.StringUtils.trim(str, "'");
      str = artjs.StringUtils.trim(str, '"');
      
      return str == i ? this._parseExpression(i) : str;
    },
    
    _fromScope: function(i) {
      return this._scope[i] || '';
    },
    
    _stripArg: function(i) {
      return artjs.StringUtils.strip(i);
    }
  }
);
