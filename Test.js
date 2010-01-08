ArtJs.globalize();
ArtJs.doInjection();

window.onload = function() {
  /*
  var arr = $$('.second');
  var root = arr.first();
  p(root);
  */
  //var obj = {a: 5, b: 'text', c: true, k: 5};
  
  //p(obj.toArray());
  
  var arr = [1, 2, 3, 4, 5];
  
  p(arr.map(function(i) { return i + 1;}));
  p(arr.inject(0, function(mem, i) { return mem + i;}));

  //p($up(root, '.clearfix'));
  
  //var url = 'http://localhost:3000/maps?search_map[tag]=&search_map[keywords]=east&search_map[address]=&search_map[radius]=1&commit=SUBMIT';
  //var ajax = new Ajax(url, {});

  //ajax.request();
};
