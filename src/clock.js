const HAS_DIGITS_AOD = 1;
const HAS_DIGITS_NORMAL = 2;
const HAS_POINTER_AOD = 4;
const HAS_POINTER_NORMAL = 8;

const CLOCK_TYPES = {
  analog_aod: {
    type: HAS_DIGITS_NORMAL | HAS_POINTER_AOD | HAS_POINTER_NORMAL,
    en: "Analog AOD",
    sc: "指针息屏界面",
    tc: "指針息屏界面",
  },
  analog_only: {
    type: HAS_POINTER_AOD | HAS_POINTER_NORMAL,
    en: "Analog Only",
    sc: "只有指针",
    tc: "只有指針",
  },
  digital_aod: {
    type: HAS_DIGITS_AOD | HAS_DIGITS_NORMAL | HAS_POINTER_NORMAL,
    en: "Digital AOD",
    sc: "数字息屏界面",
    tc: "數字息屏界面",
  },
  digital_only: {
    type: HAS_DIGITS_AOD | HAS_DIGITS_NORMAL,
    en: "Digital Only",
    sc: "只有数字",
    tc: "只有數字",
  },
};

function renderClock(isAOD, isEdit) {
  const optional_types = Object.entries(CLOCK_TYPES).map(([key, { type, ...title }]) => ({
    type,
    preview: `edit/clock/preview/${key}.png`,
    ...mapLanguage((lang) => [`title_${lang}`, title[lang]]),
  }));

  const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
    _name: "clock",
    edit_id: 120,
    x: 0,
    y: 130,
    w: 192,
    h: 230,
    default_type: CLOCK_TYPES.analog_aod.type,
    optional_types,
    count: optional_types.length,
    ...withSelect("edit/clock"),
    ...withTip(20, -48),
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
    _name: "time.digits",
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
    second_centerX: isAOD ? undefined : 96,
    second_centerY: isAOD ? undefined : 245,
    second_posX: isAOD ? undefined : 6,
    second_posY: isAOD ? undefined : 98,
    second_path: isAOD ? undefined : "pointer/second.p.png",
  });
}
