export default class Message {
  constructor(data) {
    this.data = data;
    this.type = this.constructor.name;
  }
}
