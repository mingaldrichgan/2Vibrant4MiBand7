const COLORS = {
  blue: [0x5252ff, 0x19194c],
  cyan: [0x0dd3ff, 0x043f4c],
  green: [0x02fa7a, 0x014b25],
  orange: [0xff8a01, 0x4c2900],
  red: [0xff0038, 0x4c0011],
  teal: [0x00bd9d, 0x00382f],
  yellow: [0xffd801, 0x4c4100],
};

const EDIT_BARS = {
  battery: {
    url: "Settings_batteryManagerScreen",
    color: "green",
    unit: "percent",
  },
  step: {
    url: "activityAppScreen",
    color: "yellow",
  },
  distance: {
    progressType: hmUI.data_type.STEP,
    url: "activityAppScreen",
    color: "yellow",
    dotOrColon: "dot",
  },
  cal: {
    url: "activityAppScreen",
    color: "orange",
  },
  pai_weekly: {
    url: "pai_app_Screen",
    color: "blue",
  },
  heart: {
    url: "heart_app_Screen",
    color: "red",
  },
  stress: {
    url: "StressHomeScreen",
    color: "teal",
  },
  stand: {
    url: "activityAppScreen",
    color: "green",
  },
  spo2: {
    url: "spo_HomeScreen",
    color: "red",
  },
  humidity: {
    url: "WeatherScreen",
    color: "cyan",
  },
};

const EDIT_WIDGETS = {
  weather_current: {
    url: "WeatherScreen",
    title_en: "Weather",
    title_sc: "天气",
    title_tc: "天氣",
    render: (y) => {
      const weatherImage = hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
        x: 74,
        y,
        image_array: mkImgArray("widgets/weather", 29, isNight()),
        image_length: 29,
        type: hmUI.data_type.WEATHER_CURRENT,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });

      hmUI.createWidget(hmUI.widget.TEXT_IMG, {
        x: 54,
        y: y + 48,
        w: 96,
        h: 30,
        align_h: hmUI.align.CENTER_H,
        invalid_image: "fonts/white/null.png",
        negative_image: "fonts/white/minus.png",
        show_level: hmUI.show_level.ONLY_NORMAL,
        type: hmUI.data_type.WEATHER_CURRENT,
        ...withFont("white", { unit: "degree" }),
      });

      timer.createTimer(
        350,
        2300,
        () => {
          var currentNight = isNight();
          if (currentNight != prevNight) {
            weatherImage.setProperty(hmUI.prop.MORE, {
              image_array: mkImgArray("widgets/weather", 29, currentNight),
            });
            prevNight = currentNight;
          }
        },
        {},
      );
    },
  },
  battery: {
    url: "Settings_batteryManagerScreen",
    color: "green",
    unit: "percent",
  },
  step: {
    url: "activityAppScreen",
    color: "yellow",
  },
  distance: {
    url: "activityAppScreen",
    color: "yellow",
    dotOrColon: "dot",
  },
  cal: {
    url: "activityAppScreen",
    color: "orange",
  },
  pai_weekly: {
    url: "pai_app_Screen",
    color: "blue",
  },
  heart: {
    url: "heart_app_Screen",
    color: "red",
  },
  stress: {
    url: "StressHomeScreen",
    color: "teal",
  },
  stand: {
    url: "activityAppScreen",
    color: "green",
  },
  spo2: {
    url: "spo_HomeScreen",
    color: "red",
  },
  humidity: {
    url: "WeatherScreen",
    color: "cyan",
  },
  aqi: {
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
  uvi: {
    url: "WeatherScreen",
    color: "white",
  },
  sleep: {
    url: "Sleep_HomeScreen",
    color: "white",
    dotOrColon: "dot",
  },
  alarm_clock: {
    url: "AlarmInfoScreen",
    color: "white",
    dotOrColon: "colon",
    padding: 1,
  },
};
