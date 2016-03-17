# zip-parser
Parses Zipcode Ranges, Wildcards, etc...

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