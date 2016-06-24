define([
    './loader',
    './app.model',
    './view.manager',
    './water.view',
    './flare.view'
  ],
  function(Loader, AppModel, ViewManager, WaterView, FlareView) {
    'use strict';
    var _initialized = false;
    var hasToResize = false;

    var _init = function() {

      AppModel.fullWidth = window.innerWidth;
      AppModel.fullHeight = window.innerHeight;

      AppModel.stage = new PIXI.Stage(0x66FF99);
      AppModel.renderer = PIXI.autoDetectRenderer(AppModel.fullWidth, AppModel.fullHeight);
      document.body.appendChild(AppModel.renderer.view);

      ViewManager.add(new WaterView('water'));
      ViewManager.add(new FlareView('flare'));

      Loader.add('img/vespa.png', 'img/pondFloor.jpg', 'img/displacementMap.jpg');
      Loader.add('img/decor.jpg', 'img/lensFlare.jpg');
      Loader.allLoaded.add(onLoaderComplete);
      Loader.load();
    };

    function onLoaderComplete() {

      var newView = ViewManager.getViewBiId('water');
      ViewManager.setActive(newView);
      AppModel.stage.addChild(newView.container);

      resize();
      animate();
    }

    function animate() {

      requestAnimationFrame(animate);

      if (hasToResize) {
        resize();
        hasToResize = false;
      }

      ViewManager.animate();

      AppModel.renderer.render(AppModel.stage);
    }

    function resize() {
      AppModel.renderer.resize(AppModel.fullWidth, AppModel.fullHeight);
      ViewManager.resize(AppModel.fullWidth, AppModel.fullHeight);
    }

    function resizeHandler() {
      if (AppModel.fullWidth !== window.innerWidth || AppModel.fullHeight !== window.innerHeight) {
        AppModel.fullWidth = window.innerWidth;
        AppModel.fullHeight = window.innerHeight;
        hasToResize = true;
      }
    }

    window.addEventListener('resize', _.debounce(resizeHandler, 150));


    var _singleton = {
      init: function() {
        if (!_initialized) {
          _init();
          _initialized = true;
        }
      }
    };
    return _singleton;
  });
