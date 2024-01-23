function getCurrentEntry(editGroup, object) {
  const currentType = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  return Object.entries(object).find((entry) => getEditType(...entry) === currentType) ?? [];
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

function getOptionalTypes(object, toPreview) {
  return [
    ...Object.entries({ NONE, ...object }).map(([key, data]) => ({
      type: getEditType(key, data),
      preview: data.preview ?? toPreview(key),
      ...mapLanguage((lang) => [`title_${lang}`, data.type?.[lang]]),
    })),
  ];
}

function mapLanguage(toEntries) {
  return Object.fromEntries(["en", "sc", "tc"].map(toEntries));
}

function withFont(fontSubdir, { dotOrColon, padding, unit }) {
  const fontDir = `fonts/${fontSubdir}`;
  const unitImage = unit ? `${fontDir}/${unit}.png` : undefined;
  return {
    font_array: getImageArray(fontDir),
    dot_image: dotOrColon ? `${fontDir}/${dotOrColon}.png` : undefined,
    invalid_image: `${fontDir}/null.png`,
    padding,
    unit_en: unitImage,
    unit_sc: unitImage,
    unit_tc: unitImage,
  };
}
