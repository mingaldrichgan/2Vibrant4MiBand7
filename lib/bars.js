const getBrightness = { fn: hmSetting.getBrightness, ms: 100 };
const getSleepScore = { fn: () => SLEEP.getBasicInfo().score, ms: 1000 };

const BAR_TYPES = {
  HUMIDITY: { url: "WeatherScreen", color: { fg: 0x0dd3ff, bg: 0x043f4c } },
  BATTERY: {
    url: "Settings_batteryManagerScreen",
    color: { fg: 0x02fa7a, bg: 0x014b25 },
    unit: "percent",
  },
  BRIGHTNESS: {
    type: { value: 1, en: "Brightness", sc: "亮度", tc: "亮度" },
    url: "Settings_lightAdjustScreen",
    unit: "percent",
    getProgress: getBrightness,
    getText: getBrightness,
  },
  STEP: { url: "activityAppScreen", color: "yellow" },
  DISTANCE: {
    url: "activityAppScreen",
    color: "yellow",
    hasDot: true,
    progressKey: "STEP",
  },
  STAND: { url: "activityAppScreen", color: "yellow" },
  CAL: { url: "activityAppScreen", color: { fg: 0xff8a01, bg: 0x4c2900 } },
  PAI_WEEKLY: { url: "pai_app_Screen", color: { fg: 0x5252ff, bg: 0x19194c } },
  STRESS: { url: "StressHomeScreen", color: { fg: 0x00bd9d, bg: 0x00382f } },
  HEART: { url: "heart_app_Screen", color: "red" },
  SPO2: { url: "spo_HomeScreen", color: "red", unit: "percent" },
  SLEEP: {
    type: { value: 2, en: "Sleep Hours", sc: "睡眠小时", tc: "睡眠小時" },
    url: "Sleep_HomeScreen",
    color: "purple",
    hasDot: true,
    getProgress: getSleepScore,
  },
  SLEEP_SCORE: {
    type: { value: 3, en: "Sleep Score", sc: "睡眠得分", tc: "睡眠評分" },
    url: "Sleep_HomeScreen",
    color: "purple",
    getProgress: getSleepScore,
    getText: getSleepScore,
  },
};
