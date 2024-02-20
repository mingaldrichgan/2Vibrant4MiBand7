import { BAR_TYPES } from "../bars/types";
import { watchface } from "../events";
import { TIME, WEATHER } from "../sensors";
import { getImageArray } from "../utils";
import { Countdown } from "./countdown";
import { Stopwatch } from "./stopwatch";

export const WIDGET_TYPES = {
  ALARM_CLOCK: { url: "AlarmInfoScreen", hasColon: true, textProps: { padding: 1 } },
  STOP_WATCH: {
    url: () => {
      Stopwatch.toggle();
      Stopwatch.icon?.setProperty(hmUI.prop.SRC, Stopwatch.getIcon());
    },
    renderIcon: (props) => {
      Stopwatch.icon = watchface.createWidget(hmUI.widget.IMG, { ...props, src: Stopwatch.getIcon() });
    },
    getText: () => Stopwatch.getText(),
    symbols: { dot: "colon", minus: "null" },
  },
  /** Requires [Toolbox](https://github.com/melianmiko/ZeppOS-Toolbox) */
  COUNT_DOWN: {
    url: () => Countdown.showOverlay(),
    getText: () => {
      // const state = hmFS.SysProGetChars("mmk_tb_timer_state");
      // if (!state) return "-.-";
      // const [, , endTime] = state.split(":").map((v) => parseInt(v));
      // return endTime < 0 ? "-" : formatTime(endTime - Date.now());
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
      const weatherImage = watchface.createWidget(hmUI.widget.IMG_LEVEL, {
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
