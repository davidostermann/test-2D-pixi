define( [
  ], 
  function() {
    'use strict';

    var _manager = function() {
      this.persistentCollection = [];
      this.viewCollection = [];
      this.actives = [];
    };

    _manager.prototype.add = function(view) {
      this.viewCollection.push(view);
    };

    _manager.prototype.addPersistent = function(view) {
      this.persistentCollection.push(view);
    };

    _manager.prototype.getViewBiId = function(id) {
      return _.find(this.viewCollection, {id: id});
    };

    _manager.prototype.getPersitentViewBiId = function(id) {
      return _.find(this.persistentCollection, {id: id});
    };

    _manager.prototype.setActive = function(view) {
      this.actives.push(view);
      view.activate();
    };

    _manager.prototype.setInactive = function(view) {
      _.pull(this.actives, view);
    };

    _manager.prototype.resize = function(fullWidth, fullHeight) {
      this.actives.map( function(item) {
        item.resize(fullWidth, fullHeight);
      });
      this.persistentCollection.map( function(item) {
        item.resize(fullWidth, fullHeight);
      });
    };

    _manager.prototype.animate = function() {
      this.actives.map( function(item) {
        item.animate();
      });
      this.persistentCollection.map( function(item) {
        item.animate();
      });
    };

    return _manager;
});
