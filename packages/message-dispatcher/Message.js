export default class Message {
  constructor(data) {
    this.data = data;
  }

  getType() {
    return this.constructor;
  }

  toJSON() {
    return {
      type: this.constructor.name,
      data: this.data
    };
  }
}
