artjs.onDocumentLoad = new artjs.CustomEvent('document:load');
artjs.onWindowLoad = new artjs.CustomEvent('window:load');
artjs.onLibraryLoad = new artjs.CustomEvent('library:load');

document.addEventListener('DOMContentLoaded', function() {
  artjs.onDocumentLoad.fire();
  artjs.TemplateLibrary.init();
  artjs.Calendar.init();
}, false);

window.addEventListener('load', function() {
  artjs.onWindowLoad.fire();
}, false);
