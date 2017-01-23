class WorkerGateway {
  constructor(worker) {
    this.worker = worker;
  }

  post(message) {
    this.worker.postMessage(message);
  }

  listen(callback) {
    this.worker.onmessage = callback;
  }
}
