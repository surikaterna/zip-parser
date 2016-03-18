var wildcardParser = require('../lib/wildcard_parser');
var should = require('should');

describe('zipParser', function describeZipParser() {
  describe('#parseZip', function describeZipParse() {
    it('should return error if no wildcard found', function test() {
      should.not.exist(wildcardParser('nowildcard'));
    });

    it('should return error if not ending with wildcard', function test() {
      should.not.exist(wildcardParser('wild*card'));
    });

    it('should return error if not ending with wildcard', function test() {
      should.not.exist(wildcardParser('wild?card'));
    });

    it('should return error if ending with mutiple wildcards', function test() {
      should.not.exist(wildcardParser('wild?*'));
      should.not.exist(wildcardParser('wild*?'));
      should.not.exist(wildcardParser('wild**'));
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
