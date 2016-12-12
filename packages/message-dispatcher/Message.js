export default class Message {
  constructor(payload) {
    this.payload = payload;
  }

  getType() {
    return this.constructor;
  }

  toJSON() {
    return {
      type: this.constructor.name,
      payload: this.payload
    };
  }
}
