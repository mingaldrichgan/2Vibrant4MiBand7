import { BAR_TYPES } from "../bars/types";
import { TIME, WEATHER } from "../sensors";
import { formatTime, getImageArray } from "../utils";

const stopwatch = {
  startTime: 0,
  endTime: 0,

  getIcon() {
    return `icons/widgets/stopwatch/${this.isStopped() ? "start" : "stop"}.png`;
  },
  isStopped() {
    return this.endTime >= this.startTime;
  },
  toggle() {
    if (this.isStopped()) {
      this.startTime = Date.now(); // start
    } else {
      this.endTime = Date.now(); // stop
    }
  },
};

export const WIDGET_TYPES = {
  ALARM_CLOCK: { url: "AlarmInfoScreen", hasColon: true, textProps: { padding: 1 } },
  STOP_WATCH: {
    url: () => {
      stopwatch.toggle();
      stopwatch.icon?.setProperty(hmUI.prop.SRC, stopwatch.getIcon());
    },
    renderIcon: (props) => {
      stopwatch.icon = hmUI.createWidget(hmUI.widget.IMG, { ...props, src: stopwatch.getIcon() });
    },
    getText: () => {
      let ms = -stopwatch.startTime;
      if (stopwatch.isStopped()) {
        ms += stopwatch.endTime;
        if (ms < 1000) {
          return "-.-";
        }
      } else {
        ms += Date.now();
      }
      return formatTime(ms);
    },
    symbols: { dot: "colon", minus: "null" },
  },
  /** Requires [Toolbox](https://github.com/melianmiko/ZeppOS-Toolbox) */
  COUNT_DOWN: {
    url: { appid: 33904, url: "page/TimerSetScreen" },
    getText: () => {
      const state = hmFS.SysProGetChars("mmk_tb_timer_state");
      if (!state) return "-.-";

      const [, , endTime] = state.split(":").map((v) => parseInt(v));
      return endTime < 0 ? "-" : formatTime(endTime - Date.now());
    },
    symbols: { dot: "colon", minus: "null" },
  },
  SUN_RISE: {
    /** Overrides default title: "Sunset" (OS bug) */
    type: { value: 11, en: "Sunrise", sc: "日出", tc: "日出" },
    url: "WeatherScreen",
    symbols: { dot: "colon" },
  },
  SUN_SET: {
    /** Overrides default title: "Sunrise" (OS bug) */
    type: { value: 12, en: "Sunset", sc: "日落", tc: "日落" },
    url: "WeatherScreen",
    symbols: { dot: "colon" },
  },
  WEATHER_CURRENT: {
    /** Overrides default title: "Current Temperature" */
    type: { value: 13, en: "Weather", sc: "天气", tc: "天氣" },
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
  ...BAR_TYPES,
};
