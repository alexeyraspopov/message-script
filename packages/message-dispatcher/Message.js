export default class Message {
  constructor(data) {
    this.body = data;
    this.subject = this.constructor.name;
  }
}
