import zipRangeParser from "../src/parsers/range";

var should = require("should");

describe("rangeParser", function describeRangeParser() {
  describe("#parseZipRange", function describeRangeParse() {
    it("should return error if contain more than one -", function test() {
      should.throws(function parse() {
        zipRangeParser("1-2-3");
      });
    });

    it("should return error if missing from statement", function test() {
      should.throws(function parse() {
        zipRangeParser("-1");
      });
    });

    it("should return error if missing to statement", function test() {
      should.throws(function parse() {
        zipRangeParser("1-");
      });
    });

    it("should return error if from is not number", function test() {
      should.throws(function parse() {
        zipRangeParser("a-2");
      });
    });

    it("should return error if to is not number", function test() {
      should.throws(function parse() {
        zipRangeParser("1-a");
      });
    });

    it("should return one zipcoderange entity", function test() {
      var entity = zipRangeParser("1-2");
      should(entity?.type).equal("range");
      should(entity?.from).equal(1);
      should(entity?.to).equal(2);
    });
  });
});
