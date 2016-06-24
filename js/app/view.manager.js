define( [
  ], 
  function() {
    'use strict';

    var _viewCollection = [];
    var _actives = [];

    var _singleton = {
        add: function(view) {
          _viewCollection.push(view);
        },
        getViewBiId: function(id) {
          return _.find(_viewCollection, {id: id});
        },
        setActive: function(view) {
          _actives.push(view);
          view.activate();
        },
        setInactive: function(view) {
          _.pull(_actives, view);
        },
        resize: function(fullWidth, fullHeight) {
          _actives.map( function(item) {
            item.resize(fullWidth, fullHeight);
          });
        },
        animate: function() {
          _actives.map( function(item) {
            item.animate();
          });
        }
    };
    return _singleton;
});
