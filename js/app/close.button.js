define( [
  ],
  function() {
    'use strict';

    var CloseButton = function() {
      PIXI.Container.call(this);
      this._draw();
      this.interactive = true;
    };
    CloseButton.prototype = Object.create(PIXI.Container.prototype);
    CloseButton.prototype.contructor = CloseButton;

    CloseButton.prototype._draw = function() {
      var w = 30;
      var h = 30;
      var e = 3;
      var rounded = 2;
      var bg = _getRect(w, h, 0x000000, 0.5);
      var line1 = _getRoundRect(w, e, rounded, 0x000000);
      var line2 = _getRoundRect(w, e, rounded, 0x000000);
      line1.x = line2.x = line1.y = line2.y = w/2;
      line1.pivot = line2.pivot = new PIXI.Point(w/2, e/2);
      line1.rotation = 45*(Math.PI/180);
      line2.rotation = -45*(Math.PI/180);
      this.addChild(bg);
      this.addChild(line1);
      this.addChild(line2);
    };

    function _getRoundRect(w, h, roundedValue, color) {
      var graph = new PIXI.Graphics();
      graph.beginFill(color);
      graph.drawRoundedRect(0, 0, w, h, roundedValue);
      graph.endFill();
      return graph;
    }

    function _getRect(w, h, color, alpha) {
      var graph = new PIXI.Graphics();
      graph.beginFill(color||0xFF0000, alpha||1);
      graph.drawRect(0, 0, w, h);
      graph.endFill();
      return graph;
    }

    return CloseButton;
});
