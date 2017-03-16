export default class WorkerGateway {
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
