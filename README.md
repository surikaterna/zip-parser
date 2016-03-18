# zip-parser
Parses Zipcode Ranges, Wildcards, etc...

```
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
        codes: ['55*', '66??']
    },
    {
        type: "regexp",
        codes: ['^55.*', '^56.*'] 
    }               
]
```