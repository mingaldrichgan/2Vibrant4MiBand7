const EDIT_NONE = { type: 100_000, preview: "", title_en: "None", title_sc: "无", title_tc: "無" };

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
    editType: EDIT_NONE.type + 1,
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
    editType: EDIT_NONE.type + hmUI.data_type.SLEEP,
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
