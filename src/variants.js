const COLORS = {
  blue: [0x5252ff, 0x19194c],
  cyan: [0x0dd3ff, 0x043f4c],
  green: [0x02fa7a, 0x014b25],
  orange: [0xff8a01, 0x4c2900],
  purple: [0x7b53ff, 0x25194c],
  red: [0xff0038, 0x4c0011],
  teal: [0x00bd9d, 0x00382f],
  white: [0xffffff, 0x4c4c4c],
  yellow: [0xffd801, 0x4c4100],
};

const EDIT_NULL = { type: 100_000, preview: "", title_en: "––", title_sc: "––", title_tc: "––" };

const EDIT_BARS = {
  humidity: {
    url: "WeatherScreen",
    color: "cyan",
  },
  battery: {
    url: "Settings_batteryManagerScreen",
    color: "green",
    unit: "percent",
  },
  brightness: {
    editType: EDIT_NULL.type + 1,
    url: "Settings_lightAdjustScreen",
    title_en: "Brightness",
    title_sc: "亮度",
    title_tc: "亮度",
    color: "white",
    unit: "percent",
    renderArc: (props) => {
      const arc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { ...props, level: hmSetting.getBrightness() });
      timer.createTimer(100, 100, () => arc.setProperty(hmUI.prop.LEVEL, hmSetting.getBrightness()));
    },
    renderText: (props) => {
      const text = hmUI.createWidget(hmUI.widget.TEXT_IMG, { ...props, text: hmSetting.getBrightness() });
      timer.createTimer(100, 100, () => text.setProperty(hmUI.prop.TEXT, String(hmSetting.getBrightness())));
    },
  },
  step: {
    url: "activityAppScreen",
    color: "yellow",
  },
  distance: {
    url: "activityAppScreen",
    color: "yellow",
    dotOrColon: "dot",
    renderArc: (props) => hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { ...props, type: hmUI.data_type.STEP }),
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
  sleep_score: {
    editType: EDIT_NULL.type + hmUI.data_type.SLEEP,
    url: "Sleep_HomeScreen",
    color: "purple",
    title_en: "Sleep Score",
    title_sc: "睡眠得分",
    title_tc: "睡眠評分",
    renderArc: (props) => {
      const arc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { ...props, level: SLEEP.getBasicInfo().score });
      timer.createTimer(1000, 1000, () => arc.setProperty(hmUI.prop.LEVEL, SLEEP.getBasicInfo().score));
    },
    renderText: (props) => {
      const text = hmUI.createWidget(hmUI.widget.TEXT_IMG, { ...props, text: SLEEP.getBasicInfo().score });
      timer.createTimer(1000, 1000, () => text.setProperty(hmUI.prop.TEXT, String(SLEEP.getBasicInfo().score)));
    },
  },
};

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

      const getIcons = () => {
        const { sunrise, sunset } = WEATHER.getForecastWeather().tideData.data[0];
        const now = TIME.hour * 60 + TIME.minute;
        return sunrise.hour * 60 + sunrise.minute <= now && now < sunset.hour * 60 + sunset.minute
          ? dayIcons
          : nightIcons;
      };

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
