import parser from "..";
var should = require("should");

describe("Parser", function describeParser() {
  describe("#parse", function describeParse() {
    it("should return empty array on undefined input", function test() {
      should(parser().length).equal(0);
    });

    it("should return error if no strategies could parse input", function test() {
      should.throws(function parse() {
        parser("no!parser");
      });
    });

    it("should return array with one ziprange", function test() {
      var entity = parser("10000-20000");
      should(entity.length).equal(1);
      //@ts-ignore
      should(entity[0].from).equal(10000);
      //@ts-ignore
      should(entity[0].to).equal(20000);
    });

    it("should parse 2 zipcode ranges  array with two entities", function test() {
      var entity = parser("10000-20000, 30000-40000");
      should(entity.length).equal(2);
      //@ts-ignore
      should(entity[0].from).equal(10000);
      //@ts-ignore
      should(entity[0].to).equal(20000);
      //@ts-ignore
      should(entity[1].from).equal(30000);
      //@ts-ignore
      should(entity[1].to).equal(40000);
    });

    it("should parse zipcode array with 1 zip entity", function test() {
      var entity = parser("41114");
      should(entity.length).equal(1);
      //@ts-ignore
      should(entity[0].codes.length).equal(1);
      //@ts-ignore
      should(entity[0].codes[0]).equal("41114");
    });

    it("should parse 3 zipcodes array with 1 zip entity with 2 codes", function test() {
      var entity = parser("41114, 41276, 41112");
      should(entity.length).equal(1);
      //@ts-ignore
      should(entity[0].codes.length).equal(3);
      //@ts-ignore
      should(entity[0].codes[0]).equal("41114");
      //@ts-ignore
      should(entity[0].codes[1]).equal("41276");
      //@ts-ignore
      should(entity[0].codes[2]).equal("41112");
    });

    it("should parse zipcode array with 1 zip entity and 1 range", function test() {
      var entity = parser("41114, 10000-20000");
      should(entity.length).equal(2);
      should(entity[0].type).equal("code");
      //@ts-ignore
      should(entity[0].codes.length).equal(1);
      //@ts-ignore
      should(entity[0].codes[0]).equal("41114");
      should(entity[1].type).equal("range");
      //@ts-ignore
      should(entity[1].from).equal(10000);
      //@ts-ignore
      should(entity[1].to).equal(20000);
    });

    it("should parse zipcode array with 1 range and 1 zip entity", function test() {
      var entity = parser("10000-20000, 41114");
      should(entity.length).equal(2);
      should(entity[0].type).equal("range");
      //@ts-ignore
      should(entity[0].from).equal(10000);
      //@ts-ignore
      should(entity[0].to).equal(20000);
      should(entity[1].type).equal("code");
      //@ts-ignore
      should(entity[1].codes.length).equal(1);
      //@ts-ignore
      should(entity[1].codes[0]).equal("41114");
    });

    it("should parse zipcode array with 2 zip entity and 1 range", function test() {
      var entity = parser("41276, 10000-20000, 41114");
      should(entity.length).equal(2);
      should(entity[0].type).equal("code");
      //@ts-ignore
      should(entity[0].codes.length).equal(2);
      //@ts-ignore
      should(entity[0].codes[0]).equal("41276");
      //@ts-ignore
      should(entity[0].codes[1]).equal("41114");
      should(entity[1].type).equal("range");
      //@ts-ignore
      should(entity[1].from).equal(10000);
      //@ts-ignore
      should(entity[1].to).equal(20000);
    });

    it("should parse entry array with 1 code, 1 range and 1 regexp", function test() {
      var entity = parser("41276, 10000-20000, /^d{5}(?:[-s]d{4})?$/");
      should(entity.length).equal(3);
      should(entity[0].type).equal("code");
      //@ts-ignore
      should(entity[0].codes.length).equal(1);
      //@ts-ignore
      should(entity[0].codes[0]).equal("41276");
      should(entity[1].type).equal("range");
      //@ts-ignore
      should(entity[1].from).equal(10000);
      //@ts-ignore
      should(entity[1].to).equal(20000);
      should(entity[2].type).equal("regexp");
      //@ts-ignore
      should(entity[2].codes[0]).equal("/^d{5}(?:[-s]d{4})?$/");
    });

    it("should parse entry array with 1 regexp and 2 codes", function test() {
      var entity = parser("/*/, /^d{5}(?:[-s]d{4})?$/");
      should(entity.length).equal(1);
      should(entity[0].type).equal("regexp");
      //@ts-ignore
      should(entity[0].codes.length).equal(2);
      //@ts-ignore
      should(entity[0].codes[0]).equal("/*/");
      //@ts-ignore
      should(entity[0].codes[1]).equal("/^d{5}(?:[-s]d{4})?$/");
    });

    it("should parse entry array with 1 wildcard and 2 codes", function test() {
      var entity = parser("411*, 412*");
      should(entity.length).equal(1);
      should(entity[0].type).equal("wildcard");
      //@ts-ignore
      should(entity[0].codes.length).equal(2);
      //@ts-ignore
      should(entity[0].codes[0]).equal("411*");
      //@ts-ignore
      should(entity[0].codes[1]).equal("412*");
    });

    it("should parse 1 wildcard and 2 codes with different wildcards", function test() {
      var entity = parser("411?, 412*");
      should(entity.length).equal(1);
      should(entity[0].type).equal("wildcard");
      //@ts-ignore
      should(entity[0].codes.length).equal(2);
      //@ts-ignore
      should(entity[0].codes[0]).equal("411?");
      //@ts-ignore
      should(entity[0].codes[1]).equal("412*");
    });

    it("should parse 1 range and 1 wildcard with 2 different wildcards", function test() {
      var entity = parser("41114-41276, 413*, 411 ??");
      should(entity.length).equal(2);
      should(entity[0].type).equal("range");
      //@ts-ignore
      should(entity[0].from).equal(41114);
      //@ts-ignore
      should(entity[0].to).equal(41276);
      //@ts-ignore
      should(entity[1].codes.length).equal(2);
      //@ts-ignore
      should(entity[1].codes[0]).equal("413*");
      //@ts-ignore
      should(entity[1].codes[1]).equal("411 ??");
    });
  });
});
