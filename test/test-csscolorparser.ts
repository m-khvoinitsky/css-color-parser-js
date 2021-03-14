import { parseCSSColor, RGBA } from "../src/csscolorparser";
import { deepStrictEqual } from "assert";
import { describe, it } from "mocha";

const test_cases = {
  transparent: [0,0,0,0],
  // *Not* based on kCSSColorTable,
  // freshly extracted from https://drafts.csswg.org/css-color/#named-colors using code:
  /*
     console.log('-------------------------');
     Array.prototype.map.call(document.querySelector('.named-color-table > tbody').querySelectorAll('tr'), tr => {
         let kw = tr.querySelector('dfn').innerText.trim();
         let arr = tr.querySelectorAll('td')[3].innerText.trim().split(' ').map(i => parseInt(i));
         arr.push(1);
         return `  ${kw}: ${JSON.stringify(arr)},`;
     }).join('\n');
  */
  aliceblue: [240,248,255,1],
  antiquewhite: [250,235,215,1],
  aqua: [0,255,255,1],
  aquamarine: [127,255,212,1],
  azure: [240,255,255,1],
  beige: [245,245,220,1],
  bisque: [255,228,196,1],
  black: [0,0,0,1],
  blanchedalmond: [255,235,205,1],
  blue: [0,0,255,1],
  blueviolet: [138,43,226,1],
  brown: [165,42,42,1],
  burlywood: [222,184,135,1],
  cadetblue: [95,158,160,1],
  chartreuse: [127,255,0,1],
  chocolate: [210,105,30,1],
  coral: [255,127,80,1],
  cornflowerblue: [100,149,237,1],
  cornsilk: [255,248,220,1],
  crimson: [220,20,60,1],
  cyan: [0,255,255,1],
  darkblue: [0,0,139,1],
  darkcyan: [0,139,139,1],
  darkgoldenrod: [184,134,11,1],
  darkgray: [169,169,169,1],
  darkgreen: [0,100,0,1],
  darkgrey: [169,169,169,1],
  darkkhaki: [189,183,107,1],
  darkmagenta: [139,0,139,1],
  darkolivegreen: [85,107,47,1],
  darkorange: [255,140,0,1],
  darkorchid: [153,50,204,1],
  darkred: [139,0,0,1],
  darksalmon: [233,150,122,1],
  darkseagreen: [143,188,143,1],
  darkslateblue: [72,61,139,1],
  darkslategray: [47,79,79,1],
  darkslategrey: [47,79,79,1],
  darkturquoise: [0,206,209,1],
  darkviolet: [148,0,211,1],
  deeppink: [255,20,147,1],
  deepskyblue: [0,191,255,1],
  dimgray: [105,105,105,1],
  dimgrey: [105,105,105,1],
  dodgerblue: [30,144,255,1],
  firebrick: [178,34,34,1],
  floralwhite: [255,250,240,1],
  forestgreen: [34,139,34,1],
  fuchsia: [255,0,255,1],
  gainsboro: [220,220,220,1],
  ghostwhite: [248,248,255,1],
  gold: [255,215,0,1],
  goldenrod: [218,165,32,1],
  gray: [128,128,128,1],
  green: [0,128,0,1],
  greenyellow: [173,255,47,1],
  grey: [128,128,128,1],
  honeydew: [240,255,240,1],
  hotpink: [255,105,180,1],
  indianred: [205,92,92,1],
  indigo: [75,0,130,1],
  ivory: [255,255,240,1],
  khaki: [240,230,140,1],
  lavender: [230,230,250,1],
  lavenderblush: [255,240,245,1],
  lawngreen: [124,252,0,1],
  lemonchiffon: [255,250,205,1],
  lightblue: [173,216,230,1],
  lightcoral: [240,128,128,1],
  lightcyan: [224,255,255,1],
  lightgoldenrodyellow: [250,250,210,1],
  lightgray: [211,211,211,1],
  lightgreen: [144,238,144,1],
  lightgrey: [211,211,211,1],
  lightpink: [255,182,193,1],
  lightsalmon: [255,160,122,1],
  lightseagreen: [32,178,170,1],
  lightskyblue: [135,206,250,1],
  lightslategray: [119,136,153,1],
  lightslategrey: [119,136,153,1],
  lightsteelblue: [176,196,222,1],
  lightyellow: [255,255,224,1],
  lime: [0,255,0,1],
  limegreen: [50,205,50,1],
  linen: [250,240,230,1],
  magenta: [255,0,255,1],
  maroon: [128,0,0,1],
  mediumaquamarine: [102,205,170,1],
  mediumblue: [0,0,205,1],
  mediumorchid: [186,85,211,1],
  mediumpurple: [147,112,219,1],
  mediumseagreen: [60,179,113,1],
  mediumslateblue: [123,104,238,1],
  mediumspringgreen: [0,250,154,1],
  mediumturquoise: [72,209,204,1],
  mediumvioletred: [199,21,133,1],
  midnightblue: [25,25,112,1],
  mintcream: [245,255,250,1],
  mistyrose: [255,228,225,1],
  moccasin: [255,228,181,1],
  navajowhite: [255,222,173,1],
  navy: [0,0,128,1],
  oldlace: [253,245,230,1],
  olive: [128,128,0,1],
  olivedrab: [107,142,35,1],
  orange: [255,165,0,1],
  orangered: [255,69,0,1],
  orchid: [218,112,214,1],
  palegoldenrod: [238,232,170,1],
  palegreen: [152,251,152,1],
  paleturquoise: [175,238,238,1],
  palevioletred: [219,112,147,1],
  papayawhip: [255,239,213,1],
  peachpuff: [255,218,185,1],
  peru: [205,133,63,1],
  pink: [255,192,203,1],
  plum: [221,160,221,1],
  powderblue: [176,224,230,1],
  purple: [128,0,128,1],
  rebeccapurple: [102,51,153,1],
  red: [255,0,0,1],
  rosybrown: [188,143,143,1],
  royalblue: [65,105,225,1],
  saddlebrown: [139,69,19,1],
  salmon: [250,128,114,1],
  sandybrown: [244,164,96,1],
  seagreen: [46,139,87,1],
  seashell: [255,245,238,1],
  sienna: [160,82,45,1],
  silver: [192,192,192,1],
  skyblue: [135,206,235,1],
  slateblue: [106,90,205,1],
  slategray: [112,128,144,1],
  slategrey: [112,128,144,1],
  snow: [255,250,250,1],
  springgreen: [0,255,127,1],
  steelblue: [70,130,180,1],
  tan: [210,180,140,1],
  teal: [0,128,128,1],
  thistle: [216,191,216,1],
  tomato: [255,99,71,1],
  turquoise: [64,224,208,1],
  violet: [238,130,238,1],
  wheat: [245,222,179,1],
  white: [255,255,255,1],
  whitesmoke: [245,245,245,1],
  yellow: [255,255,0,1],
  yellowgreen: [154,205,50,1],
};

