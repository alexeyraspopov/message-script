declare module ActorSystem {
  export class ActorSystem {
    actorOf(): Actor;
    dispatch(): void;
  }

  export class Actor {
    receive(): void;
  }
}
