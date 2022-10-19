import { dict } from "../mods/pythonic";
import { create_dict } from "./opoverride";

export class ParamsDictProxy {
  constructor() {
    this.target = new URLSearchParams(window.location.search);
  }

  __getitem__(key) {
    return this.target.get(key)
  }

  __setitem__(key, val) {
    this.target.set(key, val);

    window.location.search = this.target.toString();
  }

  __delitem__(key) {
    this.target.delete(key);

    window.location.search = this.target.toString();
  }
}


export class SlugParamsHandler {
  constructor() {
    let prmstr = window.location.pathname.substring(1);

    this.arr = prmstr.split('/');

    if (this.arr[0] == '')
      this.arr.splice(0, 1);
  }

  get path() {
    return '/'+this.arr.join('/');
  }

  set path(v) {
    if (v[0] == '/')
      v = v.substring(1);
    
    this.arr = v.split('/');
    if (this.arr[0] == '')
      this.arr.splice(0, 1);

    history.pushState({}, "", this.path);
  }

  subpath(s,e) {
    let grr = this.arr.slice(s,e);

    return '/' + grr.join('/');
  }

  add(el) {
    el = el.substring(1);
    if (!el) {
      console.error("empty string can't be added");
      return;
    }
    this.arr.push(el);

    history.pushState({}, "", this.path);
  }

  pop() {
    const p = this.arr.pop();

    history.pushState({}, "", this.path);

    return p;
  }

  clear() {
    this.arr = [];

    history.pushState({}, "", this.path);
  }

  empty() {
    return this.arr.length == 0;
  }
}
