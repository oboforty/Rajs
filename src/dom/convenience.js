export function as_async(p) {
  // async wrapper for sync methods
  return new Promise((resolve, reject) => {
      resolve(p);
  });
}

export function as_sync(p) {
  // force sync execution for async method
  
}

export function ranimate(anim_func) {
  let prev = 0, start = 0;

  let step = (timestamp) => {
    if (!prev)
      prev = timestamp;
    
    let dt = timestamp - prev;
    let elapsed_time = timestamp - start;
    prev = timestamp;

    const rt = anim_func(timestamp, dt, elapsed_time);

    // stop animating
    if (!rt)
      return;
    
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
}

export function dom(sel0) {
  var c=sel0[0];

  var sel = sel0.substr(1);

  if(c=='#') {
    return document.getElementById(sel);
  } else if(c=='.') {
    return document.getElementsByClassName(sel);
  } else {
    return document.getElementsByTagName(sel0);
  }
}
