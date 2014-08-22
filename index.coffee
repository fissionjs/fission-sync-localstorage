PLUGIN_NAME = 'fission-localstorage'

createId = ->
  timestamp = new Date().getTime()
  machine = Math.floor Math.random() * 16777216
  pid = Math.floor Math.random() * 32767
  "00000000".substr(0, 8 - timestamp.length) + timestamp + "000000".substr(0, 6 - machine.length) + machine + "0000".substr(0, 4 - pid.length) + pid

actions =
  store: ->
    store = window.localStorage
    throw "#{PLUGIN_NAME}: localStorage not supported by Browser" unless store
    return store

  serialize: (model) ->
    return JSON.stringify model

  deserialize: (model) ->
    return JSON.parse model

  find: (model, opts) ->
    return @deserialize @store().getItem "#{opts.collection}-#{model.id}"


plugin =
  create: (model, opts) ->
    model.id ?= createId()
    actions.store().setItem "#{opts.collection}-#{model.id}", actions.serialize model
    return actions.find model, opts

  read: (model, opts) ->

    return actions.find model, opts

  update: (model, opts) ->
    return @create model, opts


  delete: (model, opts) ->
    actions.store().removeItem "#{opts.collection}-#{model.id}"


module.exports = (method, model, options, cb) ->
  throw "#{PLUGIN_NAME}: undefined method: #{method}" unless plugin[method]?
  throw "#{PLUGIN_NAME}: model is required" unless model?
  throw "#{PLUGIN_NAME}: options.collection is required" unless options.collection?
  run = plugin[method] model, options
  if cb
    return cb run
  return run
