import { ActorSystem, Actor } from 'actor-system';
import { MessageDispatcher, Message } from 'message-dispatcher';

class Ping extends Message { }

class Player extends Actor {
  receive(message, sender) {
    console.log(`${this.name} got ${message.data.count}`);
    sender.tell(new Ping({ count: message.data.count + 1 }), this);
  }
}

const dispatcher = new MessageDispatcher();
const system = new ActorSystem(dispatcher);

const firstPlayer = system.actorOf(Player, 'first');
const secondPlayer = system.actorOf(Player, 'second');

firstPlayer.tell(new Ping({ count: 0 }), secondPlayer);
