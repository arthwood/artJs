artjs.Broadcaster = new artjs.Channel('Broadcaster');
artjs.onDocumentLoad = new artjs.Event('document:load');
artjs.onWindowLoad = new artjs.Event('window:load');

document.addEventListener('DOMContentLoaded', function() {
  artjs.TemplateLibrary.init();
  artjs.ComponentSweeper.init();
  artjs.Calendar.init();
  artjs.Router.init();
  artjs.onDocumentLoad.fire();
}, false);

window.addEventListener('load', function() {
  artjs.onWindowLoad.fire();
}, false);
