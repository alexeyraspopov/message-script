import { Subscription } from 'message-dispatcher';

/**
 * Universal interface for communicaton between master and workers
 */
export default class WorkerGateway {
  /**
   * @param {Worker} worker — worker instance or `self` to run inside worker
   */
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
