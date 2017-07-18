# jquery-i18n
Jquery internationalization framework. Includes type definitions for typescript.

## Usage

Load the translations:
```javascript
$.i18n.load({
  "translation_key1": "translation1",
  "translation_key2": "translation2 {{name}}, etc",
  "translation_key3": "translation2 {{0}}, {{1}}, etc",
  "translation_key4": "translation2 {{0}}, {{1}}, etc"
});
```

Apply translation to dom elements:
```javascript
$('#domId1')._t('translation_key1');
$('#domId2')._t('translation_key2', {name:"Placeholder example"});
$('#domId2')._t('translation_key2', {name:"Placeholder example"});
$('#domId3')._t('translation_key3', ['list', 'example']);
$('#domId4')._t('translation_key4', 'list', 'example 2');
```

Apply translation to dom elements with data-trans-key attribute
```html
<div id='domId5' data-trans-key="translation_key1">Translation with dom-defined key</div>
```

```javascript
$('domId5').t();

// or just call applyDom to update all elements:
$.i18n.applyDom();
```


Apply translation to strings:
```javascript
var str1 = $._t('translation_key1');
var str2 = $._t('translation_key2', {name:"Placeholder example"});
```
