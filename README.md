Let's assume a dispatcher with just `dispatch()` method and async iterator
interface.

```javascript
class Dispatcher {
  dispatch(payload) {}
  [Symbol.asyncIterator]() {}
}
```

And a unit that handles messages from dispatcher. It can be used for wide set
of tasks.

```javascript
class Actor {
  constructor(dispatcher) {
    for await (const message of dispatcher) {
      this.receive(message); // should it be queued, like mailbox or something?
    }
  }

  receive() {
    // abstract method
  }
}
```

And stores just uses it's iterator to update their state.

Store is just an actor that has internal state and can update it based on
messages it receives.

```javascript
class Store extends Actor {
  constructor(dispatcher) {
    super(dispatcher);
    this.state = this.getInitialState();
  }

  getInitialState() { }

  reduce() { }

  receive(message) {
    this.state = this.reduce(this.state, message);
  }
}
```

We can describe containers in the same way, but with the only difference:
async update dispatching

```javascript
class Container extends Actor {
  receive() {
    schedule(() => this.setState(() => this.calculate()));
  }

  calculate() {
    // abstract
  }
}
```

By this time all stores will be updated.

This pattern eliminate the needs in `waitFor()` and `register()` methods of
Dispatcher.

Q: can I ensure scheduling of containers update since dispatcher's iterator
uses promises?

Q: Dispatcher -> Mailbox -> Actor ?
