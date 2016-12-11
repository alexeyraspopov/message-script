import { ExecutionContext, ImmediateExecutor } from 'execution-context';

export default class MessageDispatcher {
  constructor() {
    const executor = new ImmediateExecutor();
    const context = new ExecutionContext(executor);
  }

  dispatch() { }
}
