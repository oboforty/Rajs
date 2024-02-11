import {any} from "../mods/pythonic.js";


/**
 * Very simple util function to pluralize english entity names
 * @param {String} sentence
 * @returns pluralized sentence
 */
export function pluralize(sentence) {
  const _pl_vowels = ['a', 'o', 'i', 'e', 'u'];
  const _pl_soft = ['s', 'sh', 'ch', 'x', 'z'];

  return sentence.split(" ").map((word)=>{
    const L = word.length;
    const char = word.substring(L-2, L-1);
    const isCapital = char === char.toUpperCase();
    word = word.toLowerCase();

    if (any(_pl_soft.map(c => word.endsWith(c))))
      // wish -> wishes
      word = word + 'es';
    else if (word.endsWith('y')) {
      if (any(_pl_vowels.map(c => word.endsWith(c+'y'))))
        // boy -> boys
        word = word + 's';
      else
        // party -> parties
        word = word.substring(0, L-1) + "ies";
    }
    else if (word.endsWith('fe'))
      // wife -> wives
      word = word.substring(0, L-2) + "ves";
    else if (word.endsWith('f'))
      // wolf -> wolves
      word = word.substring(0, L-1) + "ves";
    else if (word.endsWith('o') && word != 'photo')
      // tomato -> tomatoes
      word = word + "es";
    else if (word.endsWith('is'))
      // 
      word = word.substring(0, L-2) + "es";
    else if (word.endsWith('us'))
      // 
      word = word.substring(0, L-2) + "i";
    else
      word = word + 's';

    return isCapital ? word.toUpperCase() : word;
  }).join(' ');
}


export function estimation(n) {
  if (n > 999999999)
      return (n/1000000000).toFixed(1) + 'B';
  else if (n > 999999)
      return (n/1000000).toFixed(1) + 'M';
  else if (n > 999)
      return (n/1000).toFixed(1) + 'k';
  return String(n);
};

export function roman(x) {
  const decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  const romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

  let romanized = '';

  for (const index = 0; index < decimalValue.length; index++) {
    while (decimalValue[index] <= x) {
      romanized += romanNumeral[index];
      x -= decimalValue[index];
    }
  }

  return romanized;
};

export function ordinal (n) {
  var j = n % 10, k = n % 100;
  if (j == 1 && k != 11) return n + "st";
  else if (j == 2 && k != 12) return n + "nd";
  else if (j == 3 && k != 13) return n + "rd";
  return n + "th";
};
