

Array.prototype.remove = function(element) {
  const index = this.indexOf(element);

  this.splice(index, 1);
};
