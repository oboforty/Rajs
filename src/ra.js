import { initPythonic } from "./mods/pythonic";
import Color from './mods/Color.js';
import { RandomHandler } from "./mods/random";
import { as_async, dom, ranimate } from './dom/convenience';
import {Matrix} from "./mods/matrix";

import { ParamsDictProxy, SlugParamsHandler } from "./dom/params";
import { create_dict } from "./dom/opoverride";
import { EventContainer } from "./dom/events";
import { TitleHandler}  from './dom/title';
import { CookiesHandler, setcookie } from './dom/cookies';
import {clipboard_copy} from './dom/copy';
import { ImportHandler } from './dom/imports';
import { FileDescriptor } from "./dom/filedescriptor";
import { HttpApi } from "./dom/httpapi";

export default {
  // Dom utils:
  Title: new TitleHandler(),
  Cookies: create_dict(CookiesHandler),
  //setcookie,
  Params: create_dict(ParamsDictProxy),
  SlugParams: new SlugParamsHandler(),
  clipboard_copy,
  Import: ImportHandler,
  dom,
  as_async,
  animate: ranimate,
  File: FileDescriptor,
  Http: HttpApi,

  // Quality of life:
  Events: new EventContainer(),
  Random: RandomHandler,
  Color,
  Matrix,

  // Object overrides:
  init(e) {
    window.$ = dom;

    initPythonic(this, e ? window : this);
  }
};