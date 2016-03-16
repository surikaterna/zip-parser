
function zip(element) {
    if (!canParse(element))
    {
        return undefined;
    }

    return createEntity(element);
}

function canParse(entry)
{
    if (!entry.match(/^[a-zA-Z0-9 ]*$/gmi)) {
        return false;
    }
    
    return true;
}

function createEntity(element) {
    var zipCode = {};
    
    zipCode.type = "code";
    zipCode.codes = [];
    zipCode.codes.push(element.trim());
    
    return zipCode;
}

module.exports = zip;