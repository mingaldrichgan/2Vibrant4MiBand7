export const SLEEP = hmSensor.createSensor(hmSensor.id.SLEEP);
export const TIME = hmSensor.createSensor(hmSensor.id.TIME);
export const VIBRATE = hmSensor.createSensor(hmSensor.id.VIBRATE);
export const WEATHER = hmSensor.createSensor(hmSensor.id.WEATHER);

export function getDateWidth() {
  return ((TIME.month < 10 ? 1 : 2) + (TIME.day < 10 ? 1 : 2)) * 14 + 10;
}

/** @see https://docs.zepp.com/docs/watchface/api/hmSensor/sensorId/VIBRATE/ */
export function vibrate(scene = 24) {
  VIBRATE.stop();
  VIBRATE.scene = scene;
  VIBRATE.start();
}
