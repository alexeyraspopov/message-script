export default class Subscription {
  constructor(receivers, receiver) {
    this.receivers = receivers;
    this.receiver = this.receiver;
  }

  dispose() {
    this.receivers.delete(this.receiver);
  }
}
