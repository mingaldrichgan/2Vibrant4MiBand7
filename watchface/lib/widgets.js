import { BAR_TYPES } from "./bars";
import { TIME, WEATHER } from "./sensors";
import { getImageArray } from "./utils";

const stopwatch = {
  startTime: 0,
  endTime: 0,

  getIcon() {
    return `icons/widgets/stopwatch/${this.isStopped() ? "start" : "stop"}.png`;
  },
  getTime() {
    return (this.isStopped() ? this.endTime : Date.now()) - this.startTime;
  },
  isStopped() {
    return this.endTime >= this.startTime;
  },
  start() {
    this.startTime = Date.now();
  },
  stop() {
    this.endTime = Date.now();
  },
};

export const WIDGET_TYPES = {
  WEATHER_CURRENT: {
    type: { value: 11, en: "Weather", sc: "天气", tc: "天氣" }, // Override default: "Current Temperature"
    url: "WeatherScreen",
    renderIcon: (props) => {
      const dayIcons = getImageArray("icons/widgets/weather", 29);
      const nightIcons = [dayIcons[26], dayIcons[27], dayIcons[2], dayIcons[28], ...dayIcons.slice(4)];

      function getIcons() {
        const { sunrise, sunset } = WEATHER.getForecastWeather().tideData.data[0];
        const now = TIME.hour * 60 + TIME.minute;
        return sunrise.hour * 60 + sunrise.minute <= now && now < sunset.hour * 60 + sunset.minute
          ? dayIcons
          : nightIcons;
      }

      let image_array = getIcons();
      const weatherImage = hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
        ...props,
        image_array,
        image_length: 29,
        type: hmUI.data_type.WEATHER_CURRENT,
      });

      TIME.addEventListener(TIME.event.MINUTEEND, () => {
        if (image_array !== (image_array = getIcons())) {
          weatherImage.setProperty(hmUI.prop.MORE, { image_array });
        }
      });
    },
    textProps: { x: 53 },
    symbols: { minus: true, unit: "degree" },
  },
  AQI: { url: "WeatherScreen" },
  UVI: { url: "WeatherScreen" },
  SUN_RISE: {
    type: { value: 12, en: "Sunrise", sc: "日出", tc: "日出" }, // Override default: "Sunset" (OS bug)
    url: "WeatherScreen",
    symbols: { dot: "colon" },
  },
  SUN_SET: {
    type: { value: 13, en: "Sunset", sc: "日落", tc: "日落" }, // Override default: "Sunrise" (OS bug)
    url: "WeatherScreen",
    symbols: { dot: "colon" },
  },
  ALARM_CLOCK: { url: "AlarmInfoScreen", hasColon: true, textProps: { padding: 1 } },
  STOP_WATCH: {
    url: () => {
      stopwatch.isStopped() ? stopwatch.start() : stopwatch.stop();
      stopwatch.icon?.setProperty(hmUI.prop.SRC, stopwatch.getIcon());
    },
    renderIcon: (props) => {
      stopwatch.icon = hmUI.createWidget(hmUI.widget.IMG, { ...props, src: stopwatch.getIcon() });
    },
    getText: {
      fn: () => formatTime(stopwatch.getTime()),
      ms: 250,
    },
    symbols: { dot: "colon" },
  },
  /** Requires [Toolbox](https://github.com/melianmiko/ZeppOS-Toolbox) */
  COUNT_DOWN: {
    url: { appid: 33904, url: "page/TimerSetScreen" },
    getText: {
      fn: () => {
        const state = hmFS.SysProGetChars("mmk_tb_timer_state");
        if (!state) return "-";

        const [, , endTime] = state.split(":").map((v) => parseInt(v));
        return endTime < 0 ? "-" : formatTime(endTime - Date.now());
      },
      ms: 250,
    },
    symbols: { dot: "colon", minus: "start" },
  },
  ...BAR_TYPES,
};

function formatTime(ms) {
  const hasHours = ms >= 3_600_000;
  const beforeColon = Math.trunc(ms / (hasHours ? 3_600_000 : 60_000));
  const afterColon = Math.trunc(hasHours ? (ms % 3_600_000) / 60_000 : (ms % 60_000) / 1000);
  return `${beforeColon}.${String(afterColon).padStart(2, "0")}`;
}
