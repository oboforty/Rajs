
const Import = {

  css: function(filename) {
    let link=document.createElement('link');
    link.href=filename;
    link.rel='stylesheet';

    $('head')[0].appendChild(link);
  },

  js: function(filename, is_module) {
    let script=document.createElement('script');
    script.src=filename;

    if (is_module)
      script.type = 'module';

    $('head')[0].appendChild(script);
  }
}
