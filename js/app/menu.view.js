define( [
    './view',
    './close.button'
  ],
  function(View, CloseButton) {
    'use strict';

    var _obj = function(id) {
      View.call(this, id, true);
      this.nav = null;
      this.hamburger = null;
    };

    _obj.prototype = Object.create(View.prototype);
    _obj.prototype.contructor = _obj;

    _obj.prototype.activate = function() {
      View.prototype.activate.call(this);
    };

    _obj.prototype.setup = function() {
      View.prototype.setup.call(this);

      this.nav = this._drawNavContainer();
      this.hamburger = this._drawHamburger(); 

      this.nav.x = -this.nav.width;

      this.addChild(this.hamburger);
      this.addChild(this.nav);

      //this._openNav();
    };

    _obj.prototype._drawHamburger = function() {
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

      /** /
      hamb.on('mousedown', onButtonDown)
            .on('mouseup', onButtonUp)
            .on('mouseupoutside', onButtonUp)
            .on('touchstart', onButtonDown)
            .on('touchend', onButtonUp)
            .on('touchendoutside', onButtonUp);
      /**/

      hamb.on('click', this._openNav.bind(this));

      hamb.addChild(graphics);

      return hamb;
    };

    _obj.prototype._drawNavContainer = function() {
      var nav = new PIXI.Container();
      nav.interactive = true;

      nav.bg = new PIXI.Graphics();
      nav.bg.beginFill(0xFFFFFF);
      nav.bg.drawRect(0, 0, 300, 100);
      nav.bg.endFill();

      nav.addChild(nav.bg);

      nav.closeBtn = new CloseButton();
      nav.closeBtn.x = 240;
      nav.closeBtn.y = 20;
      nav.addChild(nav.closeBtn);

      nav.closeBtn.on('click', this._closeNav.bind(this));

      return nav;
    };

    /** /
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
    /**/

    _obj.prototype._openNav = function() {
      TweenMax.to(this.nav, 1, {x: 0, ease:Expo.easeOut});
    };

    _obj.prototype._closeNav = function() {
      TweenMax.to(this.nav, 1, {x: -this.nav.width, ease:Expo.easeOut});
    };

    _obj.prototype.resize = function(w, h) {
      View.prototype.resize.call(this, w, h);

      this.nav.bg.height = h;

    };

    _obj.prototype.animate = function() {
      View.prototype.animate.call(this);
    };

    return _obj;
});
