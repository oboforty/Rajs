<p align="center">
  <img src="https://github.com/oboforty/Rajs/blob/master/logo.png">
</p>

# Ra.js - v2
An all-in-one javascript library. A collection of various useful javascript modules for everyday web development.


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

## Meta
### Ra.js todos:
- money and number formatting
- wasm wrapper
- worker wrapper
- polyfill
- seeded random
- *sniffs* **WE NEED MORE PYTHON**

### Functionalities that ra.js will never cover by philosophy:
Despite the fact that I believe that frontend developers should avoid npm hell, I think these functionalities are more serious and can be handled way better by more mature libraries/frameworks:

- **dom or general framework :** vue, angular, react
- **date/time handling :** moment
- **full random functionality :** 
- **cryptography :** webcrypto
- **i18n :** i18n.js
- **audio and video :** buzz.js, howler, jsplayer, many more
- **fingerprint and browser detection :** fingerprint2.js, browser.js
- **code highlighting / editors :** codemirror
