import { BAR_TYPES } from "./bars";
import { TIME, WEATHER } from "./sensors";
import { getImageArray } from "./utils";

export const WIDGET_TYPES = {
  WEATHER_CURRENT: {
    type: { value: 11, en: "Weather", sc: "天气", tc: "天氣" },
    url: "WeatherScreen",
    renderIcon: (props) => {
      const dayIcons = getImageArray("icons/weather", 29);
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
    type: { value: 12, en: "Sunrise", sc: "日出", tc: "日出" },
    url: "WeatherScreen",
    symbols: { dot: "colon" },
  },
  SUN_SET: {
    type: { value: 13, en: "Sunset", sc: "日落", tc: "日落" },
    url: "WeatherScreen",
    symbols: { dot: "colon" },
  },
  ALARM_CLOCK: { url: "AlarmInfoScreen", hasColon: true, textProps: { padding: 1 } },
  STOP_WATCH: { url: "StopWatchScreen", hasColon: true, symbols: { invalid: "start" } },
  TIMER: {
    type: { value: 14, en: "Toolbox Timer", sc: "定时器 (工具箱)", tc: "定时器 (工具箱)" },
    url: { appid: 33904, url: "page/TimerSetScreen" },
    getText: {
      fn: () => {
        const state = hmFS.SysProGetChars("mmk_tb_timer_state");
        if (!state) return "-";

        const [, , endTime] = state.split(":").map((v) => parseInt(v));
        const secondsLeft = Math.floor((endTime - Date.now()) / 1000);
        if (secondsLeft <= 0) return "-";

        const hasHours = secondsLeft >= 3600;
        const beforeColon = Math.trunc(secondsLeft / (hasHours ? 3600 : 60));
        const afterColon = hasHours ? Math.trunc((secondsLeft % 3600) / 60) : secondsLeft % 60;
        return `${beforeColon}.${afterColon.toString().padStart(2, "0")}`;
      },
      ms: 250,
    },
    symbols: { dot: "colon", minus: "start" },
  },
  ...BAR_TYPES,
};
