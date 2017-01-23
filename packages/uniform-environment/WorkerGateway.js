/**
 * Universal interface for communicaton between master and workers
 */
export default class WorkerGateway {
  /**
   * @param {Worker} worker — worker instance or `self` to run inside worker
   */
  constructor(worker) {
    this.worker = worker;
  }

  send(message) {
    this.worker.postMessage(message);
  }

  listen(handler) {
    this.worker.onmessage = handler;
  }
}
