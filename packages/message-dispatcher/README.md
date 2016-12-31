# Message Script / Message Dispatcher

A dispatcher and a mailbox implementation for controlled and strictly ordered message distribution.

## Install

```
npm install message-dispatcher
```

## Usage

```javascript
import { MessageDispatcher, Mailbox, Message } from 'message-dispatcher';

const dispatcher = new MessageDispatcher();
const mailbox = dispatcher.mailboxOf(Mailbox);

mailbox.register(message => /* some routine */);
dispatcher.dispatch(new Message());
```

## What's inside

```javascript
import {
  MessageDispatcher,
  Mailbox,
  Message,
  Envelope
} from 'message-dispatcher';
```
