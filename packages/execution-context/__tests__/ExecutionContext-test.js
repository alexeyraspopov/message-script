import ExecutionContext from '../ExecutionContext';
import ImmediateExecutor from '../ImmediateExecutor';

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
    await Promise.resolve(); // wait for the next tick, thanks catch
    expect(failure.message).toEqual('Boooom');

    await Promise.resolve(); // wait for the next tick
    expect(routineB).toHaveBeenCalled();
  });

  it('should execute a set of tasks concurrently', async () => {
    const context = new ExecutionContext(executor, 2);
    const routineA = jest.fn();
    const routineB = jest.fn();
    const routineC = jest.fn();

    context.execute(routineA);
    context.execute(routineB);
    context.execute(routineC);

    await Promise.resolve(); // wait for the next tick
    expect(routineA).toHaveBeenCalled();
    expect(routineB).toHaveBeenCalled();
    expect(routineC).not.toHaveBeenCalled();

    await Promise.resolve(); // wait for the next tick
    expect(routineC).toHaveBeenCalled();
  });

  it('should execute code by request in manual mode', async () => {
    const context = new ExecutionContext(executor, 1, true);
    const routine = jest.fn();

    context.execute(routine);

    await Promise.resolve(); // wait for the next tick
    expect(routine).not.toHaveBeenCalled();

    const result = await context.flush();
    expect(result).toBe(true);
    expect(routine).toHaveBeenCalled();
  });
});
