const EDIT_BARS = {
  battery: {
    value: 0,
    dataType: hmUI.data_type.BATTERY,
    unit: "fonts/sm_green/percent.png",
    url: "Settings_batteryManagerScreen",
    font: "sm_green",
    color: 0x02fa7a,
  },
  steps: {
    value: 1,
    dataType: hmUI.data_type.STEP,
    url: "activityAppScreen",
    font: "sm_yellow",
    color: 0xffe30b,
  },
  consume: {
    value: 2,
    dataType: hmUI.data_type.CAL,
    url: "activityAppScreen",
    font: "sm_orange",
    color: 0xff8a00,
  },
  pai: {
    value: 3,
    dataType: hmUI.data_type.PAI_WEEKLY,
    url: "pai_app_Screen",
    font: "sm_blue",
    color: 0x5f64fa,
  },
  heartrate: {
    value: 4,
    dataType: hmUI.data_type.HEART,
    url: "heart_app_Screen",
    font: "sm_red",
    color: 0xff0038,
  },
  stand: {
    value: 5,
    dataType: hmUI.data_type.STAND,
    url: "activityAppScreen",
    font: "sm_green",
    color: 0x36cf6e,
  },
  spo2: {
    value: 6,
    dataType: hmUI.data_type.SPO2,
    unit: "fonts/sm_red/percent.png",
    url: "spo_HomeScreen",
    font: "sm_red",
    color: 0xff0000,
  },
  humidity: {
    value: 7,
    dataType: hmUI.data_type.HUMIDITY,
    unit: "fonts/sm_cyan/percent.png",
    url: "WeatherScreen",
    font: "sm_cyan",
    color: 0x09d3ff,
  },
  void: {
    value: 99,
  },
};

const FONT_WHITE = mkImgArray("fonts/white");
const FONT_RED = mkImgArray("fonts/red");
const FONT_GREEN = mkImgArray("fonts/green");
const EDIT_WIDGETS = {
  weather: {
    value: 0,
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
        x: 48,
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
    value: 1,
    url: "Settings_batteryManagerScreen",
    config: {
      type: hmUI.data_type.BATTERY,
      font_array: FONT_GREEN,
      unit_en: "fonts/green/percent.png",
      unit_sc: "fonts/green/percent.png",
      unit_tc: "fonts/green/percent.png",
    },
  },
  steps: {
    value: 2,
    url: "activityAppScreen",
    config: {
      type: hmUI.data_type.STEP,
      font_array: mkImgArray("fonts/yellow"),
    },
  },
  consume: {
    value: 3,
    url: "activityAppScreen",
    config: {
      type: hmUI.data_type.CAL,
      font_array: mkImgArray("fonts/orange"),
    },
  },
  pai: {
    value: 4,
    url: "pai_app_Screen",
    config: {
      type: hmUI.data_type.PAI_WEEKLY,
      font_array: mkImgArray("fonts/blue"),
    },
  },
  heartrate: {
    value: 5,
    url: "heart_app_Screen",
    config: {
      type: hmUI.data_type.HEART,
      font_array: FONT_RED,
    },
  },
  stand: {
    value: 6,
    url: "activityAppScreen",
    config: {
      type: hmUI.data_type.STAND,
      font_array: FONT_GREEN,
    },
  },
  spo2: {
    value: 7,
    url: "spo_HomeScreen",
    config: {
      type: hmUI.data_type.SPO2,
      font_array: FONT_RED,
      unit_en: "fonts/red/percent.png",
      unit_sc: "fonts/red/percent.png",
      unit_tc: "fonts/red/percent.png",
    },
  },
  humidity: {
    value: 8,
    url: "WeatherScreen",
    config: {
      type: hmUI.data_type.HUMIDITY,
      font_array: mkImgArray("fonts/cyan"),
      unit_en: "fonts/cyan/percent.png",
      unit_sc: "fonts/cyan/percent.png",
      unit_tc: "fonts/cyan/percent.png",
    },
  },
  aqi: {
    value: 9,
    url: "WeatherScreen",
    config: {
      type: hmUI.data_type.AQI,
      font_array: FONT_WHITE,
    },
  },
  sunrise: {
    value: 10,
    url: "WeatherScreen",
    config: {
      type: hmUI.data_type.SUN_RISE,
      font_array: FONT_WHITE,
      dot_image: "fonts/white/colon.png",
    },
  },
  sunset: {
    value: 11,
    url: "WeatherScreen",
    config: {
      type: hmUI.data_type.SUN_SET,
      font_array: FONT_WHITE,
      dot_image: "fonts/white/colon.png",
    },
  },
  uvi: {
    value: 12,
    url: "WeatherScreen",
    config: {
      type: hmUI.data_type.UVI,
      font_array: FONT_WHITE,
    },
  },
  countdown: {
    value: 13,
    url: "CountdownAppScreen",
    render: (y) => {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 48,
        y,
        src: "widgets/demo/countdown.png",
      });
    },
  },
  stopwatch: {
    value: 14,
    url: "StopWatchScreen",
    render: (y) => {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 48,
        y,
        src: "widgets/demo/stopwatch.png",
      });
    },
  },
  tb_timer: {
    value: 15,
    url: () => {
      hmApp.startApp({
        appid: 33904,
        url: "page/TimerSetScreen",
      });
    },
    render: (y) => {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 74,
        y,
        src: `widgets/icon/tb_timer.png`,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
      const view = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
        x: 48,
        y: y + 48,
        w: 96,
        h: 30,
        align_h: hmUI.align.CENTER_H,
        negative_image: "fonts/white/minus.png",
        dot_image: "fonts/white/colon.png",
        show_level: hmUI.show_level.ONLY_NORMAL,
        text: getTbTimerState(),
        font_array: FONT_WHITE,
      });

      timer.createTimer(0, 500, () => {
        view.setProperty(hmUI.prop.TEXT, getTbTimerState());
      });
    },
  },
  sleep: {
    value: 16,
    url: "Sleep_HomeScreen",
    config: {
      type: hmUI.data_type.SLEEP,
      font_array: FONT_WHITE,
      dot_image: "fonts/white/dot.png",
    },
  },
  alarm: {
    value: 17,
    url: "AlarmInfoScreen",
    config: {
      type: hmUI.data_type.ALARM_CLOCK,
      dot_image: "fonts/white/colon.png",
      font_array: FONT_WHITE,
      padding: 1,
    },
  },
  void: {
    value: 99,
  },
};
