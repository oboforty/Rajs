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

### Global objects
```javascript
Color             // Generic color class -- handles everything!
Cookies           // Smart proxy object to store cookies as key-value pairs
Params            // Smart proxy object to store URL parameters as key-value pairs
Events            // Define and fire custom events
Hotkeys           // Define global hotkeys and hotkey combos
Import            // Import css and js files programmatically
Title             // Set the document title using a state machine (reset/set)
```

### Number and String formatting
```javascript
const N = 1234;

N.estimation();   // 1.2k
N.roman();        // CXXIV
N.ordinal();      // 1234th
```

### Pythonic functions
```javascript
// pythonic global functions:
len, any, all, round, enumerate, range, time, print, sum

// pythonic type casts
str, int, float, bool, dict, list, bool, bytes

// Type method overrides:
Array.remove, Array.decode
String.format, String.lower, String.upper, String.title, String.encode

// extras:
defaultdict

// we all know Object.keys and Object.values, but:
const obj = { "hello": "world" };

for (let [key, value] of Object.items(obj)) {
  console.log(key, '->', value);
}


```

### Other
```javascript
Math.log                    //-> now has a second parameter for log base
Math.rad2deg, Math.deg2rad  //-> constants
random                      // random stuff!
```
