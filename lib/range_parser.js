
function zipRange(element) {
    if (!canParse(element))
    {
        return undefined;
    }
    
    var parts = element.split('-');
    
    validate(parts);
    
    return createEntity(parts);
}

function canParse(entry)
{
    return entry.indexOf('-') > -1;
}

function createEntity(rangeParts) {
    var zipcodeRange = {};
    
    zipcodeRange.type = "range";
    zipcodeRange.from = parseInt(rangeParts[0]);
    zipcodeRange.to = parseInt(rangeParts[1]);
    
    return zipcodeRange;
}

function validate(rangeParts) {
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

module.exports = zipRange;