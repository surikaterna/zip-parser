import wildcardParser from "../src/parsers/wildcard";
var should = require("should");

describe("wildcardParser", function describeWildcardParser() {
  describe("#parseWildcard", function describeWildcardParse() {
    it("should return error if no wildcard found", function test() {
      should.not.exist(wildcardParser("nowildcard"));
    });

    it("should return wildcard entity if start with ?", function test() {
      var entity = wildcardParser("?startwithwildcard");
      should(entity?.codes.length).equal(1);
      should(entity?.type).equal("wildcard");
    });

    it("should return wildcard entity if wildcard has ? in middle", function test() {
      var entity = wildcardParser("wild?card");
      should(entity?.codes.length).equal(1);
      should(entity?.type).equal("wildcard");
    });

    it("should return wildcard entity if wildcard has ?? in middle", function test() {
      var entity = wildcardParser("wild??card");
      should(entity?.codes.length).equal(1);
      should(entity?.type).equal("wildcard");
    });

    it("should return wildcard entity if end with ?", function test() {
      var entity = wildcardParser("endwithwildcard?");
      should(entity?.codes.length).equal(1);
      should(entity?.type).equal("wildcard");
    });

    it("should return wildcard entity if end with *", function test() {
      var entity = wildcardParser("endwithwildcard?");
      should(entity?.codes.length).equal(1);
      should(entity?.type).equal("wildcard");
    });
  });
});
