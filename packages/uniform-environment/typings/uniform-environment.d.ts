declare module UniformEnvironment {
  interface Gateway {
    send(message: any): void;
    listen(handler: Function): void;
  }

  export class UniformEnvironment {
    constructor(children: Array<Gateway>, routine: Function);
    post(message: any): void;
  }

  export class ClusterGateway implements Gateway {
    constructor();
    send(message: any): void;
    listen(handler: Function): void;
  }

  export class SocketGateway implements Gateway {
    constructor(socket: WebSocket);
    send(message: any): void;
    listen(handler: Function): void;
  }

  /**
   * Universal interface for communicaton between master and workers
   */
  export class WorkerGateway implements Gateway {
    constructor(worker: Worker);
    send(message: any): void;
    listen(handler: Function): void;
  }
}
