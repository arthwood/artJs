artjs.TemplateBase = artjs.template.Base = {
  /**
   * @param content (String) - Html that can contain expressions that can be compiled
   * @param scope (Object) - data that will be compiled into the content
   * @description Renders content into the element with the scope
   */
  render: function(content, scope) {
    return artjs.TemplateCompiler.compile(content, scope);
  },
  
  /**
   * @param element (Element) - container for rendered content
   * @param content (String) - Html that can contain expressions that can be compiled
   * @param scope (Object) - data that will be compiled into the content
   * @description Renders content into the element with the scope
   */
  renderInto: function(element, content, scope) {
    content = this.render(content, scope);
    
    artjs.Element.setContent(element, content);
    
    this.evalScripts(element);
    
    artjs.ComponentScanner.scan(element);
  },
  
  renderOnto: function(element, content, scope) {
    content = this.render(content, scope);
    
    element = artjs.Element.replace(artjs.ElementBuilder.parse(content), element);
    
    if (artjs.Element.toTagString(element) == 'script') {
      this.evalScript(element);
    }
    else {
      this.evalScripts(element);
    }
    
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
    artjs.Array.each(artjs.Selector.findAll(element, 'script'), this.evalScript, this);
  },
  
  evalScript: function(script) {
    eval(artjs.Element.getContent(script));
  }
};
