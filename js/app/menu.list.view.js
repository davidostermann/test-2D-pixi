define( [
    './view'
  ], 
  function(View) {
    'use strict';

    var _obj = function(id) {
      View.call(this, id);
    };
    _obj.prototype = Object.create(View.prototype);
    _obj.prototype.contructor = _obj;

    _obj.prototype.activate = function() {
      View.prototype.activate.call(this);
    };

    _obj.prototype.setup = function() {
      View.prototype.setup.call(this);
    };

    return _obj;
});
