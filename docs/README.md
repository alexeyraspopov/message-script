# Message Script

Actors are basically concurrent processes that communicate by exchanging messages. Actors can also be seen as a form of active objects where invoking a method corresponds to sending a message.

```javascript
while (mailbox.hasMessages()) {
  actor.receive(mailbox.dequeue());
}
```
