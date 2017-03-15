/// <reference types="message-dispatcher" />

declare module ActorSystem {
  export class ActorSystem {
    constructor(dispatcher: MessageDispatcher.MessageDispatcher);
    actorOf(): Actor;
    dispatch(): void;
  }

  export class Actor {
    receive(): void;
  }
}
