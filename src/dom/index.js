import { dom as dom1, create_dict } from './convenience.js';
import { ParamsDictProxy, SlugParamsHandler } from "./params.js";
import { EventContainer } from "./events.js";
import { TitleHandler }  from './title.js';
import { CookiesHandler, setcookie } from './cookies.js';
import { clipboard_copy as clipboard_copy1 } from './copy.js';

import { RandomHandler } from '../mods/random.js';

export const Title = new TitleHandler();

export const Cookies = create_dict(CookiesHandler);

export const Params = create_dict(ParamsDictProxy);

export const SlugParams = new SlugParamsHandler();

export const Events = new EventContainer();

export const Random = new RandomHandler();

export const clipboard_copy = clipboard_copy1;
export const dom = dom1;
export const set_cookie = setcookie;
