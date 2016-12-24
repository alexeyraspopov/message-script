export default class Message {
  constructor(data) {
    this.subject = this.constructor.name;
    this.content = data;
    Object.freeze(this);
    Object.freeze(this.content);
  }
}
