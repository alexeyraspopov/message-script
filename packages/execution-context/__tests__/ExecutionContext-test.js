import ExecutionContext from '../modules/ExecutionContext';
import ImmediateExecutor from '../modules/ImmediateExecutor';
import CancelToken from '../modules/CancelToken';

describe('ExecutionContext', () => {
  const executor = new ImmediateExecutor();
  const context = new ExecutionContext(executor);

  it('should execute code and return the result', async () => {
    const value = {};
    const routine = jest.fn(() => value);
    const result = context.execute(routine);

    expect(result instanceof Promise).toBeTruthy();
    expect(routine).not.toHaveBeenCalled();

    await Promise.resolve(); // wait for the next tick
    expect(routine).toHaveBeenCalled();
    expect(await result).toBe(value);
  });

  it('should execute a set of tasks asynchronously', async () => {
    const routineA = jest.fn();
    const routineB = jest.fn();

    context.execute(routineA);
    context.execute(routineB);

    expect(routineA).not.toHaveBeenCalled();
    expect(routineB).not.toHaveBeenCalled();

    await Promise.resolve(); // wait for the next tick
    expect(routineA).toHaveBeenCalled();
    expect(routineB).not.toHaveBeenCalled();

    await Promise.resolve(); // wait for the next tick
    expect(routineB).toHaveBeenCalled();
  });

  it('should continue executing code after a failure', async () => {
    const routineA = jest.fn(() => { throw new Error('Boooom') });
    const routineB = jest.fn();
    let failure = null;

    context.execute(routineA).catch(error => { failure = error; });
    context.execute(routineB);

    await Promise.resolve(); // wait for the next tick
    expect(routineA).toHaveBeenCalled();
    await Promise.resolve(); // wait for the next tick, thanks catch
    expect(failure.message).toEqual('Boooom');

    await Promise.resolve(); // wait for the next tick
    expect(routineB).toHaveBeenCalled();
  });

  it('should cancel a routine execution', async () => {
    const token = new CancelToken();
    const routine = jest.fn();

    context.execute(routine, token);
    token.cancel();

    await Promise.resolve(); // wait for the next tick
    expect(routine).not.toHaveBeenCalled();
  });
});