/*

// to generate tests with browser-calculated exptected result,
// execute following code in browser console
// TODO: test with real browser?

const el = document.createElement('div');
document.documentElement.appendChild(el);
data = <...>;
result = data.map(([test_name, testcase]) => {
	el.style.color = 'rgba(34, 56, 35, 0.45)'; // fallback for bad value
	el.style.color = testcase;
	let computed_str = window.getComputedStyle(el).color;
	let computed = [];
    // poor man's parseCSSColor :)
	if (computed_str.startsWith('rgba(')) {
		computed = computed_str.slice(5, -1).split(',').map(i => parseFloat(i, 10));
	} else if (computed_str.startsWith('rgb(')) {
		computed = computed_str.slice(4, -1).split(',').map(i => parseFloat(i, 10));
		computed.push(1);
	} else {
		throw new Error('this should never happen');
	}
	if (computed[0] === 34 && computed[1] === 56 && computed[2] === 35 && computed[3] === 0.45) {
		computed = null;
	}
	return [test_name, testcase, computed];
})
console.log(JSON.stringify(result));
*/
const named_test_cases: Array<[string, string, RGBA | null]> = [
  ["non-existent function", "xyza(127, 0, 0, 1)", null],
  ["3-digit hex with different digits", "#abc", [170, 187, 204, 1]],
  ["4-digit hex with different digits", "#abcd", [170, 187, 204, 0.8666666666666667]],
  ["6-digit hex with different digits", "#abcdef", [171, 205, 239, 1]],
  ["8-digit hex with different digits", "#abcdefab", [171, 205, 239, 0.6705882352941176]],

  // based on https://github.com/adroitwhiz/css-color/blob/master/test/test.js , thanks, @adroitwhiz!
  ["6-digit hex", "#ff0000", [255, 0, 0, 1]],
  ["3-digit hex", "#f00", [255, 0, 0, 1]],
  ["4-digit hex with alpha", "#f00c", [255, 0, 0, 0.8]],
  ["8-digit hex with alpha", "#ff0000cc", [255, 0, 0, 0.8]],
  ["uppercase hex", "#FF0000", [255, 0, 0, 1]],
  ["mixed-case hex", "#Ff0000", [255, 0, 0, 1]],
  ["5-digit hex", "#ff000", null],
  ["hex with invalid character replaced", "#ffz000", null],
  ["hex with invalid character inserted", "#fffz000", null],
  ["hex with two hash marks", "##fff000", null],
  ["hex with no hash mark", "fff000", null],
  ["6-digit hex with leading spaces", "   #ff0000", [255, 0, 0, 1]],
  ["6-digit hex with trailing spaces", "#ff0000    ", [255, 0, 0, 1]],
  [
    "6-digit hex with leading and trailing spaces",
    "   #ff0000    ",
    [255, 0, 0, 1],
  ],
  [
    "6-digit hex with leading and trailing newlines",
    "\n#ff0000\n",
    [255, 0, 0, 1],
  ],
  [
    "6-digit hex with leading and trailing newlines + carriage returns",
    "\r\n#ff0000\n\r",
    [255, 0, 0, 1],
  ],
  ["6-digit hex with leading and trailing tabs", "\t#ff0000\t", [255, 0, 0, 1]],
  [
    "6-digit hex with leading and trailing mixed whitespace",
    "\n  \r\t  \t\n   #ff0000\n  \t  \r\n  \t   ",
    [255, 0, 0, 1],
  ],
  ["red color keyword", "red", [255, 0, 0, 1]],
  ["rebeccapurple color keyword", "rebeccapurple", [102, 51, 153, 1]],
  ["transparent color keyword", "transparent", [0, 0, 0, 0]],
  ["uppercase color keyword", "RED", [255, 0, 0, 1]],
  ["uppercase transparent color keyword", "TRANSPARENT", [0, 0, 0, 0]],
  ["rgb(), no alpha, no commas, 0-255", "rgb(127 153 64)", [127, 153, 64, 1]],
  ["rgba(), no alpha, no commas, 0-255", "rgba(127 153 64)", [127, 153, 64, 1]],
  [
    "rgb(), with alpha, no commas, 0-255, alpha is a percentage",
    "rgb(127 153 64 / 30%)",
    [127, 153, 64, 0.3],
  ],
  [
    "rgb(), with alpha, no commas, 0-255, alpha is a float",
    "rgb(127 153 64 / 0.3)",
    [127, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, no commas, 0-255, alpha is a percentage",
    "rgba(127 153 64 / 30%)",
    [127, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, no commas, 0-255, alpha is a float",
    "rgba(127 153 64 / 0.3)",
    [127, 153, 64, 0.3],
  ],
  ["rgb(), no alpha, commas, 0-255", "rgb(127, 153, 64)", [127, 153, 64, 1]],
  ["rgba(), no alpha, commas, 0-255", "rgba(127, 153, 64)", [127, 153, 64, 1]],
  [
    "rgb(), with alpha, commas, 0-255, alpha is a percentage",
    "rgb(127, 153, 64, 30%)",
    [127, 153, 64, 0.3],
  ],
  [
    "rgb(), with alpha, commas, 0-255, alpha is a float",
    "rgb(127, 153, 64, 0.3)",
    [127, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, commas, 0-255, alpha is a percentage",
    "rgba(127, 153, 64, 30%)",
    [127, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, commas, 0-255, alpha is a float",
    "rgba(127, 153, 64, 0.3)",
    [127, 153, 64, 0.3],
  ],
  [
    "rgb(), no alpha, no commas, percentages",
    "rgb(50% 60% 25%)",
    [128, 153, 64, 1],
  ],
  [
    "rgba(), no alpha, no commas, percentages",
    "rgba(50% 60% 25%)",
    [128, 153, 64, 1],
  ],
  [
    "rgb(), with alpha, no commas, percentages, alpha is a percentage",
    "rgb(50% 60% 25% / 30%)",
    [128, 153, 64, 0.3],
  ],
  [
    "rgb(), with alpha, no commas, percentages, alpha is a float",
    "rgb(50% 60% 25% / 0.3)",
    [128, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, no commas, percentages, alpha is a percentage",
    "rgba(50% 60% 25% / 30%)",
    [128, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, no commas, percentages, alpha is a float",
    "rgba(50% 60% 25% / 0.3)",
    [128, 153, 64, 0.3],
  ],
  [
    "rgb(), no alpha, commas, percentages",
    "rgb(50%, 60%, 25%)",
    [128, 153, 64, 1],
  ],
  [
    "rgba(), no alpha, commas, percentages",
    "rgba(50%, 60%, 25%)",
    [128, 153, 64, 1],
  ],
  [
    "rgb(), with alpha, commas, percentages, alpha is a percentage",
    "rgb(50%, 60%, 25%, 30%)",
    [128, 153, 64, 0.3],
  ],
  [
    "rgb(), with alpha, commas, percentages, alpha is a float",
    "rgb(50%, 60%, 25%, 0.3)",
    [128, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, commas, percentages, alpha is a percentage",
    "rgba(50%, 60%, 25%, 30%)",
    [128, 153, 64, 0.3],
  ],
  [
    "rgba(), with alpha, commas, percentages, alpha is a float",
    "rgba(50%, 60%, 25%, 0.3)",
    [128, 153, 64, 0.3],
  ],
  ["rgb() with decimals", "rgb(30.7, 60.6, 41.2)", [31, 61, 41, 1]],
  [
    "rgb() with decimals without leading digits",
    "rgb(.4, .4, .4)",
    [0, 0, 0, 1],
  ],
  [
    "rgb() with decimal percentages",
    "rgb(5.5%, 10.875%, 32.25%)",
    [14, 28, 82, 1],
  ],
  [
    "rgb() percentages with multiple decimal points",
    "rgb(5..5%, 10....875%, 32...25%)",
    null,
  ],
  [
    "rgb() with negative percentages",
    "rgb(-5%, 10.875%, -32.25%)",
    [0, 28, 0, 1],
  ],
  [
    "rgb() with unary-positive percentages",
    "rgb(+5%, 10.875%, +32.25%)",
    [13, 28, 82, 1],
  ],
  [
    "rgb() with above-maximum numbers",
    "rgb(300, 170, 750)",
    [255, 170, 255, 1],
  ],
  ["rgb() with negative numbers", "rgb(-132, 170, -72)", [0, 170, 0, 1]],
  [
    "rgb() with unary-positive numbers",
    "rgb(+132, +170, +73)",
    [132, 170, 73, 1],
  ],
  [
    "rgb() with unary-positive numbers and no spaces",
    "rgb(+132+170+73)",
    [132, 170, 73, 1],
  ],
  ["no-comma rgb() without any spaces", "rgb(.4.4.4)", [0, 0, 0, 1]],
  [
    "rgb() with scientific notation",
    "rgb(30e+0, 57000e-3, 4.0e+1)",
    [30, 57, 40, 1],
  ],
  [
    "rgb() with scientific notation percentages",
    "rgb(30e+0%, 57000e-3%, 4e+1%)",
    [77, 145, 102, 1],
  ],
  ["rgb() with missing close-paren", "rgb(128, 192, 64", [128, 192, 64, 1]],
  [
    "rgb() with extra spaces inside parentheses",
    "rgb(   132,    170, 73    )",
    [132, 170, 73, 1],
  ],
  ["rgb() with spaces before commas", "rgb(132 , 170 , 73)", [132, 170, 73, 1]],
  ["rgb() with commas but no spaces", "rgb(132,170,73)", [132, 170, 73, 1]],
  ["rgb() with newlines", "rgb(\n132,\n170,\n73\n)", [132, 170, 73, 1]],
  ["rgb() with tabs", "rgb(\t132,\t170,\t73\t)", [132, 170, 73, 1]],
  ["rgba() with too many components", "rgba(132, 170, 73, 1, 0.5)", null],
  ["rgba() with not enough components", "rgba(132, 170)", null],
  ["rgb() with too many components", "rgb(132, 170, 73, 1, 0.5)", null],
  ["rgb() with not enough components", "rgb(132, 170)", null],
  ["rgb with no parentheses", "rgb 132, 170, 73", null],
  ["rgb with no parentheses or spaces", "rgb132,170,73", null],
  ["rgb () with space before opening parenthesis", "rgb (132, 170, 73)", null],
  ["rgb() with extra garbage after", "rgb(132, 170, 73)garbage", null],
  ["rgb() with mixed percentages/numbers", "rgb(5%, 50, 30%)", null],
  ["rgb() with an \"e\" where it should not be", "rgb(3e, 50, 30)", null],
  ["rgb() with extra letters after values", "rgb(3blah, 50, 30)", null],
  ["rgb() with mixed commas/no commas", "rgb(50 50, 30)", null],
  ["RGB() in uppercase", "RGB(132, 170, 73)", [132, 170, 73, 1]],
  ["RgB() in mixed case", "RgB(132, 170, 73)", [132, 170, 73, 1]],
  [
    "rgba() with scientific notation alpha",
    "rgba(132, 170, 73, 5e-1)",
    [132, 170, 73, 0.5],
  ],
  [
    "rgb() with no commas and no slash before alpha",
    "rgb(132 170 73 0.5)",
    null,
  ],
  ["rgb() with all slashes", "rgb(132 / 170 / 73 / 0.5)", null],
  [
    "hsla(), with alpha, commas, no hue unit, alpha is a percentage",
    "hsla(50, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, commas, no hue unit, alpha is a float",
    "hsla(50, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, no hue unit, alpha is a percentage",
    "hsl(50, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, no hue unit, alpha is a float",
    "hsl(50, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, commas, no hue unit",
    "hsla(50, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, commas, no hue unit",
    "hsl(50, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, no commas, no hue unit, alpha is a percentage",
    "hsla(50 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, no commas, no hue unit, alpha is a float",
    "hsla(50 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, no hue unit, alpha is a percentage",
    "hsl(50 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, no hue unit, alpha is a float",
    "hsl(50 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, no commas, no hue unit",
    "hsla(50 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, no commas, no hue unit",
    "hsl(50 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, commas, hue unit is deg, alpha is a percentage",
    "hsla(50deg, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, commas, hue unit is deg, alpha is a float",
    "hsla(50deg, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is deg, alpha is a percentage",
    "hsl(50deg, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is deg, alpha is a float",
    "hsl(50deg, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, commas, hue unit is deg",
    "hsla(50deg, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, commas, hue unit is deg",
    "hsl(50deg, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is deg, alpha is a percentage",
    "hsla(50deg 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is deg, alpha is a float",
    "hsla(50deg 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is deg, alpha is a percentage",
    "hsl(50deg 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is deg, alpha is a float",
    "hsl(50deg 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, no commas, hue unit is deg",
    "hsla(50deg 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, no commas, hue unit is deg",
    "hsl(50deg 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, commas, hue unit is grad, alpha is a percentage",
    "hsla(55.5grad, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, commas, hue unit is grad, alpha is a float",
    "hsla(55.5grad, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is grad, alpha is a percentage",
    "hsl(55.5grad, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is grad, alpha is a float",
    "hsl(55.5grad, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, commas, hue unit is grad",
    "hsla(55.5grad, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, commas, hue unit is grad",
    "hsl(55.5grad, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is grad, alpha is a percentage",
    "hsla(55.5grad 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is grad, alpha is a float",
    "hsla(55.5grad 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is grad, alpha is a percentage",
    "hsl(55.5grad 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is grad, alpha is a float",
    "hsl(55.5grad 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, no commas, hue unit is grad",
    "hsla(55.5grad 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, no commas, hue unit is grad",
    "hsl(55.5grad 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, commas, hue unit is rad, alpha is a percentage",
    "hsla(0.87266rad, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, commas, hue unit is rad, alpha is a float",
    "hsla(0.87266rad, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is rad, alpha is a percentage",
    "hsl(0.87266rad, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is rad, alpha is a float",
    "hsl(0.87266rad, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, commas, hue unit is rad",
    "hsla(0.87266rad, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, commas, hue unit is rad",
    "hsl(0.87266rad, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is rad, alpha is a percentage",
    "hsla(0.87266rad 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is rad, alpha is a float",
    "hsla(0.87266rad 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is rad, alpha is a percentage",
    "hsl(0.87266rad 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is rad, alpha is a float",
    "hsl(0.87266rad 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, no commas, hue unit is rad",
    "hsla(0.87266rad 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, no commas, hue unit is rad",
    "hsl(0.87266rad 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, commas, hue unit is turn, alpha is a percentage",
    "hsla(0.139turn, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, commas, hue unit is turn, alpha is a float",
    "hsla(0.139turn, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is turn, alpha is a percentage",
    "hsl(0.139turn, 80%, 35%, 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, commas, hue unit is turn, alpha is a float",
    "hsl(0.139turn, 80%, 35%, 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, commas, hue unit is turn",
    "hsla(0.139turn, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, commas, hue unit is turn",
    "hsl(0.139turn, 80%, 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is turn, alpha is a percentage",
    "hsla(0.139turn 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), with alpha, no commas, hue unit is turn, alpha is a float",
    "hsla(0.139turn 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is turn, alpha is a percentage",
    "hsl(0.139turn 80% 35% / 30%)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsl(), with alpha, no commas, hue unit is turn, alpha is a float",
    "hsl(0.139turn 80% 35% / 0.3)",
    [161, 137, 18, 0.3],
  ],
  [
    "hsla(), no alpha, no commas, hue unit is turn",
    "hsla(0.139turn 80% 35%)",
    [161, 137, 18, 1],
  ],
  [
    "hsl(), no alpha, no commas, hue unit is turn",
    "hsl(0.139turn 80% 35%)",
    [161, 137, 18, 1],
  ],
  ["hsl() with hue as a percentage", "hsl(50%, 80%, 35%)", null],
  ["hsl() with saturation and lightness as floats", "hsl(50, 0.8, 0.35)", null],
  ["hsl() with a hue > 360", "hsl(750, 80%, 35%)", [161, 89, 18, 1]],
  ["hsl() with a hue < -360", "hsl(-500, 80%, 35%)", [18, 65, 161, 1]],
  ["hsl() with fractional hue", "hsl(30.51, 80%, 35%)", [161, 90, 18, 1]],
  [
    "hsl() with scientific notation hue",
    "hsl(3051e-2, 80%, 35%)",
    [161, 90, 18, 1],
  ],
];

describe("parseCSSColor", () => (
  Object.entries(test_cases).forEach(([to_parse, expected_result]): void => {
    it(
      `${to_parse} => ${expected_result}`,
      () => deepStrictEqual(parseCSSColor(to_parse), expected_result),
    );
  })
));

describe("parseCSSColor", () => (
  named_test_cases.forEach(([test_name, testcase, our_expected]) => {
    it(
      `${test_name} ${JSON.stringify(testcase)} => ${our_expected}`,
      () => deepStrictEqual(parseCSSColor(testcase), our_expected),
    );
  })
));
