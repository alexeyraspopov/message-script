import { ExecutionContext, ImmediateExecutor } from 'execution-context';

export default class MessageDispatcher {
  constructor(context) {
    if (!context) {
      const executor = new ImmediateExecutor();
      context = new ExecutionContext(executor);
    }

    this.context = context;
  }

  dispatch() { }
}
