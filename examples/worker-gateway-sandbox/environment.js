class UniformEnvironment {
  constructor(nodes = [], routine) {
    this.nodes = nodes;
    this.routine = routine;

    const eventHandler = (event) => {
      this.routine(event.data.message, event.data.sender);
    };

    for (const node of this.nodes) node.listen(eventHandler);
  }

  send(message) {
    for (const node of this.nodes) {
      node.post({ message });
    }
  }
}
