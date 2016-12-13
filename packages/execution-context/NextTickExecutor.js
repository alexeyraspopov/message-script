export default class NextTickExecutor {
  execute(routine) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(routine()));
    });
  }
}
