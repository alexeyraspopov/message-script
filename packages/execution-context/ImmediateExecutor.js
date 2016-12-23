/**
 * Schedules a routine execution on the next event loop
 */
export default class ImmediateExecutor {
  execute(routine) {
    return new Promise(resolve => resolve(routine()));
  }
}
