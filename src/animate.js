
function ranimate(anim_func) {
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
