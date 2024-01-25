function getCurrentEntry(editGroup, types) {
  const currentType = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  return Object.entries(types).find((entry) => getEditType(...entry) === currentType) ?? [];
}

function getDateWidth() {
  return ((TIME.month < 10 ? 1 : 2) + (TIME.day < 10 ? 1 : 2)) * 14 + 10;
}

function getEditType(key, { type }) {
  return type?.value ?? hmUI.edit_type[key];
}

function getImageArray(dir, length = 10) {
  return Array.from({ length }, (_, i) => `${dir}/${i}.png`);
}

function getOptionalTypes(types, toPreviewFn) {
  return [
    ...Object.entries(types).map(([key, data]) => ({
      type: getEditType(key, data),
      preview: toPreviewFn(key),
      ...mapLanguage((lang) => [`title_${lang}`, data.type?.[lang]]),
    })),
    { type: 0, title_en: "None", title_sc: "无", title_tc: "無" },
  ];
}

function mapLanguage(toEntriesFn) {
  return Object.fromEntries(["en", "sc", "tc"].map(toEntriesFn));
}

function withFont(subdir, { dotOrColon, padding, unit }) {
  const dir = `fonts/${subdir}`;
  return {
    font_array: getImageArray(dir),
    invalid_image: `${dir}/null.png`,
    ...(dotOrColon && { dot_image: `${dir}/${dotOrColon}.png` }),
    ...(padding && { padding }),
    ...(unit && mapLanguage((lang) => [`unit_${lang}`, `${dir}/${unit}.png`])),
  };
}

function withSelect(dir) {
  return { select_image: `${dir}/select.png`, un_select_image: `${dir}/unselect.png` };
}

function withTip(tips_x, tips_y) {
  return { tips_BG: "edit/tips.png", tips_x, tips_y, tips_width: 152 };
}
