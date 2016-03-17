var zipParser = require('../lib/zip_parser');
var should = require('should');

describe('zipParser', function describeZipParser() {
  describe('#parseZip', function describeZipParse() {
    it('should return error if contain other than numbers and letters', function test() {
      should.not.exist(zipParser('ab%%12'));
    });

    it('should return one zipcoderange entity', function test() {
      var entity = zipParser('41114');
      entity.type.should.equal('code');
      entity.codes.length.should.equal(1);
      entity.codes[0].should.equal('41114');
    });

    it('should return one zipcoderange entity if contain space', function test() {
      var entity = zipParser('411 14');
      entity.type.should.equal('code');
      entity.codes.length.should.equal(1);
      entity.codes[0].should.equal('411 14');
    });
  });
});
