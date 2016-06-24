define( [
    './view',
    './app.model'
  ],
  function(View, AppModel) {
    'use strict';

    var decor, vespa, imageWidth, imageHeight, displacementFilter, mask;
    var offset = 1;
    var tick = 0;

    var decorTexture = PIXI.Texture.fromImage('img/pondFloor.jpg');
    var displacementSprite = PIXI.Sprite.fromImage("img/displacementMap.jpg");

    var _obj = function(id) {
      View.call(this, id);
    };
    _obj.prototype = Object.create(View.prototype);
    _obj.prototype.contructor = _obj;

    _obj.prototype.setup = function() {

      View.prototype.setup.call(this);

      decor = new PIXI.Sprite(decorTexture);
      imageWidth = decor.width;
      imageHeight = decor.height;
      decor.anchor.x = 0.5;
      decor.anchor.y = 0.5;
      decor.position.x = AppModel.fullWidth / 2;
      decor.position.y = AppModel.fullHeight / 2;

      window.decorTexture = decorTexture;
      window.displacementFilter = displacementFilter;

      vespa = new PIXI.Sprite(PIXI.Texture.fromImage('img/vespa.png'));
      vespa.anchor.x = 0.5;
      vespa.anchor.y = 0.5;
      vespa.position.x = AppModel.fullWidth / 2;
      vespa.position.y = AppModel.fullHeight / 2;
      vespa.blendMode = PIXI.BLEND_MODES.ADD;

      var mask = new PIXI.Graphics();
      mask.beginFill(0xe74c3c); // Red
      mask.drawCircle(600, 400, 300);
      mask.endFill();

      vespa.mask = mask;

      this.container = new PIXI.Container();
      this.container.addChild(decor);
      this.container.addChild(vespa);

      displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
      this.container.filters = [displacementFilter];
      displacementFilter.scale.x = displacementFilter.scale.x = 25;

    };

    _obj.prototype.activate = function() {
      View.prototype.activate.call(this);
    };

    _obj.prototype.resize = function(w, h) {
      View.prototype.resize.call(this, w, h);

      decor.position.x = AppModel.fullWidth / 2;
      decor.position.y = AppModel.fullHeight / 2;

      vespa.position.x = AppModel.fullWidth / 2;
      vespa.position.y = AppModel.fullHeight / 2;

      var widthRatio = AppModel.fullWidth / imageWidth;
      var heightRatio = AppModel.fullHeight / imageHeight;

      var ratio = widthRatio; //default to the width ratio until proven wrong
      if (widthRatio < heightRatio) {
        ratio = heightRatio;
      }
      decor.scale = new PIXI.Point(ratio, ratio);
    };

    _obj.prototype.animate = function() {
      View.prototype.animate.call(this);

      tick += 0.1;

      //@console.log('Math.sin(tick): ', Math.sin(tick));

      var sinTick = Math.sin(tick+Math.random());
      var cosTick = Math.cos(tick+Math.random());

      displacementFilter.scale.x += sinTick*Math.random();
      displacementFilter.scale.y += cosTick*Math.random();
      
    };

    return _obj;
});
