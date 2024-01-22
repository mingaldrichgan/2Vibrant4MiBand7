const osLang = DeviceRuntimeCore.HmUtils.getLanguage();
const hasWeekday = osLang.startsWith("en") || osLang.startsWith("zh");

function renderDate(hasDigits, hasPointer) {
  function getDatePosition() {
    if (hasDigits && hasPointer) return { x: 32, y: 230, month_startX: 114, month_startY: 230 };

    const weekdayWidth = hasWeekday ? 52 : 0;
    if (hasPointer) {
      return {
        x: Math.round((192 - weekdayWidth) / 2),
        y: 145,
        month_startX: Math.round((192 - getDateWidth()) / 2),
        month_startY: 315,
      };
    }

    const x = Math.round((192 - getDateWidth() - weekdayWidth) / 2);
    return { x, y: 230, month_startX: x + weekdayWidth, month_startY: 230 };
  }

  let { x, y, month_startX, month_startY } = getDatePosition();
  const font = getImageArray("fonts/date");

  const weekday =
    hasWeekday &&
    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x,
      y,
      week_en: getImageArray("weekday/en", 7),
      week_sc: getImageArray("weekday/sc", 7),
      week_tc: getImageArray("weekday/tc", 7),
    });

  const date = hmUI.createWidget(hmUI.widget.IMG_DATE, {
    month_startX,
    month_startY,
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

  if (hasDigits && hasPointer) return;

  TIME.addEventListener(TIME.event.DAYCHANGE, () => {
    let { x, y, month_startX, month_startY } = getDatePosition();
    weekday?.setProperty(hmUI.prop.MORE, { x, y });
    date.setProperty(hmUI.prop.MORE, { month_startX, month_startY });
  });
}
