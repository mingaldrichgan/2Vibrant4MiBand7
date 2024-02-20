export function getCurrentEntry(editGroup, types) {
  const currentType = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  return Object.entries(types).find((entry) => getEditType(...entry) === currentType) ?? [];
}

export function getEditType(key, { type }) {
  return type?.value ?? hmUI.edit_type[key];
}

export function getImageArray(dir, length = 10) {
  return Array.from({ length }, (_, i) => `${dir}/${i}.png`);
}

export function getOptionalTypes(types, toPreview) {
  return [
    ...Object.entries(types).map(([key, data]) => ({
      type: getEditType(key, data),
      preview: toPreview(key),
      ...mapLanguage((lang) => [`title_${lang}`, data.type?.[lang]]),
    })),
    { type: 0, title_en: "None", title_sc: "无", title_tc: "無" },
  ];
}

export function mapLanguage(toEntries) {
  return Object.fromEntries(["en", "sc", "tc"].map(toEntries));
}

export function withFont(subdir, { symbols: { invalid, minus, dot, unit } = {} }) {
  const dir = `fonts/${subdir}`;
  return {
    font_array: getImageArray(dir),
    invalid_image: `${dir}/${invalid ?? "null"}.png`,
    ...(minus && { negative_image: `${dir}/${typeof minus === "string" ? minus : "minus"}.png` }),
    ...(dot && { dot_image: `${dir}/${typeof dot === "string" ? dot : "dot"}.png` }),
    ...(unit && mapLanguage((lang) => [`unit_${lang}`, `${dir}/${unit}.png`])),
  };
}

export function withSelect(dir) {
  return { select_image: `${dir}/select.png`, un_select_image: `${dir}/unselect.png` };
}

export function withTip(tips_x, tips_y) {
  return { tips_BG: "edit/tips.png", tips_x, tips_y, tips_width: 152 };
}
