export default class ExecutionContext {
  constructor(executor) {
    this.executor = executor;
    this.queue = [];
    this.current = Promise.resolve();
  }

  execute(routine, token) {
    return new Promise((resolve, reject) => {
      this.queue.push(new Task(routine, resolve, reject, token));

      if (this.queue.length === 1) this.flush();
    });
  }

  flush() {
    return this.current.then(() => {
      this.current = this.executor.execute(this.queue);
      this.queue = [];
    });
  }
}

class Task {
  constructor(routine, resolve, reject, token) {
    this.routine = routine;
    this.resolve = resolve;
    this.reject = reject;
    this.token = token;
  }

  run() {
    if (this.token && this.token.isCancelled) {
      return this.reject();
    }

    try {
      this.resolve(this.routine());
    } catch (error) {
      this.reject(error);
    }
  }
}
