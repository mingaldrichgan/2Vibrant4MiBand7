const HAS_DIGITS_AOD = 1;
const HAS_DIGITS_NORMAL = 2;
const HAS_POINTER_AOD = 4;
const HAS_POINTER_NORMAL = 8;

const CLOCK_TYPES = {
  analog_aod: HAS_DIGITS_NORMAL | HAS_POINTER_AOD | HAS_POINTER_NORMAL,
  analog_only: HAS_POINTER_AOD | HAS_POINTER_NORMAL,
  digital_aod: HAS_DIGITS_AOD | HAS_DIGITS_NORMAL | HAS_POINTER_NORMAL,
  digital_only: HAS_DIGITS_AOD | HAS_DIGITS_NORMAL,
};

function renderClock(isAOD, isEdit) {
  const optional_types = Object.entries(CLOCK_TYPES).map(([key, type]) => ({
    type,
    preview: `edit/clock/demo/${key}.png`,
  }));

  const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
    edit_id: 120,
    x: 0,
    y: 130,
    w: 192,
    h: 230,
    select_image: "edit/clock/select.png",
    un_select_image: "edit/clock/unselect.png",
    default_type: CLOCK_TYPES.analog_aod,
    optional_types,
    count: optional_types.length,
  });

  if (isEdit) return;

  const currentType = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  const hasDigits = isAOD ? currentType & HAS_DIGITS_AOD : currentType & HAS_DIGITS_NORMAL;
  const hasPointer = isAOD ? currentType & HAS_POINTER_AOD : currentType & HAS_POINTER_NORMAL;

  if (!isAOD) renderStatus(hasDigits, hasPointer);
  if (hasDigits) {
    renderDigits(isAOD);
  } else {
    hmUI.createWidget(hmUI.widget.IMG, { x: 36, y: 185, src: "pointer/analog_bg.png" });
  }
  if (hasPointer) renderPointer(isAOD);
  renderDate(hasDigits, hasPointer);
}

function renderDigits(isAOD) {
  const font = getImageArray(`fonts/clock/${isAOD ? "aod" : "normal"}`);

  hmUI.createWidget(hmUI.widget.IMG_TIME, {
    hour_startX: 26,
    hour_startY: 106,
    hour_zero: 1,
    hour_array: font,
    minute_startX: 26,
    minute_startY: 242,
    minute_zero: 1,
    minute_array: font,
  });
}

function renderPointer(isAOD) {
  hmUI.createWidget(hmUI.widget.TIME_POINTER, {
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
    second_centerX: isAOD ? undefined : 96,
    second_centerY: isAOD ? undefined : 245,
    second_posX: isAOD ? undefined : 6,
    second_posY: isAOD ? undefined : 98,
    second_path: isAOD ? undefined : "pointer/second.p.png",
  });
}
