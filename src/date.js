const osLang = DeviceRuntimeCore.HmUtils.getLanguage();
const hasWeekday = osLang.startsWith("en") || osLang.startsWith("zh");

function renderDate(hasPointer) {
  const font = getImageArray("fonts/date");

  function getCenterX() {
    const weekdayWidth = hasWeekday ? 52 : 0;
    const x = Math.round((192 - getDateWidth() - weekdayWidth) / 2);
    return { x, month_startX: x + weekdayWidth };
  }

  let { x, month_startX } = hasPointer ? { x: 32, month_startX: 114 } : getCenterX();
  const date = hmUI.createWidget(hmUI.widget.IMG_DATE, {
    month_startX,
    month_startY: 230,
    month_en_array: font,
    month_sc_array: font,
    month_tc_array: font,
    month_unit_en: "fonts/date/slash.png",
    month_unit_sc: "fonts/date/slash.png",
    month_unit_tc: "fonts/date/slash.png",
    month_zero: 0,
    day_follow: 1,
    day_en_array: font,
    day_sc_array: font,
    day_tc_array: font,
    day_zero: 0,
  });

  const weekday =
    hasWeekday &&
    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x,
      y: 230,
      week_en: getImageArray("weekday/en", 7),
      week_sc: getImageArray("weekday/sc", 7),
      week_tc: getImageArray("weekday/tc", 7),
    });

  if (hasPointer) return;

  TIME.addEventListener(TIME.event.DAYCHANGE, () => {
    const current = getCenterX();
    if (hasWeekday && x !== (x = current.x)) {
      weekday.setProperty(hmUI.prop.X, x);
    }
    if (month_startX !== (month_startX = current.month_startX)) {
      date.setProperty(hmUI.prop.MORE, { month_startX });
    }
  });
}
