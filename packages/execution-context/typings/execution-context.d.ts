declare module ExecutionContext {
  interface Executor {
    execute(routines: Array<Function>): Promise<void>;
  }

  /**
   * Executes arbitrary code asynchronously and concurrently.
   *
   *     const executor = new ImmediateExecutor()
   *     const context = new ExecutionContext(executor);
   *     const result = context.execute(() => 'Hello, World!');
   *     result.then(message => console.log(message));
   */
  export class ExecutionContext {
    constructor(executor: Executor);
    execute(routines: Array<Function>, token?: CancelToken): Promise<void>;
  }

  /**
   * Makes sure scheduled routine won't be called if particular reason appeared.
   *
   *     const token = new CancelToken()
   *     context.execute(routine, token);
   *     token.cancel();
   */
  export class CancelToken {
    isCancelled: boolean;
    cancel(): void;
  }

  /**
   * Schedules a routine execution using `requestAnimationFrame`
   * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
   */
  export class AnimationFrameExecutor implements Executor {
    maxDeadline: number;
    constructor(targetFPS: number);
    execute(routines: Array<Function>): Promise<void>;
  }

  /**
   * Schedules a routine execution using `setTimeout`
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
   */
  export class DelayExecutor implements Executor {
    constructor(delay: number);
    execute(routines: Array<Function>): Promise<void>;
  }

  /**
   * Schedules a routine execution using `requestIdleCallback`
   * https://developer.mozilla.org/en-US/docs/Web/API/window/requestIdleCallback
   */
  export class IdleCallbackExecutor implements Executor {
    constructor(timeout: number);
    execute(routines: Array<Function>): Promise<void>;
  }

  /**
   * Schedules a routine execution on the next event loop
   */
  export class ImmediateExecutor implements Executor {
    constructor(concurrent: number);
    execute(routines: Array<Function>): Promise<void>;
  }
}
