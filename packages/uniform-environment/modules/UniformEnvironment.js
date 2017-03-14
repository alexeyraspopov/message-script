export default class UniformEnvironment {
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
