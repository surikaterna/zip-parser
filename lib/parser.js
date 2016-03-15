var Parser = function Parser() {
}

Parser.prototype.parse = function(zipString) {
    if(!zipString) { 
        return [];
    }
    
    var entries = [];
    
    return entries;  
};

Parser.prototype.parseRange = function(zipRange) {
    var zipcodeRange = {};
    
    var parts = zipRange.split('-');
    
    this.validateRangeParts(parts);
    
    zipcodeRange.type = "range";
    zipcodeRange.from = parts[0];
    zipcodeRange.to = parts[1];
    
    return zipcodeRange;
}

Parser.prototype.validateRangeParts = function(rangeParts) {
    if (rangeParts.length != 2) {
        throw new Error("Could not parse zipcode range");
    }

    if (isNaN(parseInt(rangeParts[0]))) {
        throw new Error("From is not a number");
    }
    
    if (isNaN(parseInt(rangeParts[1]))) {
        throw new Error("To is not a number");
    }
}

module.exports = Parser;



/*


var areaArr =  {
    "areas" : [
        {
            type: "zipcoderange",
            name: "SE (1-2)",
            identifiers: [],
            description: "MyZone1",
            countryCode: "SE",
            entries: [        
                {
                    type: "range",
                    from:"1000",
                    to:"3000"
                    
                },
                {
                    type: "code",
                    codes: ['55001', '55002']
                }, 
                {
                    type: "wildcard",
                    codes: ['55*', '66??0']
                },
                {
                    type: "regexp",
                    codes: ['^55.*'] 
                }               
            ]
        }
    ]
}

*/