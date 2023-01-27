
export function setcookie(name, value, hours) {
  let ckc = name + "=" + value + "; path=/";
  let date = new Date();

  if (typeof hours === 'number') {
    // hours is provided
    date.setTime(date.getTime() + (hours*3600*1000));
    ckc += "; expires=" + date.toUTCString();
  } else if (hours) {
    // hours is a flag to be "persistent" cookie
    date.setFullYear(date.getFullYear() + 1);
    ckc += "; expires=" + date.toUTCString();
  }

  document.cookie = ckc;
}

export class CookiesHandler {
  constructor() {
    this.target = {
      setcookie
    };
    this.persistent = true;
  }
  
  __getitem__(key) {
    if (key == 'setcookie')
      return this.target.setcookie;

    let value = "; " + document.cookie;
    let parts = value.split("; " + key + "=");

    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    } else {
      return null;
    }
  }

  __setitem__(key, val) {
    setcookie(key, val, this.persistent);
  }

  __delitem__(key) {
    setcookie(key, "", -1);
  }
}