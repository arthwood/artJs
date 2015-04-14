artjs.log = function() {
  if (typeof console === "object") {
    console.log.apply(console, arguments);
  }
};

artjs.p = artjs.log;
