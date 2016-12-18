import { ActorSystem, Actor } from 'actor-system';
import { Message } from 'message-dispatcher';

class Ping extends Message { }

class First extends Actor {
  receive(message) {
    const enemy = this.system.actorOf(Second, 'second');
    console.log(`First player got ${message.data.count}`);
    enemy.tell(new Ping({ count: message.data.count + 1 }), this);
  }
}

class Second extends Actor {
  receive(message) {
    const enemy = this.system.actorOf(First, 'first');
    console.log(`Second player got ${message.data.count}`);
    enemy.tell(new Ping({ count: message.data.count + 1 }), this);
  }
}

const system = new ActorSystem();
const firstPlayer = system.actorOf(First, 'first');

firstPlayer.tell(new Ping({ count: 0 }));
