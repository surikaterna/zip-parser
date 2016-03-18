var Parser = require('..').Parser;
var should = require('should');

describe('Parser', function describeParser() {
  var parser = new Parser();
  describe('#parse', function describeParse() {
    it('should return empty array on undefined input', function test() {
      parser.parse().length.should.equal(0);
    });

    it('should return error if no strategies could parse input', function test() {
      should.throws(function parse() {
        parser.parse('no!parser');
      });
    });

    it('should return array with one ziprange', function test() {
      var entity = parser.parse('10000-20000');
      entity.length.should.equal(1);
      entity[0].from.should.equal(10000);
      entity[0].to.should.equal(20000);
    });

    it('should parse 2 zipcode ranges  array with two entities', function test() {
      var entity = parser.parse('10000-20000, 30000-40000');
      entity.length.should.equal(2);
      entity[0].from.should.equal(10000);
      entity[0].to.should.equal(20000);
      entity[1].from.should.equal(30000);
      entity[1].to.should.equal(40000);
    });

    it('should parse zipcode array with 1 zip entity', function test() {
      var entity = parser.parse('41114');
      entity.length.should.equal(1);
      entity[0].codes.length.should.equal(1);
      entity[0].codes[0].should.equal('41114');
    });

    it('should parse 3 zipcodes array with 1 zip entity with 2 codes', function test() {
      var entity = parser.parse('41114, 41276, 41112');
      entity.length.should.equal(1);
      entity[0].codes.length.should.equal(3);
      entity[0].codes[0].should.equal('41114');
      entity[0].codes[1].should.equal('41276');
      entity[0].codes[2].should.equal('41112');
    });

    it('should parse zipcode array with 1 zip entity and 1 range', function test() {
      var entity = parser.parse('41114, 10000-20000');
      entity.length.should.equal(2);
      entity[0].type.should.equal('code');
      entity[0].codes.length.should.equal(1);
      entity[0].codes[0].should.equal('41114');
      entity[1].type.should.equal('range');
      entity[1].from.should.equal(10000);
      entity[1].to.should.equal(20000);
    });

    it('should parse zipcode array with 1 range and 1 zip entity', function test() {
      var entity = parser.parse('10000-20000, 41114');
      entity.length.should.equal(2);
      entity[0].type.should.equal('range');
      entity[0].from.should.equal(10000);
      entity[0].to.should.equal(20000);
      entity[1].type.should.equal('code');
      entity[1].codes.length.should.equal(1);
      entity[1].codes[0].should.equal('41114');
    });

    it('should parse zipcode array with 2 zip entity and 1 range', function test() {
      var entity = parser.parse('41276, 10000-20000, 41114');
      entity.length.should.equal(2);
      entity[0].type.should.equal('code');
      entity[0].codes.length.should.equal(2);
      entity[0].codes[0].should.equal('41276');
      entity[0].codes[1].should.equal('41114');
      entity[1].type.should.equal('range');
      entity[1].from.should.equal(10000);
      entity[1].to.should.equal(20000);
    });

    it('should parse entry array with 1 code, 1 range and 1 regexp', function test() {
      var entity = parser.parse('41276, 10000-20000, /^\d{5}(?:[-\s]\d{4})?$/');
      entity.length.should.equal(3);
      entity[0].type.should.equal('code');
      entity[0].codes.length.should.equal(1);
      entity[0].codes[0].should.equal('41276');
      entity[1].type.should.equal('range');
      entity[1].from.should.equal(10000);
      entity[1].to.should.equal(20000);
      entity[2].type.should.equal('regexp');
      entity[2].codes[0].should.equal('/^\d{5}(?:[-\s]\d{4})?$/');
    });

    it('should parse entry array with 1 regexp and 2 codes', function test() {
      var entity = parser.parse('/*/, /^\d{5}(?:[-\s]\d{4})?$/');
      entity.length.should.equal(1);
      entity[0].type.should.equal('regexp');
      entity[0].codes.length.should.equal(2);
      entity[0].codes[0].should.equal('/*/');
      entity[0].codes[1].should.equal('/^\d{5}(?:[-\s]\d{4})?$/');
    });

    it('should parse entry array with 1 wildcard and 2 codes', function test() {
      var entity = parser.parse('411*, 412*');
      entity.length.should.equal(1);
      entity[0].type.should.equal('regexp');
      entity[0].codes.length.should.equal(2);
      entity[0].codes[0].should.equal('411*');
      entity[0].codes[1].should.equal('412*');
    });

    it('should parse 1 wildcard and 2 codes with different wildcards', function test() {
      var entity = parser.parse('411?, 412*');
      entity.length.should.equal(1);
      entity[0].type.should.equal('regexp');
      entity[0].codes.length.should.equal(2);
      entity[0].codes[0].should.equal('411?');
      entity[0].codes[1].should.equal('412*');
    });

    it('should parse 1 range and 1 wildcard with 2 different wildcards', function test() {
      var entity = parser.parse('41114-41276, 413*, 411 ??');
      entity.length.should.equal(2);
      entity[0].type.should.equal('range');
      entity[0].from.should.equal(41114);
      entity[0].to.should.equal(41276);
      entity[1].codes.length.should.equal(2);
      entity[1].codes[0].should.equal('413*');
      entity[1].codes[1].should.equal('411 ??');
    });
  });
});
