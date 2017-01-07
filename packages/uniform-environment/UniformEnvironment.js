export default class UniformEnvironment {
  constructor(children) {
    this.children = children;
    this.processes = new Map();
  }

  spawn(routine) {
    const address = '';

    this.processes.set(address, routine);

    return address;
  }

  post(message) {
    for (const child of this.children) {
      child.send(message);
    }
  }
}
