define( [
    './view.manager'
  ], 
  function(ViewManager) {
    'use strict';

    var _view = function(id, isManager) {
      PIXI.Container.call(this);
      this.id = id;
      this.firstActivation = true;

      if(isManager) {
        this.prototype.manager = new ViewManager();
      }
    };
    _view.prototype = Object.create(PIXI.Container.prototype);
    _view.prototype.contructor = _view;

    _view.prototype.id = null;
    _view.prototype.firstActivation = null;

    _view.prototype.setup = function() {
      console.log('setup: view');
    };

    _view.prototype.activate = function() {
      if(this.firstActivation) {
        this.setup();
        this.firstActivation = false;
      }
    };

    _view.prototype.animate = function() {
      if(this.manager) {
        this.manager.animate();
      }
    };

    _view.prototype.resize = function(w, h) {
      if(this.manager) {
        this.manager.resize();
      }
      console.log('VIEW resize');
    };

    return _view;
});
