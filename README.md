# csscolorparser-ts

Parser for CSS color strings written in TypeScript.

# Usage

Module exports single function — `parseCSSColor` which accepts single argument which is string to be parsed and returns either RGBA array (array of four numbers corresponding to Red, Green, Blue and Alpha) or `null` if the passed string is not valid CSS color.

For using with TypeScript it also export `RGBA` type which is just short for `[number, number, number, number]`;

## Import
### NodeJS
```javascript
const { parseCSSColor } = require('csscolorparser-ts');
```

### ES6+
```javascript
import { parseCSSColor } from 'csscolorparser-ts';
```

## Use
```javascript
parseCSSColor('rgba(255, 128, 0, 0.5)');
// [ 255, 128, 0, 0.5 ]

parseCSSColor('rgb(255 128 0 / 0.5)');
// [ 255, 128, 0, 0.5 ]

parseCSSColor('#AABBCC');
// [ 170, 187, 204, 1 ]

parseCSSColor('#ABC');
// [ 170, 187, 204, 1 ]

parseCSSColor('#AABBCCCC');
// [ 170, 187, 204, 0.8 ]

parseCSSColor('#ABCC');
// [ 170, 187, 204, 0.8 ]

parseCSSColor('tomato');
// [ 255, 99, 71, 1 ]

parseCSSColor('nosuchcolor');
// null

parseCSSColor('ffffff');
// null

parseCSSColor('hsla(900, 15%, 90%, 0.5)')
// [ 226, 233, 233, 0.5 ]

parseCSSColor('hsla(2rad, 15%, 90%, 0.5)')
// [ 226, 233, 226, 0.5 ]

parseCSSColor('hsl(900, 0.15, 90%)') // percents aren't allowed for saturation and lightness
// null

parseCSSColor('rgb(50 \t 100 200 / 255)');
// [ 50, 100, 200, 1 ]

parseCSSColor('\trgb(50 \t 100 \n 200 / 255)\t');
// [ 50, 100, 200, 1 ]

parseCSSColor('rgb(50, 50)');
// null

parseCSSColor('rgb(50, 50a, 50)');
// null
```

# Credits

- Dean McNamee, author of the original csscolorparser library ([GitHub](https://github.com/deanm/css-color-parser-js), [NPM](https://www.npmjs.com/package/csscolorparser)) which this library is forked from.
- adroitwhiz, for excellent testcases for CSS color parsers ([GitHub](https://github.com/adroitwhiz/css-color/blob/master/test/test.js)).

# Links

- [GitHub](https://github.com/m-khvoinitsky/csscolorparser-ts)
- [NPM](https://www.npmjs.com/package/csscolorparser-ts)
