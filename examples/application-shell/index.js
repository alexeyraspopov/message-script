const dispatcher = new MessageDispatcher();
const system = new ActorSystem(dispatcher);

class Logger extends Actor {
  receive(message) {
    console.log(message, this);
  }
}

class JobQueueStore extends Actor {
  constructor(system) {
    super(system);
    this.jobs = new Map();
    this.progress = new Map();
  }

  receive(message) {
    switch (message.subject) {
    case JobInitialized.name:
      this.jobs.set(message.content.id, message.content);
      break;
    case JobProgressUpdated.name:
      this.progress.set(message.content.id, message.content.progress);
      break;
    }
  }
}

class JobQueueController extends Actor {
  receive(message) {
    switch (message.subject) {
    case AppInitialized.name:
      this.system.spawn(JobQueueStore, 'jqstore');
    }
  }
}

system.spawn(Logger, 'applicationLogger');
system.spawn(JobQueueController, 'jqctl');

dispatcher.dispatch(new AppInitialized());
