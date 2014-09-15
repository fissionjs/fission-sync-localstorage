/*globals window,module*/
'use strict';

var PLUGIN_NAME = 'fission-sync-localstorage';

var createId = function() {
  var timestamp = new Date().getTime();
  var machine = Math.floor(Math.random() * 16777216);
  var pid = Math.floor(Math.random() * 32767);
  var id = '00000000'.substr(0, 8 - timestamp.length) + timestamp;
  id += '000000'.substr(0, 6 - machine.length) + machine;
  id += '0000'.substr(0, 4 - pid.length) + pid;
  return id;
};

var actions = {
  store: function() {
    var store;
    store = window.localStorage;
    if (!store) {
      throw PLUGIN_NAME + ': localStorage not supported by Browser';
    }
    return store;
  },
  serialize: function(model) {
    return JSON.stringify(model);
  },
  deserialize: function(model) {
    return JSON.parse(model);
  },
  find: function(model) {
    return this.deserialize(this.store().getItem(model.url + '/' + model.id));
  }
};

var plugin = {
  create: function(model, cb) {
    if (!model.id) {
      model.id = createId();
    }
    if (model.url.indexOf(model.id) > -1) {
      model.url = model.url.replace('/'+model.id, '');
    }
    model._values.url = model.url;
    model._values.id = model.id;

    actions.store().setItem(model.url + '/' + model.id, actions.serialize(model._values));
    if (cb) {
      return cb(null, actions.find(model));
    }
    return actions.find(model);
  },
  readAll: function(model, cb) {
    var items = [];
    var count = 0;
    for (var i in actions.store()) {
      count ++;
      var item = actions.store().getItem(i);
      item = actions.deserialize(item);
      if (item.url === model.url) {
        items.push(item);
      }
      if (count === actions.store().length) {
        return cb(null, items);
      }
    }
  },
  read: function(model, cb) {
    return cb(null, actions.find(model));
  },
  update: function(model, cb) {
    var item = this.create(model);
    return cb(null, item);
  },
  'delete': function(model, cb) {
    if (model.url.indexOf(model.id) === -1) {
      model.url = model.url + '/'+model.id;
    }
    actions.store().removeItem(model.url);
    return cb(null, null);
  }
};

module.exports = function(method, model, options) {

  if (!plugin[method]) {
    throw PLUGIN_NAME + ': undefined method: ' + method;
  }
  if (!model) {
    throw PLUGIN_NAME + ': model is required';
  }
  if (!model.url) {
    throw PLUGIN_NAME + ': model.url is required to be set to the collection name';
  }


  if (!model.id && method === 'read') {
    method = 'readAll';
  }

  model.url = model.url;
  if (typeof model.url === 'function') {
    model.url = model.url();
  }

  plugin[method](model, function(err, data) {
    if (err) {
      return options.error(data);
    }
    return options.success(data);
  });

};
