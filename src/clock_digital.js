const osLang = DeviceRuntimeCore.HmUtils.getLanguage();

const DEFAULT_WEEKDAY_X = 104;
const OVERRIDE_WEEKDAY_X = {
  "ru-RU": 120,
  "zh-CN": 111,
  "zh-TW": 111,
};

function _renderTimeDigital(isAOD) {
  renderDate();

  const fontTime = mkImgArray(`digital/clock/${isAOD ? "aod" : "normal"}`);
  hmUI.createWidget(hmUI.widget.IMG_TIME, {
    hour_startX: 26,
    hour_startY: 125,
    hour_zero: 1,
    hour_array: fontTime,
    minute_startX: 26,
    minute_startY: 230,
    minute_zero: 1,
    minute_array: fontTime,
  });
}

function renderDate() {
  const fontDate = mkImgArray("digital/date");
  hmUI.createWidget(hmUI.widget.IMG_DATE, {
    month_startX: 30,
    month_startY: 336,
    month_en_array: fontDate,
    month_sc_array: fontDate,
    month_tc_array: fontDate,
    month_unit_en: "digital/date/slash.png",
    month_unit_sc: "digital/date/slash.png",
    month_unit_tc: "digital/date/slash.png",
    month_zero: 0,
    day_follow: 1,
    day_en_array: fontDate,
    day_sc_array: fontDate,
    day_tc_array: fontDate,
    day_zero: 0,
  });

  hmUI.createWidget(hmUI.widget.IMG_WEEK, {
    x: OVERRIDE_WEEKDAY_X[osLang] ?? DEFAULT_WEEKDAY_X,
    y: 336,
    week_en: mkImgArray(`weekday/${osLang}`, 7),
    week_sc: mkImgArray("weekday/zh-CN", 7),
    week_tc: mkImgArray("weekday/zh-TW", 7),
  });
}
