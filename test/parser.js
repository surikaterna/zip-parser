var Parser = require('..').Parser;
var ZipRangeParser = require('../lib/range_parser');
var ZipParser = require('../lib/zip_parser');
var should = require('should');

describe('Parser', function () {
    var parser = new Parser();
    describe('#parse', function() {  
        it('should return empty array on undefined input', function () {
            parser.parse().length.should.equal(0);
        });
        
         it('should return error if no strategies could parse input', function () {
             should.throws(function() {
                parser.parse("no!parser");
            });
        });
        
        it('should return array with one ziprange', function () {
            var entity = parser.parse("10000-20000");
            entity.length.should.equal(1);
            entity[0].from.should.equal(10000);
            entity[0].to.should.equal(20000);
        });
        
         it('should parse 2 zipcode ranges and return array with two entities', function () {
            var entity = parser.parse("10000-20000, 30000-40000");
            entity.length.should.equal(2);
            entity[0].from.should.equal(10000);
            entity[0].to.should.equal(20000);
            entity[1].from.should.equal(30000);
            entity[1].to.should.equal(40000);
        });
        
        it('should parse zipcode and return array with 1 zip entity', function () {
            var entity = parser.parse("41114");
            entity.length.should.equal(1);
            entity[0].codes.length.should.equal(1);
            entity[0].codes[0] = 41114;
        });
        
        it('should parse 2 zipcodes and return array with 1 zip entity with 2 codes', function () {
            var entity = parser.parse("41114, 41276, 41112");
            entity.length.should.equal(1);
            entity[0].codes.length.should.equal(3);
            console.log(entity[0].codes);
            entity[0].codes[0].should.equal("41114");
            entity[0].codes[1].should.equal("41276");
            entity[0].codes[2].should.equal("41112");
        });
        
        it('should parse zipcode and return array with 1 zip entity and 1 range', function () {
            var entity = parser.parse("41114, 10000-20000");
            entity.length.should.equal(2);
            entity[0].type = 'range';
            entity[0].codes.length.should.equal(1);
            entity[0].codes[0] = 41114;
            entity[1].type = 'zip';
            entity[1].from.should.equal(10000);
            entity[1].to.should.equal(20000);
        });
        
        it('should parse zipcode and return array with 1 zip entity and 1 range', function () {
            var entity = parser.parse("10000-20000, 41114");
            entity.length.should.equal(2);
            entity[0].type = 'zip';
            entity[0].from.should.equal(10000);
            entity[0].to.should.equal(20000);
            entity[1].type = 'range';
            entity[1].codes.length.should.equal(1);
            entity[1].codes[0] = 41114;

        });
    });

});
