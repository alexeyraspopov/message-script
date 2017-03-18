export default class UniformEnvironment {
  static from(children, receiver) {
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
  }

  broadcast(message) {
    for (const child of this.children) {
      child.send(message);
    }
  }
}
