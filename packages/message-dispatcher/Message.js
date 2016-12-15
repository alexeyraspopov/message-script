export default class Message {
  constructor(data) {
    this.data = data;
  }

  getSubject() {
    return this.constructor;
  }

  toJSON() {
    return {
      type: this.constructor.name,
      data: this.data
    };
  }
}
