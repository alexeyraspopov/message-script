/**
 * Makes sure scheduled routine won't be called if particular reason appeared.
 * @example
 *     const token = new CancelToken()
 *     context.execute(routine, token);
 *     token.cancel();
 */
export default class CancelToken {
  constructor() {
    this.isCancelled = false;
  }

  /**
   * Makes token cancelled which should be processed by the execution context
   */
  cancel() {
    this.isCancelled = true;
  }
}
