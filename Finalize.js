artjs.onDocumentLoad = new artjs.CustomEvent('document:load');
artjs.onWindowLoad = new artjs.CustomEvent('window:load');
artjs.onLibraryLoad = new artjs.CustomEvent('library:load');

document.addEventListener('DOMContentLoaded', function() {
  artjs.onDocumentLoad.fire();
}, false);

window.addEventListener('load', function() {
  artjs.onWindowLoad.fire();
}, false);

artjs.ArrayUtils.init();
artjs.ComponentSweeper.init();
artjs.ObjectUtils.init();
artjs.ElementBuilder.init();
artjs.ElementUtils.init();
artjs.Selector.init();
artjs.TemplateLibrary.init();
artjs.Calendar.init();
