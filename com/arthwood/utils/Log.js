ArtJs.log = function() {
  if (console) {
    console.log(ArtJs.$A(arguments));
  }
};

ArtJs.p = ArtJs.log;
