export default class Message {
  // deserialize message
  static of() { }

  constructor() { }

  getType() {
    return this.constructor;
  }

  // include type
  toJSON() { }
}
