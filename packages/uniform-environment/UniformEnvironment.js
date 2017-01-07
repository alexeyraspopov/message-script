export default class UniformEnvironment {
  constructor(children) {

  }

  spawn(routine) {

  }

  post(message) {
    for (const child of children) {
      child.send(message);
    }
  }
}
