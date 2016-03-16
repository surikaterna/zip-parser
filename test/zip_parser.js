var ZipParser = require('../lib/zip_parser');
var should = require('should');

describe('ZipParser', function () {
    describe('#parseZip', function() {  
        it('should return error if contain other than numbers and letters', function () {
            should.not.exist(ZipParser("ab%%12"))
        });
        
        it('should return one zipcoderange entity', function () {
            var entity = ZipParser("41114");
            entity.type.should.equal("code");
            entity.codes.length.should.equal(1);
            entity.codes[0].should.equal("41114");
        });
        
        it('should return one zipcoderange entity if contain space', function () {
            var entity = ZipParser("411 14");
            entity.type.should.equal("code");
            entity.codes.length.should.equal(1);
            entity.codes[0].should.equal("411 14");
        });
    });

});
