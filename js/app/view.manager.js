define( [
  ], 
  function() {
    'use strict';

    var _persistentCollection = [];
    var _viewCollection = [];
    var _actives = [];

    var _manager = function() {
      
    };

    _manager.prototype.add = function(view) {
      _viewCollection.push(view);
    };

    _manager.prototype.addPersistent = function(view) {
      _persistentCollection.push(view);
    };

    _manager.prototype.getViewBiId = function(id) {
      return _.find(_viewCollection, {id: id});
    };

    _manager.prototype.getPersitentViewBiId = function(id) {
      return _.find(_persistentCollection, {id: id});
    };

    _manager.prototype.setActive = function(view) {
      _actives.push(view);
      view.activate();
    };

    _manager.prototype.setInactive = function(view) {
      _.pull(_actives, view);
    };

    _manager.prototype.resize = function(fullWidth, fullHeight) {
      _actives.map( function(item) {
        item.resize(fullWidth, fullHeight);
      });
      _persistentCollection.map( function(item) {
        item.resize(fullWidth, fullHeight);
      });
    };

    _manager.prototype.animate = function() {
      _actives.map( function(item) {
        item.animate();
      });
      _persistentCollection.map( function(item) {
        item.animate();
      });
    };

    return _manager;
});
