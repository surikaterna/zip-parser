var regexpParser = require('../lib/regexp_parser');
var should = require('should');

describe('regexpParser', function describeRegexpParser() {
  describe('#parseRegexp', function describeRegexpParse() {
    it('should return error if contain other than numbers and letters', function test() {
      should.not.exist(regexpParser('^\d{5}(?:[-\s]\d{4})?$'));
    });

    it('should return error if missing end', function test() {
      should.not.exist(regexpParser('/missingend'));
    });

    it('should return error if missing start', function test() {
      should.not.exist(regexpParser('missingstart/'));
    });

    it('should return one regexp entity', function test() {
      var entity = regexpParser('/^\d{5}(?:[-\s]\d{4})?$/');
      entity.type.should.equal('regexp');
      entity.codes.length.should.equal(1);
      entity.codes[0].should.equal('/^\d{5}(?:[-\s]\d{4})?$/');
    });
  });
});
