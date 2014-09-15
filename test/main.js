/*globals before,it*/
'use strict';

var should = require('should');
var localStorage = require('localStorage');
var fissionLocal = require('../');

describe('fission-localstorage', function() {

  before(function() {
    global.window = {};
    global.window.localStorage = localStorage;
  });

  var testModel = {};

  it('should create', function(done) {
    fissionLocal('create', {
      name: 'data1',
      url: 'test',
      _values: {
        name: 'data1'
      }
    },
    {
      success: function(data){
        should.exist(data);
        should.exist(data.id);
        String(data.name).should.equal('data1');
        testModel = data;  // Set fixture for following tests
        return done();
      }
    });
  });

  it('should read', function(done) {
    fissionLocal('read', {
      id: testModel.id,
      url: testModel.url
    },
    {
      success: function(data){
        should.exist(data);
        should.exist(data.id);
        String(data.name).should.equal('data1');
        String(data.id).should.equal(testModel.id);
        String(data.url).should.equal(testModel.url);
        return done();
      }
    });
  });

  it('should update', function(done) {
    fissionLocal('update', {
      id: testModel.id,
      name: 'new-data',
      url: testModel.url,
      _values: {
        name: 'new-data'
      }
    },
    {
      success: function(data){
        should.exist(data);
        should.exist(data.id);
        String(data.name).should.equal('new-data');
        String(data.id).should.equal(testModel.id);
        String(data.url).should.equal(testModel.url);
        return done();
      }
    });
  });

  it('should delete', function(done) {

    fissionLocal('delete', {
      id: testModel.id,
      url: testModel.url
    },
    {
      success: function(data){
        should.not.exist(data);
        should.equal(data, null);
        return done();
      }
    });
  });
});
