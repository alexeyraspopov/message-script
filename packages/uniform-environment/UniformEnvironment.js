export default class UniformEnvironment {
  constructor(children) {
    this.children = children;
    this.processes = new Map();
    this.id = 0;
  }

  spawn(routine) {
    const address = `ID${this.id++}`;

    this.processes.set(address, routine);

    return address;
  }

  post(message) {
    for (const child of this.children) {
      child.send(message);
    }
  }
}
