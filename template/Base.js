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
      
      return artjs.TemplateHelpers.perform(action, argsValues, this._scope);
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

artjs.TemplateBase = artjs.template.Base = {
  /**
   * @param content (String) - Html that can contain expressions that can be compiled
   * @param scope (Object) - data that will be compiled into the content
   * @description Renders content into the element with the scope
   */
  render: function(content, scope) {
    var compiler = new artjs.TemplateCompiler(content, scope);
    
    return compiler.compile(content, scope);
  },
  
  /**
   * @param element (Element) - container for rendered content
   * @param content (String) - Html that can contain expressions that can be compiled
   * @param scope (Object) - data that will be compiled into the content
   * @description Renders content into the element with the scope
   */
  renderInto: function(element, content, scope) {
    artjs.ElementUtils.setContent(element, this.render(content, scope));
    
    this.evalScripts(element);
    
    artjs.ComponentScanner.scan(element);
  },

  /**
   * 
   * @param element (Element) - container for rendered content
   * @param scope (Object) - data that will be compiled into the content
   * 
   * @description Renders internals of the element into itself with scope
   */
  renderElement: function(element, scope) {
    this.renderInto(element, element.innerHTML, scope);
  },
  
  /**
   * 
   * @param element (Element) - container for rendered content
   * @param templateId (String) - id of the template to render
   * @param scope (Object) - data that will be compiled into the template
   * @description Compiles and renders template into the element.
   */
  renderTemplateInto: function(element, templateId, scope) {
    var template = artjs.TemplateLibrary.getTemplate(templateId);
    
    this.renderInto(element, template, scope);
  },
  
  evalScripts: function(element) {
    artjs.ArrayUtils.each(artjs.Selector.find(element, 'script'), this.evalScript, this);
  },
  
  evalScript: function(script) {
    eval(artjs.ElementUtils.getContent(script));
  }
};
