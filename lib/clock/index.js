import { watchface } from "../events";
import { getImageArray, mapLanguage } from "../utils";
import { renderDate } from "./date";
import { renderStatus } from "./status";
import { CLOCK_TYPES, HAS_DIGITS_AOD, HAS_DIGITS_NORMAL, HAS_POINTER_AOD, HAS_POINTER_NORMAL } from "./types";

export function renderClock(isAOD, isEdit) {
  const optional_types = Object.entries(CLOCK_TYPES).map(([key, { type, ...title }]) => ({
    type,
    preview: `edit/clock/preview/${key}.png`,
    ...mapLanguage((lang) => [`title_${lang}`, title[lang]]),
  }));

  // const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
  //   _name: "clock",
  //   edit_id: 120,
  //   x: 0,
  //   y: 130,
  //   w: 192,
  //   h: 230,
  //   default_type: CLOCK_TYPES.analog_aod.type,
  //   optional_types,
  //   count: optional_types.length,
  //   ...withSelect("edit/clock"),
  //   ...withTip(20, -48),
  // });

  if (isEdit) return;

  const currentType = CLOCK_TYPES.analog_aod.type; //editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  const hasDigits = isAOD ? currentType & HAS_DIGITS_AOD : currentType & HAS_DIGITS_NORMAL;
  const hasPointer = isAOD ? currentType & HAS_POINTER_AOD : currentType & HAS_POINTER_NORMAL;

  if (!isAOD) renderStatus(hasDigits, hasPointer);

  if (hasDigits) {
    const font = getImageArray(`fonts/clock/${isAOD ? "aod" : "normal"}`);

    watchface.createWidget(hmUI.widget.IMG_TIME, {
      _name: "time.digits",
      hour_startX: 26,
      hour_startY: 128,
      hour_zero: 1,
      hour_array: font,
      minute_startX: 26,
      minute_startY: 264,
      minute_zero: 1,
      minute_array: font,
    });
  } else {
    watchface.createWidget(hmUI.widget.IMG, { x: 36, y: 185, src: "pointer/analog_bg.png" });
  }

  if (hasPointer) {
    watchface.createWidget(hmUI.widget.TIME_POINTER, {
      _name: "time.pointer",
      hour_centerX: 96,
      hour_centerY: 245,
      hour_posX: 12,
      hour_posY: 69,
      hour_path: "pointer/hour.p.png",
      minute_centerX: 96,
      minute_centerY: 245,
      minute_posX: 12,
      minute_posY: 86,
      minute_path: "pointer/minute.p.png",
      minute_cover_path: `pointer/center_${isAOD ? "aod" : "normal"}.png`,
      minute_cover_x: 84,
      minute_cover_y: 233,
      ...(isAOD || {
        second_centerX: 96,
        second_centerY: 245,
        second_posX: 6,
        second_posY: 98,
        second_path: "pointer/second.p.png",
      }),
    });
  }

  renderDate(hasDigits, hasPointer);
}
