


export function create_dict(cls) {
  const obj = typeof cls === 'function' ? new cls() : cls;

  return new Proxy(obj.target, new (class {
    get(target, name) {
      return obj.__getitem__(name);
    }

    set(target, name, val) {
      obj.__setitem__(name, val);
    }

    has(target, name) {
      return new Boolean(obj.__getitem__(name));
    }

    deleteProperty(target, name) {
      obj.__delitem__(name);
    }
  })());
}
