export default class Message {
  constructor(data) {
    this.data = data;
    this.subject = this.constructor.name;
  }
}
