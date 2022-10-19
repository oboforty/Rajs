
export function initFormatting() {

  Number.prototype.estimation = Number.prototype.estimation || function() {
    if (this > 999999999)
        return (this/1000000000).toFixed(1) + 'B';
    else if (this > 999999)
        return (this/1000000).toFixed(1) + 'M';
    else if (this > 999)
        return (this/1000).toFixed(1) + 'k';
    return String(this);
  };

  Number.prototype.roman = Number.prototype.roman || function() {
    var decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
    var romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

    var x = this;
    var romanized = '';

    for (var index = 0; index < decimalValue.length; index++) {
      while (decimalValue[index] <= x) {
        romanized += romanNumeral[index];
        x -= decimalValue[index];
      }
    }

    return romanized;
  };

  Number.prototype.ordinal = Number.prototype.ordinal || function() {
      var j = this % 10, k = this % 100;
      if (j == 1 && k != 11) return this + "st";
      else if (j == 2 && k != 12) return this + "nd";
      else if (j == 3 && k != 13) return this + "rd";
      return this + "th";
  };


}