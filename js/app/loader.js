define( [
    
  ], 
  function() {
    'use strict';
    var _initialized = false;
    var _allLoaded = new signals.Signal();
    var loader = PIXI.loader;

    var _add = function(srcArgs) {
      // TODO : add uniq
      loader.add.apply(loader, arguments);
    };

    var _load = function() {
      loader.once('complete',onAssetsLoaded);
      loader.load();
    };

    function onAssetsLoaded()
    {
      _allLoaded.dispatch();
    }

    var _singleton = {
      allLoaded: _allLoaded,
      load: _load,
      add: _add
    };
    return _singleton;
});
