export default class CancelToken {
  constructor() {
    this.isCancelled = false;
  }

  cancel() {
    this.isCancelled = true;
  }
}
