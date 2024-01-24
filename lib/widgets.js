const white = { font: "white" };

const WIDGET_TYPES = {
  WEATHER_CURRENT: {
    type: { value: 10, en: "Weather", sc: "天气", tc: "天氣" },
    url: "WeatherScreen",
    color: white,
    unit: "degree",
    renderIcon: (props) => {
      const dayIcons = getImageArray("icons/weather", 29);
      const nightIcons = [dayIcons[26], dayIcons[27], dayIcons[2], dayIcons[28], dayIcons.slice(4)];

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
    renderText: (props) => {
      hmUI.createWidget(hmUI.widget.TEXT_IMG, {
        ...props,
        x: 53,
        negative_image: "fonts/widgets/white/minus.png",
        type: hmUI.data_type.WEATHER_CURRENT,
      });
    },
  },
  AQI: { url: "WeatherScreen", color: white },
  UVI: { url: "WeatherScreen", color: white },
  SUN_RISE: {
    type: { value: 11, en: "Sunrise", sc: "日出", tc: "日出" },
    url: "WeatherScreen",
    color: white,
    dotOrColon: "colon",
  },
  SUN_SET: {
    type: { value: 12, en: "Sunset", sc: "日落", tc: "日落" },
    url: "WeatherScreen",
    color: white,
    dotOrColon: "colon",
  },
  ALARM_CLOCK: { url: "AlarmInfoScreen", color: white, dotOrColon: "colon", padding: 1 },
  ...BAR_TYPES,
  SLEEP: {
    type: { value: 13, en: "Sleep Hours", sc: "睡眠小时", tc: "睡眠小時" },
    url: "Sleep_HomeScreen",
    dotOrColon: "dot",
  },
};
