artjs.$A = artjs.Delegate.callback(artjs.Array, 'arrify');
artjs.$DC = artjs.Delegate.callback(artjs.Delegate, 'callback');
artjs.$F = artjs.Delegate.callback(artjs.Delegate, 'func');
artjs.$D = artjs.Delegate.callback(artjs.Delegate, 'create');
artjs.$BA = artjs.Delegate.callback(artjs.Delegate, 'bindAll');
artjs.$DT = artjs.Delegate.callback(artjs.Delegate, 'delegateTo');
artjs.$T = artjs.Delegate.callback(artjs.Timeout, 'fire');

artjs.Array.contains = artjs.Array.includes; 
artjs.Array.containsAll = artjs.Array.includesAll; 
