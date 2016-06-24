define( [
    './view'
  ],
  function(View) {
    'use strict';

    var _child = function(id) {
      View.call(this, id);
    };
    _child.prototype = Object.create(View);
    _child.prototype.contructor = _child;

    _child.prototype.activate = function() {
      View.prototype.activate.call(this);



    };

    return _child;
});
