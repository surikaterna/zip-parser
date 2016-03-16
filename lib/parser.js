var _ = require('lodash');
var _zipRange = require('./range_parser');
var _zip = require('./zip_parser');

var Parser = function Parser() {
    this._strategies = [_zipRange, _zip]
}

Parser.prototype.parse = function(zipString) {
    
    if(!zipString) { 
        return [];
    }
    
    var self = this;
    
    self.entities = [];
    
    var entries = zipString.split(',');
    
    _.forEach(entries, function(entry) {
        var foundEntity;
        _.forEach(self._strategies, function(strategy) {
           var entity = strategy(entry);
           if (entity) {
               foundEntity = entity;
               return false;
           }
        });
        
        if (foundEntity) {
            if (foundEntity.type === "code") { // Fuggly
               consolidateZipEntites(self.entities, foundEntity);
            }
            else {
                self.entities.push(foundEntity);
            }
        }
        else {
               throw new Error("Found no parser for: " + entry);
        }
    });
    
    return self.entities;  
};

function zipEntityIndex(entities)
{
    var self  = this;

    var currentIndex = 0;
    var matchIndex = -1;
    
     _.forEach(entities, function(entity) {
        if (entity.type === "code") {
            matchIndex = currentIndex;
            return false;
        }
        currentIndex = currentIndex+1;
    });
    
    return matchIndex;
}

function consolidateZipEntites(entities, foundEntity)
{
    var firstZipEntity = zipEntityIndex(entities);
    if (firstZipEntity < 0)
    {
        entities.push(foundEntity);
    }    
    else
    {
        entities[firstZipEntity].codes.push(foundEntity.codes[0]);
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