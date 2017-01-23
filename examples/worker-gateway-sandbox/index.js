const workerA = new Worker('worker.js');
const workerB = new Worker('worker.js');

const environment = new UniformEnvironment([
  new WorkerGateway(workerA),
  new WorkerGateway(workerB),
], (message, sender) => {
  console.log('master', message);

  switch (message.subject) {
  case FuckOff.name:
    console.log('master', message, sender);
    break;
  }
});

environment.send(new Ping());
