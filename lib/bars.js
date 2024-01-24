const NONE = { type: { value: 0, en: "None", sc: "无", tc: "無" }, preview: "" };

const red = { fg: 0xff0038, bg: 0x4c0011, font: "red" };
const yellow = { fg: 0xffd801, bg: 0x4c4100, font: "yellow" };

const BAR_TYPES = {
  HUMIDITY: { url: "WeatherScreen", color: { fg: 0x0dd3ff, bg: 0x043f4c } },
  BATTERY: { url: "Settings_batteryManagerScreen", color: { fg: 0x02fa7a, bg: 0x014b25 }, unit: "percent" },
  BRIGHTNESS: {
    type: { value: 1, en: "Brightness", sc: "亮度", tc: "亮度" },
    url: "Settings_lightAdjustScreen",
    color: { fg: 0xbfbfbf, bg: 0x393939 },
    color: "gray",
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
  STEP: { url: "activityAppScreen", color: yellow },
  DISTANCE: {
    url: "activityAppScreen",
    color: yellow,
    dotOrColon: "dot",
    renderArc: (props) => hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { ...props, type: hmUI.data_type.STEP }),
  },
  STAND: { url: "activityAppScreen", color: { fg: 0x36cf6e } },
  CAL: { url: "activityAppScreen", color: { fg: 0xff8a01, bg: 0x4c2900 } },
  PAI_WEEKLY: { url: "pai_app_Screen", color: { fg: 0x5252ff, bg: 0x19194c } },
  STRESS: { url: "StressHomeScreen", color: { fg: 0x00bd9d, bg: 0x00382f } },
  HEART: { url: "heart_app_Screen", color: red },
  SPO2: { url: "spo_HomeScreen", color: red, unit: "percent" },
  SLEEP_SCORE: {
    type: { value: 2, en: "Sleep Score", sc: "睡眠得分", tc: "睡眠評分" },
    url: "Sleep_HomeScreen",
    color: { fg: 0x7b53ff, bg: 0x25194c, font: "SLEEP" },
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
