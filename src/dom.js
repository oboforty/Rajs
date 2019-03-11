
function importcss(filename) {
  let link=document.createElement('link');
  link.href=filename;
  link.rel='stylesheet';

  $('head')[0].appendChild(link);
}


function importjs(filename, module) {
  let script=document.createElement('script');
  script.src=filename;

  if (module)
    script.type = 'module';

  $('head')[0].appendChild(script);
}
