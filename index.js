var PLUGIN_NAME, actions, createId, plugin;

PLUGIN_NAME = 'fission-localstorage';

createId = function() {
  var machine, pid, timestamp;
  timestamp = new Date().getTime();
  machine = Math.floor(Math.random() * 16777216);
  pid = Math.floor(Math.random() * 32767);
  return "00000000".substr(0, 8 - timestamp.length) + timestamp + "000000".substr(0, 6 - machine.length) + machine + "0000".substr(0, 4 - pid.length) + pid;
};

actions = {
  store: function() {
    var store;
    store = window.localStorage;
    if (!store) {
      throw "" + PLUGIN_NAME + ": localStorage not supported by Browser";
    }
    console.log(store);
    return store;
  },
  serialize: function(model) {
    return JSON.stringify(model);
  },
  deserialize: function(model) {
    return JSON.parse(model);
  },
  find: function(model, opts) {
    console.log(model)
    console.log(opts.collection)
    return this.deserialize(this.store().getItem("" + opts.collection + "-" + model.id));
  }
};

plugin = {
  create: function(model, opts) {
    if (model.id == null) {
      model.id = createId();
    }
    actions.store().setItem("" + opts.collection + "-" + model.id, actions.serialize(model));
    return actions.find(model, opts);
  },
  readAll: function(model, opts) {
    //actions.store().forEach(item) {   
    //}
  },
  read: function(model, opts) {
    console.log(actions.find(model, opts))
    return actions.find(model, opts);
  },
  update: function(model, opts) {
    return this.create(model, opts);
  },
  "delete": function(model, opts) {
    return actions.store().removeItem("" + opts.collection + "-" + model.id);
  }
};

module.exports = function(method, model, options, cb) {
  console.log(method, model, options)
  var run;
  if (plugin[method] == null) {
    throw "" + PLUGIN_NAME + ": undefined method: " + method;
  }
  if (model == null) {
    throw "" + PLUGIN_NAME + ": model is required";
  }

  if (!model.id) {
    method = 'readAll';
  }

  //if (options.collection == null) {
  //  throw "" + PLUGIN_NAME + ": options.collection is required";
  //}
  options.collection = 'todoz'
  run = plugin[method](model, options);
  if (cb) {
    return cb(run);
  }
  return run;
};
