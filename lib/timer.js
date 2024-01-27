const ms = 125;
let callbacks;

export function addTimer(callback) {
  if (!callbacks) {
    callbacks = [callback];
    timer.createTimer(ms, ms, () => callbacks.forEach((fn) => fn()));
  } else {
    callbacks.push(callback);
  }
}
