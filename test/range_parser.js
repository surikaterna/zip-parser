var zipRangeParser = require('../lib/range_parser');
require('should');

describe('rangeParser', function describeRangeParser() {
  describe('#parseZipRange', function describeRangeParse() {
    it('should return error if contain more than one -', function test() {
      (function parse() {
        zipRangeParser('1-2-3');
      }).should.throw('Could not parse zipcode range');
    });

    it('should return error if missing from statement', function test() {
      (function parse() {
        zipRangeParser('-1');
      }).should.throw('From is not a number');
    });

    it('should return error if missing to statement', function test() {
      (function parse() {
        zipRangeParser('1-');
      }).should.throw('To is not a number');
    });

    it('should return error if from is not number', function test() {
      (function parse() {
        zipRangeParser('a-2');
      }).should.throw('From is not a number');
    });

    it('should return error if to is not number', function test() {
      (function parse() {
        zipRangeParser('1-a');
      }).should.throw('To is not a number');
    });

    it('should return one zipcoderange entity', function test() {
      var entity = zipRangeParser('1-2');
      entity.type.should.equal('range');
      entity.from.should.equal(1);
      entity.to.should.equal(2);
    });
  });
});
