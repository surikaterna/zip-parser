var Parser = require('..').Parser;
var should = require('should');

describe('Parser', function () {
    var parser = new Parser();
    describe('#parse', function() {  
        it('should return empty array on undefined input', function () {
            parser.parse().length.should.equal(0);
        });
        /*
        it('should return empty array on undefined input', function () {
            parser.parse("1-2").length.should.equal(1);
        });*/
    });
    describe('#parseZipRange', function() {  
        it('should return error if contain more than one -', function () {
            should.throws(function() {
                parser.parseRange("1-2-3");
            });
        });
        it('should return error if from is not number', function () {
            should.throws(function() {
                parser.parseRange("a-2");
            });
        });
        it('should return error if to is not number', function () {
            should.throws(function() {
                parser.parseRange("1-a");
            });
        });
        it('should return one zipcoderange entity', function () {
            var entity = parser.parseRange("1-2");
            entity.type.should.equal("range");
            entity.from.should.equal("1");
            entity.to.should.equal("2");
        });
        
    });
});
