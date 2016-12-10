export default class ImmediateExecutor {
  async execute(routine) {
    return routine();
  }
}
