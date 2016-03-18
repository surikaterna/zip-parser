var wildcardParser = require('../lib/wildcard_parser');
var should = require('should');

describe('wildcardParser', function describeWildcardParser() {
  describe('#parseWildcard', function describeWildcardParse() {
    it('should return error if no wildcard found', function test() {
      should.not.exist(wildcardParser('nowildcard'));
    });

    it('should return wildcard entity if wildcard * in middle', function test() {
        var entity = wildcardParser('wild*card');
        entity.codes.length.should.equal(1);
    });

    it('should return wildcard entity if wildcard ? in middle', function test() {
        var entity = wildcardParser('wild?card');
        entity.codes.length.should.equal(1);
    });

    it('should return one wildcard entity', function test() {
      var entity = wildcardParser('wild?');
      entity.type.should.equal('wildcard');
      entity.codes.length.should.equal(1);
      entity.codes[0].should.equal('wild?');
    });

    it('should return one wildcard entity', function test() {
      var entity = wildcardParser('411??');
      entity.type.should.equal('wildcard');
      entity.codes.length.should.equal(1);
      entity.codes[0].should.equal('411??');
    });
  });
});
