function $(sel0) {
  var c=sel0[0];

  var sel = sel0.substr(1);

  if(c=='#') {
    return document.getElementById(sel);
  } else if(c=='.') {
    return document.getElementsByClassName(sel);
  } else {
    return document.getElementsByTagName(sel0);
  }
}

const clipboard_copy = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
