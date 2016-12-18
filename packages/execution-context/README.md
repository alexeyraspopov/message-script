# Message Script / Execution Context

A primitive implementation of concurrent and sequential code execution.

## Usage

```javascript
import { ExecutionContext, ImmediateExecutor } from 'execution-context';

const executor = new ImmediateExecutor();
const context = new ExecutionContext(executor);

context.execute(() => /* some routine */);
```
