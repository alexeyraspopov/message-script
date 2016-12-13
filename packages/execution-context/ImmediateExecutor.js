export default class ImmediateExecutor {
  execute(routine) {
    return new Promise(resolve => resolve(routine()));
  }
}
