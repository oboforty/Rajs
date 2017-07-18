// Type definitions for jQuery i18N
// Project: https://github.com/recurser/jquery-i18n
// Definitions by: Recurser <https://github.com/recurser>

/// <reference path="../jquery/jquery.d.ts" />


interface i18n {
    load(i18n_dict: any):void;
    applyDom():void;
    _(str: string): string;
}

interface JQueryStatic {
    i18n: i18n;
    _t(str:string, params?:any):string
}

interface JQuery {
    _t(str: string, params?: any): string
}
