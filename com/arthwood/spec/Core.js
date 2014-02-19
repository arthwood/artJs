var runner = new ArtJs.SpecRunner();

window.onload = function() {
  this.runner.run();
};

// assetspkg -c config/assets.dev.yml -r . -i 2 --js-bundled ./javascripts --styles-bundled ./stylesheets --nm
// assetspkg -c config/assets.min.yml -r . --js-bundled ./javascripts --styles-bundled ./stylesheets 
