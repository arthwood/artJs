artjs.onDocumentLoad = new artjs.CustomEvent('document:load');
artjs.onWindowLoad = new artjs.CustomEvent('window:load');
artjs.onLibraryLoad = new artjs.CustomEvent('library:load');

document.addEventListener('DOMContentLoaded', function() {
  artjs.onDocumentLoad.fire();
}, false);

window.addEventListener('load', function() {
  artjs.onWindowLoad.fire();
}, false);

artjs.ArrayUtils._init();
artjs.Component._init();
artjs.ObjectUtils._init();
artjs.ElementBuilder._init();
artjs.ElementUtils._init();
artjs.Selector._init();
artjs.TemplateLibrary._init();
artjs.Calendar._init();
