ArtJs.globalize();
ArtJs.doInjection();

window.onload = function() {
  /*
  var arr = $$('.second');
  var root = arr.first();
  p(root);
  */
  var obj = {a: 5, b: 'text', c: true, k: 5};

  p(obj.toArray());
  //p($up(root, '.clearfix'));
};
