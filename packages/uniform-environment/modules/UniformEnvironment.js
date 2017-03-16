export default class UniformEnvironment {
  static create(children, receiver) {
    const environment = new UniformEnvironment(children, receiver);

    const handler = (event) => {
      receiver(event.data.message, event.data.sender);
    };

    for (const child of children) {
      child.listen(handler);
    }
  }

  constructor(children, routine) {
    this.children = children;
    this.routine = routine;
    this.processes = new Map();
  }

  post(message) {
    for (const child of this.children.values()) {
      child.send(message);
    }
  }
}
