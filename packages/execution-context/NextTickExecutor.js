/**
 * Schedules a routine execution using `process.nextTick`
 * https://nodejs.org/api/process.html#process_process_nexttick_callback_args
 */
export default class NextTickExecutor {
  execute(routine) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(routine()));
    });
  }
}
