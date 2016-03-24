var wildcardParser = require('../lib/wildcard_parser');
var should = require('should');

describe('wildcardParser', function describeWildcardParser() {
  describe('#parseWildcard', function describeWildcardParse() {
    it('should return error if no wildcard found', function test() {
      should.not.exist(wildcardParser('nowildcard'));
    });

    it('should return wildcard entity if start with ?', function test() {
      var entity =  wildcardParser('?startwithwildcard');
      entity.codes.length.should.equal(1);
      entity.type.should.equal('wildcard');
    });

    it('should return wildcard entity if wildcard has ? in middle', function test() {
        var entity = wildcardParser('wild?card');
        entity.codes.length.should.equal(1);
        entity.type.should.equal('wildcard');
    });

    it('should return wildcard entity if wildcard has ?? in middle', function test() {
        var entity = wildcardParser('wild??card');
        entity.codes.length.should.equal(1);
        entity.type.should.equal('wildcard');
    });

    it('should return wildcard entity if end with ?', function test() {
      var entity =  wildcardParser('endwithwildcard?');
      entity.codes.length.should.equal(1);
      entity.type.should.equal('wildcard');
    });
    
    it('should return wildcard entity if end with *', function test() {
      var entity =  wildcardParser('endwithwildcard?');
      entity.codes.length.should.equal(1);
      entity.type.should.equal('wildcard');
    });

  });
});
