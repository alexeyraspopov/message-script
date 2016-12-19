# Message Script / Message Dispatcher

A dispatcher and a mailbox implementation for controlled and strictly ordered message distribution.

## Usage

```javascript
import { MessageDispatcher, Mailboxes, Mailbox, Message } from 'message-dispatcher';

const mailboxes = new Mailboxes();
const dispatcher = new MessageDispatcher(mailboxes);

const mailbox = new Mailbox();

mailboxes.register(mailbox);
dispatcher.dispatch(new Message());
```
