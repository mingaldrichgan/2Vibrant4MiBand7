function getCurrentEntry(editGroup, editMap) {
  const currentType = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  return Object.entries(editMap).find((entry) => getEditType(...entry) === currentType) ?? [];
}

function getDateWidth() {
  return ((TIME.month < 10 ? 1 : 2) + (TIME.day < 10 ? 1 : 2)) * 14 + 10;
}

function getEditType(key, { editType, title_en }) {
  return editType ?? hmUI[`${title_en ? "data" : "edit"}_type`][key.toUpperCase()];
}

function getImageArray(dir, length = 10) {
  return Array.from({ length }, (_, i) => `${dir}/${i}.png`);
}

function getOptionalTypes(editMap, previewFn) {
  return [
    ...Object.entries(editMap).map(([key, data]) => ({
      type: getEditType(key, data),
      preview: previewFn(key),
      title_en: data.title_en,
      title_sc: data.title_sc,
      title_tc: data.title_tc,
    })),
    EDIT_NONE,
  ];
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
