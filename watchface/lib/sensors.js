export const TIME = hmSensor.createSensor(hmSensor.id.TIME);
export const SLEEP = hmSensor.createSensor(hmSensor.id.SLEEP);
export const WEATHER = hmSensor.createSensor(hmSensor.id.WEATHER);

export function getDateWidth() {
  return ((TIME.month < 10 ? 1 : 2) + (TIME.day < 10 ? 1 : 2)) * 14 + 10;
}
