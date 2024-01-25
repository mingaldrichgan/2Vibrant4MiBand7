export const HAS_DIGITS_AOD = 1;
export const HAS_DIGITS_NORMAL = 2;
export const HAS_POINTER_AOD = 4;
export const HAS_POINTER_NORMAL = 8;

export const CLOCK_TYPES = {
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
