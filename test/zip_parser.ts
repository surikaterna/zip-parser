import zipParser from '../src/parsers/zipcode';
var should = require('should');

describe('zipParser', function describeZipParser() {
  describe('#parseZip', function describeZipParse() {
    it('should return error if contain other than numbers and letters', function test() {
      should.not.exist(zipParser('ab%%12'));
    });

    it('should return one zipcoderange entity', function test() {
      var entity = zipParser('41114');
      should(entity?.type).equal('code');
      should(entity?.codes.length).equal(1);
      should(entity?.codes[0]).equal('41114');
    });

    it('should return one zipcoderange entity if contain space', function test() {
      var entity = zipParser('411 14');
      should(entity?.type).equal('code');
      should(entity?.codes.length).equal(1);
      should(entity?.codes[0]).equal('411 14');
    });
  });
});
