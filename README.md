# ![alt rajs](https://github.com/oboforty/Rajs/blob/master/logo.png "Ra.js") Ra.js

A collection of various useful javascript modules for everyday web development.

## Scripts:

* **pythonic.js**: wrapper functions in JS for pythonic syntax
* **colors.js**: color class with many useful methods
* **cookie.js**: cookie handler
* **params.js**: HTTP GET request handler
* **events.js**: custom event handler
* **format.js**: useful numeric and string functions
* **math.js**: basic math utilities missing from js

## Documentation:

### Cookie
```javascript
var cookie_value = Cookie.get('cookie_value', -1);
if (cookie_value === -1) {
  cookie_value = 5;
  Cookie.set('cookie_value', cookie_value);
} else {
  if (cookie_value > 10) {
    Cookie.delete('cookie_value');
  } else {
    cookie_value += 1;
    Cookie.set('cookie_value', cookie_value);
  }  
}
```

### Params
```javascript
var page = Params.get('page_id', null);

if (page) {
  alert("Opening page " + page_id);
}
```

### Events

### Containers
Length function
```javascript
  var a = [];
  var b = {};
  var c = new Set([]);
  var d = "";
  
  console.log( len(a) );
  console.log( len(b) );
  console.log( len(c) );
  console.log( len(d) );
```

Ranges
```javascript
  for (var i of range(12)) {
    console.log(i);
  }
```

### Strings
```javascript
  var s = "hello world!";
  console.log( s.title() ); // Hello world!
  
```

### Numbers
Round:
```javascript
 var n = 235.1295;
 
 console.log( round(n, 2) );
```


Estimation:
```javascript
 var n = 252;
 console.log( n.estimation() ); // 252
 n *= 100;
 console.log( n.estimation() ); // 25.2k
 n *= 100;
 console.log( n.estimation() ); // 25.2M
 n *= 1000;
 console.log( n.estimation() ); // 25.2B
```

Ordinal numbers:
```javascript
 var n = 235;
 console.log( n.ordinal() ); // 235th
```

Roman numbers:
```javascript
var n = 235;
 console.log( n.roman() ); // CCXXXV
```


## Future plans
- More pythonic functions
- More missing features from other languages (C# / Java / TypeScript / Ruby)
- More number -> string representations
- POST/PUT/PATCH/DELETE handling for Params
- wasm framework
- extende Image functionality
- More types (Complex, Quaternion, Sound, Page)
- i18n
- Extended string/number functions: plural, grammar handling
- Symbolic mathematics
