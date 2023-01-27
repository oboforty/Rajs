import { dom as dom1 } from './convenience';
import { ParamsDictProxy, SlugParamsHandler } from "./params";
import { create_dict } from "./opoverride";
import { EventContainer } from "./events";
import { TitleHandler }  from './title';
import { CookiesHandler, setcookie } from './cookies';
import { clipboard_copy as clipboard_copy1 } from './copy';

import { RandomHandler } from '../mods/random';

export const Title = new TitleHandler();

export const Cookies = create_dict(CookiesHandler);

export const Params = create_dict(ParamsDictProxy);

export const SlugParams = new SlugParamsHandler();

export const Events = new EventContainer();

export const Random = new RandomHandler();

export const clipboard_copy = clipboard_copy1;
export const dom = dom1;
export const set_cookie = setcookie;
