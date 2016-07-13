define( [
    './view'
  ],
  function(View) {
    'use strict';

    var _obj = function(id) {
      View.call(this, id, true);
      //View.call(this, id, true);
    };
    _obj.prototype = Object.create(View.prototype);
    _obj.prototype.contructor = _obj;

    _obj.prototype.activate = function() {
      View.prototype.activate.call(this);
    };

    _obj.prototype.setup = function() {
      View.prototype.setup.call(this);

      console.log('setup: menu');

      this.nav = _drawNavContainer();
      this.hamburger = _drawHamburger();

      this.nav.x = -this.nav.width;

      this.addChild(this.hamburger);
      this.addChild(this.nav);
    };

    function _drawHamburger() {
      console.log('_drawHamburger');
      var hamb = new PIXI.Container();
      hamb.interactive = true;

      var graphics = new PIXI.Graphics();
      graphics.beginFill(0x000000);
      graphics.drawRect(10, 10, 30, 30);
      graphics.endFill();
      graphics.beginFill(0xFFFFFF);
      graphics.drawRoundedRect(10, 10, 30, 3, 2);
      graphics.drawRoundedRect(10, 16, 30, 3, 2); 
      graphics.drawRoundedRect(10, 22, 30, 3, 2); 
      graphics.drawRoundedRect(10, 28, 30, 3, 2); 
      graphics.endFill();

      hamb.on('mousedown', onButtonDown)
      .on('mouseup', onButtonUp)
      .on('mouseupoutside', onButtonUp)
      .on('touchstart', onButtonDown)
      .on('touchend', onButtonUp)
      .on('touchendoutside', onButtonUp);

      hamb.addChild(graphics);

      return hamb;
    }

    var touched = false;

    function onButtonDown() {
      touched = true;
    }

    function onButtonUp() {
      if(touched) {
        _openNav();
        touched = false;
      }
    }

    function _drawNavContainer() {
      var nav = new PIXI.Container();
      nav.interactive = true;

      nav.bg = new PIXI.Graphics();
      nav.bg.beginFill(0xFFFFFF);
      nav.bg.drawRect(0, 0, 300, 100);
      nav.bg.endFill();

      nav.addChild(nav.bg);

      return nav;
    }

    function _drawCloseButton() {

    }

    function _openNav() {
      console.log('_openNav');
      TweenMax.to(this.nav, 1, {x: 0, ease:Expo.easeOut});
    }

    function _closeNav() {
      console.log('_openNav');
      this.nav.x = -this.nav.width;
    }

    _obj.prototype.resize = function(w, h) {
      View.prototype.resize.call(this, w, h);

      this.nav.bg.height = h;

    };

    _obj.prototype.animate = function() {
      View.prototype.animate.call(this);
    };

    return _obj;
});
