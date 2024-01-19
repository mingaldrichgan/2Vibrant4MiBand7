const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

function isNight() {
  const { sunrise, sunset } = weatherSensor.getForecastWeather().tideData.data[0];
  const current = timeSensor.hour * 60 + timeSensor.minute;
  return current < sunrise.hour * 60 + sunrise.minute || current > sunset.hour * 60 + sunset.minute;
}
