should = require 'should'
localStorage = require 'localStorage'
fissionLocal = require '../'

describe 'fission-localstorage', ->
  beforeEach ->
    global.window = {}
    global.window.localStorage = localStorage

  it 'should create', (done) ->
    fissionLocal 'create', {name: "data1"}, {collection: 'Items'}, (data) ->
      data.should.not.be.null
      data.name.should.equal 'data1'
      data.id.should.exist
      done()

  it 'should read', (done) ->
    fissionLocal 'create', {name: "data2"}, {collection: 'Items'}, (data) ->
      fissionLocal 'read', {id: data.id}, {collection: 'Items'}, (out) ->
        data.should.not.be.null
        data.name.should.equal 'data2'
        data.id.should.exist
        done()

  it 'should update', (done) ->
    fissionLocal 'create', {name: "data3"}, {collection: 'Items'}, (data) ->
      fissionLocal 'update', {id: data.id, name: 'new-data'}, {collection: 'Items'}, (out) ->
        fissionLocal 'read', {id: data.id}, {collection: 'Items'}, (data) ->
          data.should.not.be.null
          data.name.should.equal 'new-data'
          data.id.should.exist
          done()

  it 'should delete', (done) ->
    fissionLocal 'create', {name: "data4"}, {collection: 'Items'}, (data) ->
      fissionLocal 'delete', {id: data.id, name: 'new-data'}, {collection: 'Items'}, (out) ->
        fissionLocal 'read', {id: data.id}, {collection: 'Items'}, (data) ->
          should.not.exist data
          should.equal data, null
          done()
