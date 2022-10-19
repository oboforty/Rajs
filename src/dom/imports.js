import { dom } from "./convenience";

export class ImportHandler {

  css(filename) {
    let link=document.createElement('link');
    link.href=filename;
    link.rel='stylesheet';

    dom('head')[0].appendChild(link);
  }

  js(filename, is_module) {
    let script=document.createElement('script');
    script.src=filename;

    if (is_module)
      script.type = 'module';

    dom('head')[0].appendChild(script);
  }
}