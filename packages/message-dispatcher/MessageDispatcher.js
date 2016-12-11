const { ExecutionContext } = require('./ExecutionContext');
const { ImmediateExecutor } = require('./ImmediateExecutor');

export default class MessageDispatcher {
  constructor() {
    const executor = new ImmediateExecutor();
    const context = new ExecutionContext(executor);
  }

  dispatch() { }
}
