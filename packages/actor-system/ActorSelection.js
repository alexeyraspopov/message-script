export default class ActorSelection {
  constructor(system, selector) {
    this.system = system;
    this.selector = selector;
  }

  [Symbol.iterator]() {
    const actors = Array.from(this.system.actors.entries());
    const selection = actors.filter(([key]) => key.indexOf(this.selector) > -1);

    return selection[Symbol.iterator]();
  }
}
