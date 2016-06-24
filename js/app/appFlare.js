define([
    './loader'
  ],
  function(Loader) {
    'use strict';
    var _initialized = false;
    var hasToResize = false;
    var renderer, stage, fullWidth, fullHeight, decor, lunettes, imageWidth, imageHeight;
    var offset = 1;
    var decorTexture = PIXI.Texture.fromImage('img/decor.jpg');

    var _init = function() {

      fullWidth = window.innerWidth;
      fullHeight = window.innerHeight;

      stage = new PIXI.Stage(0x66FF99);
      renderer = PIXI.autoDetectRenderer(fullWidth, fullHeight);
      document.body.appendChild(renderer.view);

      Loader.init();
      Loader.allLoaded.add(onLoaderComplete);
    };

    function onLoaderComplete() {
      console.log('onLoaderComplete: ');
      decor = new PIXI.Sprite(decorTexture);
      imageWidth = decor.width;
      imageHeight = decor.height;
      decor.anchor.x = 0.5;
      decor.anchor.y = 0.5;
      decor.position.x = fullWidth / 2;
      decor.position.y = fullHeight / 2;
      stage.addChild(decor);

      displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
      decor.filters = [displacementFilter];

      displacementFilter.scale.x = displacementFilter.scale.x = 25;
      blurFilter.blur = 4;
      blurFilter.blur = 4;

      window.decorTexture = decorTexture;
      window.displacementFilter = displacementFilter;

      lunettes = new PIXI.Sprite(PIXI.Texture.fromImage('img/lunettes.png'));
      lunettes.anchor.x = 0.5;
      lunettes.anchor.y = 0.5;
      lunettes.position.x = fullWidth / 2;
      lunettes.position.y = fullHeight / 2;
      stage.addChild(lunettes);

      resize();
      animate();
    }

    var tick = 0;

    function animate() {


      requestAnimationFrame(animate);

      tick += 0.1;

      //@console.log('Math.sin(tick): ', Math.sin(tick));

      var sinTick = Math.sin(tick + Math.random());
      var cosTick = Math.cos(tick + Math.random());

      displacementFilter.scale.x += sinTick * Math.random();
      displacementFilter.scale.y += cosTick * Math.random();

      //displacementFilter.maskMatrix.scale(sinTick*10, sinTick*10);

      if (hasToResize) {
        resize();
        hasToResize = false;
      }

      renderer.render(stage);
    }

    function resize() {

      renderer.resize(fullWidth, fullHeight);

      decor.position.x = fullWidth / 2;
      decor.position.y = fullHeight / 2;

      lunettes.position.x = fullWidth / 2;
      lunettes.position.y = fullHeight / 2;

      var widthRatio = fullWidth / imageWidth;
      var heightRatio = fullHeight / imageHeight;

      console.log('imageWidth: ', imageWidth);
      console.log('imageHeight: ', imageHeight);

      var ratio = widthRatio; //default to the width ratio until proven wrong
      if (widthRatio < heightRatio) {
        ratio = heightRatio;
      }

      console.log('ratio: ', ratio);

      decor.scale = new PIXI.Point(ratio, ratio);

    }

    function resizeHandler() {
      if (fullWidth !== window.innerWidth || fullHeight !== window.innerHeight) {
        fullWidth = window.innerWidth;
        fullHeight = window.innerHeight;
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
