artjs.Broadcaster = artjs.events.Broadcaster = new artjs.Channel('Broadcaster');

artjs.onDocumentLoad = new artjs.Event('document:load');
artjs.onWindowLoad = new artjs.Event('window:load');
artjs.onLibraryLoad = new artjs.Event('library:load');

document.addEventListener('DOMContentLoaded', function() {
  artjs.onDocumentLoad.fire();
  artjs.TemplateLibrary.init();
  artjs.Calendar.init();
}, false);

window.addEventListener('load', function() {
  artjs.onWindowLoad.fire();
}, false);
