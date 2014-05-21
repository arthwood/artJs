ArtJs.log = function() {
  if (typeof console === "object") {
    console.log(ArtJs.$A(arguments));
  }
};

ArtJs.p = ArtJs.log;
