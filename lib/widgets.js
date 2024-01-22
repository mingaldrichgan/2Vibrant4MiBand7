const EDIT_WIDGETS = {
  weather_current: {
    url: "WeatherScreen",
    title_en: "Weather",
    title_sc: "天气",
    title_tc: "天氣",
    color: "white",
    unit: "degree",
    renderIcon: (props) => {
      const dayIcons = getImageArray("widgets/weather", 29);
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
  aqi: {
    url: "WeatherScreen",
    color: "white",
  },
  uvi: {
    url: "WeatherScreen",
    color: "white",
  },
  sun_rise: {
    url: "WeatherScreen",
    color: "white",
    dotOrColon: "colon",
    title_en: "Sunrise",
    title_sc: "日出",
    title_tc: "日出",
  },
  sun_set: {
    url: "WeatherScreen",
    color: "white",
    dotOrColon: "colon",
    title_en: "Sunset",
    title_sc: "日落",
    title_tc: "日落",
  },
  alarm_clock: {
    url: "AlarmInfoScreen",
    color: "white",
    dotOrColon: "colon",
    padding: 1,
  },
  ...EDIT_BARS,
  sleep: {
    url: "Sleep_HomeScreen",
    color: "purple",
    dotOrColon: "dot",
    title_en: "Sleep Hours",
    title_sc: "睡眠小时",
    title_tc: "睡眠小時",
  },
};
