# What can it do for you?
ArtJs is JavaScript framework of general purpose. Among many features it offers:

* selecting or manipulation DOM elements
* performing AJAX requests
* lots of built in helpers for Object, Array, String, Date, etc.
* templates for dynamic content rendering
* component class that allows you to define behaviour of UI elements
* built in testing framework
* visual effects
* UI library

# Where can you run it?

Currently it supports FF, Chrome, Safari, Opera, IE10.

#How you use it?

Just include art-min.js file in your head section.

# What are the options?

You can optionally use two following methods:
```
ArtJs.globalize()
```

Which makes all the classes globally accessible in window object, as well as shorthand utility methods like `$, $P, $B, $D, $DC, $E.`
  
```
ArtJs.doInjection()
```

Which makes an extensions on native classes like Object, Array, Date, Element etc. so that you can use `arr.first()`
Otherwise you are still able to call the method using `ArtJs.ArrayUtils.first(arr)`
