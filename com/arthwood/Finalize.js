ArtJs.ObjectUtils.init();
ArtJs.ElementBuilder.init();
ArtJs.ElementUtils.init();
ArtJs.Selector.init();

ArtJs.onDocumentLoad = new ArtJs.CustomEvent('document:load');
ArtJs.onWindowLoad = new ArtJs.CustomEvent('window:load');

document.addEventListener('DOMContentLoaded', function() {
  ArtJs.onDocumentLoad.fire();
}, false);

window.addEventListener('load', function() {
  ArtJs.onWindowLoad.fire();
}, false);
