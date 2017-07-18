
function estimation(num) {
    if (num > 999)
        return (num/1000).toFixed(1) + 'k';
    else if (num > 999999)
        return (num/1000000).toFixed(1) + 'M';
    return num;
}

function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function getKeyByValueBazdmeg(object, value) {
  return Object.keys(object).find(key => object[key] === value);
};

function convertToRoman(num) {

  var decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  var romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

  var romanized = '';

  for (var index = 0; index < decimalValue.length; index++) {
    while (decimalValue[index] <= num) {
      romanized += romanNumeral[index];
      num -= decimalValue[index];
    }
  }

  return romanized;
}

function ordinalSuffix(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    else if (j == 2 && k != 12) return i + "nd";
    else if (j == 3 && k != 13) return i + "rd";
    return i + "th";
}

function sumDict(dict) {
    var sum = 0;
    for (var key in dict) {
        sum += dict[key];
    }

    return sum;
}

function addDicts(obj1, obj2) {
    var obj ={}
    Object.keys(obj1).map(function(a){
      obj[a] = obj1[a]+obj2[a];
    });
    return obj;
}
