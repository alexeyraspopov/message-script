import { Subscription } from 'message-dispatcher';

export default class WorkerGateway {
  constructor(worker) {
    this.worker = worker;
    this.listeners = new Set();
    this.worker.onmessage = (event) => {
      for (const callback of this.listeners) callback(event.data);
    };
  }

  send(message) {
    this.worker.postMessage(message);
  }

  listen(callback) {
    this.listeners.add(callback);
    return new Subscription(this.listeners, callback);
  }
}
