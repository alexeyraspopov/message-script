importScripts('environment.js', 'messages.js', 'gateway.js');

const WORKER_ID = Math.random();

const environment = new UniformEnvironment([
  new WorkerGateway(self),
], (message, sender) => {
  console.log('worker', WORKER_ID, message);

  switch (message.subject) {
  case Ping.name:
    sender.send(new FuckOff());
    break;
  }
});
