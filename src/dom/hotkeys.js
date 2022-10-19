
export default class Hotkeys {
  constructor() {
    this.events = {};
  }

  this.on = function(evt, callback) {
    var evts = evt.split('+');
    evts.sort();
    var evtId = evts.join(',');

    this.events[evtId] = callback;
  };

  document.onkeydown=function(e) {
    var evts = [];

    switch(e.which) {
      case 9: evts.push('tab'); break;
      case 13: evts.push('enter'); break;
      case 27: evts.push('esc'); break;
      case 32: evts.push('space'); break;
      case 127: evts.push('delete'); break;
      case 37: evts.push('left'); break;
      case 38: evts.push('up'); break;
      case 39: evts.push('right'); break;
      case 40: evts.push('down'); break;
      default:
        if (32<e.which&&e.which<127) {
          evts.push(String.fromCharCode(e.which));
        }
      break;
    }

    if(e.altKey) evts.push('alt');
    if(e.shiftKey) evts.push('shift');
    if(e.ctrlKey) evts.push('ctrl');

    evts.sort();

    var evtId = evts.join(',');

    if (Hotkeys.events[evtId]) {
      Hotkeys.events[evtId](e);

      return false;
    }

    return true;
  }

};
