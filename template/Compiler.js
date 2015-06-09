artjs.TemplateCompiler = artjs.template.Compiler = artjs.Class(
  function(content, scope) {
    this._tagRegEx = /\{\{[^{}]+\}\}/g;
    this._methodRegEx = /^(\w+)\((.*)\)$/;
    this._content = content;
    this._scope = scope || {};
  },
  {
    compile: function() {
      var tags = this._content.match(this._tagRegEx);
      
      artjs.Array.each(tags, this._eachTag, this);
      
      return this._content;
    },
    
    _eachChar: function(char, idx) {
      var inOpening = artjs.Object.isPresent(this._openingQuoteIndex);
      
      if (char == "'") {
        this._openingQuoteIndex = inOpening ? null : idx;
      }
      else if (char == ',' && !inOpening) {
        this._pushToArguments(this._argumentIndex, idx);
        this._argumentIndex = idx + 1;
      }
    },
    
    _eachTag: function(i) {
      var expression = artjs.String.sub(i, 2, -2);
      var result = this._parseExpression(expression);
      
      this._content = this._content.replace(i, result);
    },
    
    _parseArguments: function(argsStr) {
      this._argsStr = argsStr;
      this._arguments = [];
      this._argumentIndex = 0;
      
      for (var i = 0; i < argsStr.length; i++) {
        this._eachChar(argsStr[i], i);
      }
      
      this._pushToArguments(this._argumentIndex, i);
      
      var args = artjs.Array.map(this._arguments, this._trimArg, this);
      
      return artjs.Array.map(args, this._parseArgument, this);
    },
    
    _parseArgument: function(i) {
      var first = artjs.String.first(i);
      var last = artjs.String.last(i);
      
      if (first == "'" && last == "'" || first == '"' && last == '"') {
        return i.substr(1, i.length - 2);
      }
      else {
        return this._parseExpression(i);
      }
    },
      
    _parseExpression: function(expression) {
      this._methodRegEx.lastIndex = 0;
      
      var exec = this._methodRegEx.exec(expression);
      
      return exec ? this._parseMethod(exec) : this._fromScope(expression);
    },
    
    _parseMethod: function(exec) {
      exec.shift();
      
      var action = exec.shift();
      var delegate = artjs.$D(artjs.TemplateHelpers, action);
      
      if (!delegate.method) { throw 'Trying to call unregistered "' + action + '" helper'; }
      
      var argsStr = artjs.Array.first(exec);
      var argsValues = this._parseArguments(argsStr);
      
      delegate.args = argsValues.concat(this._scope);
      
      return delegate.invoke();
    },
    
    _pushToArguments: function(i, j) {
      this._arguments.push(this._argsStr.substring(i, j));
    },
    
    _fromScope: function(i) {
      return artjs.String.toS(this._scope[i]);
    },
    
    _trimArg: function(i) {
      return artjs.String.trim(i);
    }
  },
  {
    _name: 'Compiler',
    
    compile: function(content, scope) {
      var instance = new this(content, scope);
    
      return instance.compile();
    },
    
    toString: function() {
      return this._name;
    }
  }
);
