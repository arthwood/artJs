artjs.log = function() {
  if (typeof console === "object") {
    console.log(artjs.$A(arguments));
  }
};

artjs.p = artjs.log;
