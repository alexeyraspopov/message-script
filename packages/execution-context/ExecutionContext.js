export default class ExecutionContext {
  constructor(executor, concurrent = 1, manual = false) {
    this.executor = executor;
    this.concurrent = concurrent;
    this.manual = manual;
    this.queue = [];
    this.current = Promise.resolve();
  }

  execute(routine) {
    return new Promise((resolve, reject) => {
      this.queue.push({ routine, resolve, reject });

      if (!this.manual && this.queue.length === 1) {
        this.enqueue();
      }
    });
  }

  enqueue() {
    return this.current.then(() => {
      const batch = this.queue.splice(0, this.concurrent);
      this.current = this.executor.execute(batchTasks(batch));
      return this.queue.length === 0 || this.enqueue();
    });
  }
}

function batchTasks(tasks) {
  return function batch() {
    tasks.forEach(task => {
      try {
        task.resolve(task.routine());
      } catch (error) {
        task.reject(error);
      }
    });
  };
}
