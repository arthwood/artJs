artjs.Fade = artjs.transition.Fade = artjs.Class(
  function(element, value, duration, type, delay, from) {
    this.super('opacity', element, value, duration, type, delay, from);
  },
  null,
  null,
  artjs.TransitionBase
);
