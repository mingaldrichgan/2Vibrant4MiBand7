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

function getOptionalTypes(types, toPreview) {
  return [
    ...Object.entries({ NONE, ...types }).map(([key, data]) => ({
      type: getEditType(key, data),
      preview: data.preview ?? toPreview(key),
      ...mapLanguage((lang) => [`title_${lang}`, data.type?.[lang]]),
    })),
  ];
}

function mapLanguage(toEntries) {
  return Object.fromEntries(["en", "sc", "tc"].map(toEntries));
}

function withFont(subdir, { dotOrColon, padding, unit }) {
  const dir = `fonts/${subdir}`;
  const unitImage = unit ? `${dir}/${unit}.png` : undefined;
  return {
    font_array: getImageArray(dir),
    dot_image: dotOrColon ? `${dir}/${dotOrColon}.png` : undefined,
    invalid_image: `${dir}/null.png`,
    padding,
    ...mapLanguage((lang) => [`unit_${lang}`, unitImage]),
  };
}

function withSelect(dir) {
  return { select_image: `${dir}/select.png`, un_select_image: `${dir}/unselect.png` };
}

function withTip(tips_x, tips_y) {
  return { tips_BG: "edit/tips.png", tips_x, tips_y, tips_width: 152 };
}
