var ClassBuilder = pl.arthwood.utils.ClassBuilder = {
  build: function(class_, instanceMethods, staticMethods) {
    class_.prototype = instanceMethods;

    ObjectUtils.copyProps(staticMethods, class_);

    return class_;
  }
};
