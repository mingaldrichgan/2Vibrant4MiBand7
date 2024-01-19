const CLOCK_TYPES = Object.fromEntries(["digital_aod", "analog_aod", "digital_only"].map((key, i) => [key, i]));

function renderClock({ isAOD, isEdit } = {}) {
  const editor = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
    edit_id: 120,
    x: 0,
    y: 130,
    w: 192,
    h: 230,
    select_image: "edit/clock/select.png",
    un_select_image: "edit/clock/unselect.png",
    default_type: CLOCK_TYPES.digital_aod,
    optional_types: Object.entries(CLOCK_TYPES).map(([key, type]) => ({ type, preview: `edit/clock/demo/${key}.png` })),
    count: 3,
    tips_BG: "",
    tips_x: -1000,
    tips_y: 0,
    tips_width: 1,
  });

  if (isEdit) return;

  const currentType = editor.getProperty(hmUI.prop.CURRENT_TYPE);
  const hasPointer = currentType === CLOCK_TYPES.analog_aod || (currentType === CLOCK_TYPES.digital_aod && !isAOD);
  const dateWidth = _renderTimeDigital({ hasPointer, isAOD });
  if (hasPointer) _renderTimeAnalog(isAOD);
  return dateWidth;
}

function _renderTimeAnalog(isAOD) {
  // Time pointer
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
