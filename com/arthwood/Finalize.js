ArtJs.onDocumentLoad = new ArtJs.CustomEvent('document:load');
ArtJs.onWindowLoad = new ArtJs.CustomEvent('window:load');
ArtJs.onLibraryLoad = new ArtJs.CustomEvent('library:load');

document.addEventListener('DOMContentLoaded', function() {
  ArtJs.onDocumentLoad.fire();
}, false);

window.addEventListener('load', function() {
  ArtJs.onWindowLoad.fire();
}, false);

ArtJs.ObjectUtils.init();
ArtJs.ElementBuilder.init();
ArtJs.ElementUtils.init();
ArtJs.Selector.init();
ArtJs.TemplateLibrary.init();
