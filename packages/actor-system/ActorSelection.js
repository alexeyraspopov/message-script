export default class ActorSelection {
  constructor(system, selector) {
    this.system = system;
    this.selector = selector;
  }

  *[Symbol.iterator]() {
    for (const [name, actor] of this.system.actors.entries()) {
      switch (typeof this.selector) {
      case 'string':
        if (name.indexOf(this.selector) > -1) yield [name, actor];
        break;

      case 'function':
        if (actor.source.constructor === this.selector) yield [name, actor];
        break;
      }
    }
  }
}
