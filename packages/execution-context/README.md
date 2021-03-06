# Message Script / Execution Context

A generic implementation of concurrent and sequential code execution.

## Install

```
npm install execution-context
```

## Usage

```javascript
import { ExecutionContext, ImmediateExecutor } from 'execution-context';

const executor = new ImmediateExecutor();
const context = new ExecutionContext(executor);

context.execute(() => /* some routine */);
```

## Executors

This package includes a set of executors which uses different APIs to schedule routines execution.

```javascript
import {
  AnimationFrameExecutor,
  DelayExecutor,
  IdleCallbackExecutor,
  ImmediateExecutor
} from 'execution-context';
```
