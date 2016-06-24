define( [
    
  ], 
  function() {
    'use strict';

    var _view = function(id) {
      this.id = id;
      this.firstActivation = true;
      this.container = null;
    };

    _view.prototype.id = null;
    _view.prototype.firstActivation = null;
    _view.prototype.container = null;

    _view.prototype.setup = function() {

    };

    _view.prototype.activate = function() {
      if(this.firstActivation) {
        this.setup();
        this.firstActivation = false;
      }
    };

    _view.prototype.animate = function() {
    };

    _view.prototype.resize = function(w, h) {
      console.log('VIEW resize');
    };

    return _view;
});
