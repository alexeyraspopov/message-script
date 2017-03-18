# Message Script / Uniform Environment

```javascript
// index.js
import { UniformEnvironment, WorkerGateway } from 'uniform-environment';

const worker = new Worker('worker.js');
const environment = UniformEnvironment.from([
  new WorkerGateway(worker)
], receive);

function receive(message, sender) {
  // TODO
}
```

```javascript
// worker.js
import { UniformEnvironment, WorkerGateway } from 'uniform-environment';

const environment = UniformEnvironment.from([
  new WorkerGateway(self)
], receive);

function receive(message, sender) {
  // TODO
}
```
