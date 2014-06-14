artjs.TemplateBase = artjs.template.Base = artjs.Class(
  function(content, scope) {
    this.content = content;
    this.scope = scope;
  },
  {
    TAG_RE: /\{\{.+\}\}/g,
    METHOD_RE: /^(\w+)\((.*)\)$/,
    
    compile: function() {
      artjs.ArrayUtils.each(this.content.match(this.TAG_RE), this._eachTag, this);
    },
    
    _eachTag: function(i) {
      var expression = artjs.StringUtils.sub(i, 2, -2);      
      var result = this._parseExpression(expression);
      
      this.content = this.content.replace(i, result);
    },
    
    _parseExpression: function(expression) {
      this.METHOD_RE.lastIndex = 0;
      
      var exec = this.METHOD_RE.exec(expression);
      
      return exec ? this._parseMethod(exec) : this._fromScope(expression);
    },
    
    _parseMethod: function(exec) {
      exec.shift();
      
      var action = exec.shift();
      var argsStr = artjs.ArrayUtils.first(exec);
      var args = artjs.ArrayUtils.map(argsStr.split(','), this._stripArg, this);
      var argsValues = artjs.ArrayUtils.map(args, this._parseArg, this);
      
      return artjs.TemplateHelpers.perform(action, argsValues);
    },
    
    _parseArg: function(i) {
      var str = i;
      
      str = artjs.StringUtils.trim(str, "'");
      str = artjs.StringUtils.trim(str, '"');
      
      return str == i ? this._parseExpression(i) : str;
    },
    
    _fromScope: function(i) {
      return this.scope[i] || '';
    },
    
    _stripArg: function(i) {
      return artjs.StringUtils.strip(i);
    }
  },
  {
    /**
     * 
     * @param content (String) - Html that can contain expressions that can be compiled
     * @param scope (Object) - data that will be compiled into the content
     * @returns {string} - compiled content
     */
    renderContent: function(content, scope) {
      var instance = new this(content, scope);
      
      instance.compile();
      
      return instance.content;
    },

    /**
     * 
     * @param element (Element) - container for rendered content
     * @param content (String) - Html that can contain expressions that can be compiled
     * @param scope (Object) - data that will be compiled into the content
     * @description Renders content into the element with the scope
     */
    renderInto: function(element, content, scope) {
      this.render(element, this.renderContent(content, scope));
    },

    /**
     * 
     * @param element (Element) - container for rendered content
     * @param scope (Object) - data that will be compiled into the content
     * 
     * @description Renders interials of the element into itself with scope
     */
    renderElement: function(element, scope) {
      this.renderInto(element, element.innerHTML, scope);
    },
      
    /**
     * 
     * @param templateId (String) - id of the template to render
     * @param scope (Object) - data that will be compiled into the template
     * @returns {string} - compiled template
     */
    renderTemplate: function(templateId, scope) {
      var template = artjs.TemplateLibrary.getTemplate(templateId);
    
      return this.renderContent(template, scope);
    },

    /**
     * 
     * @param element (Element) - container for rendered content
     * @param templateId (String) - id of the template to render
     * @param scope (Object) - data that will be compiled into the template
     * @description Compiles and renders template into the element.
     */
    renderTemplateInto: function(element, templateId, scope) {
      this.render(element, this.renderTemplate(templateId, scope));
    },

    /**
     * 
     * @param element (Element) - container for rendered content
     * @param content (String) - compiled Html content
     * @description Inserts the content into element, evaluates the scripts and initializes any components inside the element.
     */
    render: function(element, content) {
      artjs.ElementUtils.setContent(element, content);
      
      this._evalScripts(element);
      
      artjs.Component._scan(element);
    },
    
    _evalScripts: function(element) {
      artjs.ArrayUtils.each(artjs.Selector.find(element, 'script'), this._evalScript, this);
    },
    
    _evalScript: function(script) {
      eval(artjs.ElementUtils.getContent(script));
    }
  }
);
