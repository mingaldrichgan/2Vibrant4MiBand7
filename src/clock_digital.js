const osLang = DeviceRuntimeCore.HmUtils.getLanguage();
const hasWeekday = osLang.startsWith("en") || osLang.startsWith("zh");

function _renderTimeDigital({ hasPointer, isAOD }) {
  const fontTime = getImageArray(`fonts/clock/${isAOD ? "aod" : "normal"}`);
  hmUI.createWidget(hmUI.widget.IMG_TIME, {
    hour_startX: 26,
    hour_startY: 106,
    hour_zero: 1,
    hour_array: fontTime,
    minute_startX: 26,
    minute_startY: 242,
    minute_zero: 1,
    minute_array: fontTime,
  });

  return _renderDate(hasPointer);
}

function _renderDate(hasPointer) {
  const fontDate = getImageArray("fonts/date");

  function getDateWidth() {
    return ((TIME.month < 10 ? 1 : 2) + (TIME.day < 10 ? 1 : 2)) * 14 + 10;
  }

  function getCenterX() {
    const weekdayWidth = hasWeekday ? 52 : 0;
    const x = Math.round((192 - getDateWidth() - weekdayWidth) / 2);
    return { x, month_startX: x + weekdayWidth };
  }

  let { x, month_startX } = hasPointer ? { x: 32, month_startX: 114 } : getCenterX();
  const date = hmUI.createWidget(hmUI.widget.IMG_DATE, {
    month_startX,
    month_startY: 234,
    month_en_array: fontDate,
    month_sc_array: fontDate,
    month_tc_array: fontDate,
    month_unit_en: "fonts/date/slash.png",
    month_unit_sc: "fonts/date/slash.png",
    month_unit_tc: "fonts/date/slash.png",
    month_zero: 0,
    day_follow: 1,
    day_en_array: fontDate,
    day_sc_array: fontDate,
    day_tc_array: fontDate,
    day_zero: 0,
  });

  const weekday =
    hasWeekday &&
    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x,
      y: 230,
      week_en: getImageArray(`weekday/en`, 7),
      week_sc: getImageArray("weekday/sc", 7),
      week_tc: getImageArray("weekday/tc", 7),
    });

  if (hasPointer) return getDateWidth() <= 43; // Whether there is space for a status icon on the right side.
  // TODO: Need to move status on DAYCHANGE depending on date width.

  TIME.addEventListener(TIME.event.DAYCHANGE, () => {
    const current = getCenterX();
    if (hasWeekday && x !== (x = current.x)) {
      weekday.setProperty(hmUI.prop.X, x);
    }
    if (month_startX !== (month_startX = current.month_startX)) {
      date.setProperty(hmUI.prop.MORE, { month_startX });
    }
  });

  return true;
}
