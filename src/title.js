
const Title = {
  orig_title: document.title,

  init: function(name) {
    if (!name) 
      var name = document.title;

    this.orig_title = name;
  },

  update: function(prefix) {
    document.title = prefix + ' ' + this.orig_title;
  }
};
