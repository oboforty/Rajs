
export class TitleHandler {
  constructor(name) {
    this.orig_title = document.title;
    this.format = "{0}";

    if (name)
      this.update(name);
  }

  update(...args) {
    document.title = this.format.format(...args);
  }
}
