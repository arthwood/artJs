ArtJs.onDocumentLoad = new ArtJs.CustomEvent('document:load');
ArtJs.onWindowLoad = new ArtJs.CustomEvent('window:load');
ArtJs.onLibraryLoad = new ArtJs.CustomEvent('library:load');

document.addEventListener('DOMContentLoaded', function() {
  ArtJs.Component._init();
  ArtJs.onDocumentLoad.fire();
}, false);

window.addEventListener('load', function() {
  ArtJs.onWindowLoad.fire();
}, false);

ArtJs.ArrayUtils._init();
ArtJs.ObjectUtils._init();
ArtJs.ElementBuilder._init();
ArtJs.ElementUtils._init();
ArtJs.Selector._init();
ArtJs.TemplateLibrary._init();
