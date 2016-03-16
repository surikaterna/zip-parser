var ZipRangeParser = require('../lib/range_parser');
var should = require('should');

describe('RangeParser', function () {
    describe('#parseZipRange', function() {  
        it('should return error if contain more than one -', function () {
             (function() {
                ZipRangeParser("1-2-3");
            }).should.throw("Could not parse zipcode range");
        });
        
        it('should return error if missing from statement', function () {
             (function() {
                ZipRangeParser("-1");
            }).should.throw("From is not a number");
        });
        
        it('should return error if missing to statement', function () {
             (function() {
                ZipRangeParser("1-");
            }).should.throw("To is not a number");
        });
        
        it('should return error if from is not number', function () {
            (function() {
                ZipRangeParser("a-2");
            }).should.throw("From is not a number");
        });
        
        it('should return error if to is not number', function () {
            (function() {
                ZipRangeParser("1-a");
            }).should.throw("To is not a number");
        });
        
        it('should return one zipcoderange entity', function () {
            var entity = ZipRangeParser("1-2");
            entity.type.should.equal("range");
            entity.from.should.equal(1);
            entity.to.should.equal(2);
        });
    });
});
