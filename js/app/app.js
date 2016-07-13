define([
    './loader',
    './app.model',
    './view.manager',
    './water.view',
    './flare.view',
    './menu.view'
  ],
  function(Loader, AppModel, ViewManager, WaterView, FlareView, MenuView) {
    'use strict';
    var _initialized = false;
    var hasToResize = false;
    var viewManager;

    var _init = function() {

      AppModel.fullWidth = window.innerWidth;
      AppModel.fullHeight = window.innerHeight;

      AppModel.stage = new PIXI.Stage(0x66FF99);
      AppModel.renderer = PIXI.autoDetectRenderer(AppModel.fullWidth, AppModel.fullHeight, {backgroundColor:0x000000, antialias: true});
      document.body.appendChild(AppModel.renderer.view);

      viewManager = new ViewManager();
      viewManager.add(new WaterView('water'));
      viewManager.add(new FlareView('flare'));

      viewManager.addPersistent(new MenuView('menu'));

      Loader.add('img/vespa.png', 'img/pondFloor.jpg', 'img/displacementMap.jpg');
      Loader.add('img/decor.jpg', 'img/lensFlare.jpg');
      Loader.allLoaded.add(onLoaderComplete);
      Loader.load();
    };

    function onLoaderComplete() {

      console.log('onLoaderComplete');

      var waterView = viewManager.getViewBiId('water');
      viewManager.setActive(waterView);
      AppModel.stage.addChild(waterView);

      var menuView = viewManager.getPersitentViewBiId('menu');
      menuView.activate();
      AppModel.stage.addChild(menuView);

      resize();
      animate();
    }

    function animate() {

      requestAnimationFrame(animate);

      if (hasToResize) {
        resize();
        hasToResize = false;
      }

      viewManager.animate();

      AppModel.renderer.render(AppModel.stage);
    }

    function resize() {
      AppModel.renderer.resize(AppModel.fullWidth, AppModel.fullHeight);
      viewManager.resize(AppModel.fullWidth, AppModel.fullHeight);
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
