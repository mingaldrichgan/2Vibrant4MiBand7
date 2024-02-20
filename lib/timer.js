const TIMER_MS = 125;
let callbacks;

export function addTimer(callback) {
  if (!callbacks) {
    callbacks = [callback];
    timer.createTimer(TIMER_MS, TIMER_MS, () => callbacks.forEach((fn) => fn()));
  } else {
    callbacks.push(callback);
  }
}
