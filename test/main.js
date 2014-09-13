var fissionLocal, localStorage, should;

should = require('should');

localStorage = require('localStorage');

fissionLocal = require('../');

describe('fission-localstorage', function() {
  beforeEach(function() {
    global.window = {};
    return global.window.localStorage = localStorage;
  });
  it('should create', function(done) {
    return fissionLocal('create', {
      name: "data1"
    }, {
      collection: 'Items'
    }, function(data) {
      data.should.not.be["null"];
      data.name.should.equal('data1');
      data.id.should.exist;
      return done();
    });
  });
  it('should read', function(done) {
    return fissionLocal('create', {
      name: "data2"
    }, {
      collection: 'Items'
    }, function(data) {
      return fissionLocal('read', {
        id: data.id
      }, {
        collection: 'Items'
      }, function(out) {
        data.should.not.be["null"];
        data.name.should.equal('data2');
        data.id.should.exist;
        return done();
      });
    });
  });
  it('should update', function(done) {
    return fissionLocal('create', {
      name: "data3"
    }, {
      collection: 'Items'
    }, function(data) {
      return fissionLocal('update', {
        id: data.id,
        name: 'new-data'
      }, {
        collection: 'Items'
      }, function(out) {
        return fissionLocal('read', {
          id: data.id
        }, {
          collection: 'Items'
        }, function(data) {
          data.should.not.be["null"];
          data.name.should.equal('new-data');
          data.id.should.exist;
          return done();
        });
      });
    });
  });
  return it('should delete', function(done) {
    return fissionLocal('create', {
      name: "data4"
    }, {
      collection: 'Items'
    }, function(data) {
      return fissionLocal('delete', {
        id: data.id,
        name: 'new-data'
      }, {
        collection: 'Items'
      }, function(out) {
        return fissionLocal('read', {
          id: data.id
        }, {
          collection: 'Items'
        }, function(data) {
          should.not.exist(data);
          should.equal(data, null);
          return done();
        });
      });
    });
  });
});
