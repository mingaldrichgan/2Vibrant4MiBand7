const COLORS = {
  blue: 0x5f64fa,
  cyan: 0x09d3ff,
  green: 0x02fa7a,
  orange: 0xff8a00,
  red: 0xff0038,
  teal: 0x00bd9d,
  yellow: 0xffe30b,
};

const EDIT_BARS = withType({
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
    unit: "percent",
  },
  humidity: {
    url: "WeatherScreen",
    color: "cyan",
    unit: "percent",
  },
});

const FONT_WHITE = mkImgArray("fonts/white");
const FONT_RED = mkImgArray("fonts/red");
const FONT_GREEN = mkImgArray("fonts/green");
const EDIT_WIDGETS = withType({
  weather_current: {
    url: "WeatherScreen",
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
        x: 53,
        y: y + 48,
        w: 96,
        h: 30,
        align_h: hmUI.align.CENTER_H,
        invalid_image: "fonts/white/null.png",
        negative_image: "fonts/white/minus.png",
        show_level: hmUI.show_level.ONLY_NORMAL,
        type: hmUI.data_type.WEATHER_CURRENT,
        font_array: FONT_WHITE,
        unit_en: "fonts/white/degree.png",
        unit_sc: "fonts/white/degree.png",
        unit_tc: "fonts/white/degree.png",
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
    unit: "percent",
  },
  humidity: {
    url: "WeatherScreen",
    color: "cyan",
    unit: "percent",
  },
  aqi: {
    url: "WeatherScreen",
    color: "white",
  },
  sun_rise: {
    url: "WeatherScreen",
    color: "white",
    dotOrColon: "colon",
  },
  sun_set: {
    url: "WeatherScreen",
    color: "white",
    dotOrColon: "colon",
  },
  uvi: {
    url: "WeatherScreen",
    color: "white",
  },
  count_down: {
    url: "CountdownAppScreen",
    color: "white",
    dotOrColon: "colon",
  },
  stop_watch: {
    url: "StopWatchScreen",
    color: "white",
    dotOrColon: "colon",
  },
  sleep: {
    url: "Sleep_HomeScreen",
    color: "white",
    dotOrColon: "colon",
  },
  alarm_clock: {
    url: "AlarmInfoScreen",
    color: "white",
    dotOrColon: "colon",
  },
});

const EDIT_VOID = { type: 99, preview: "" };
