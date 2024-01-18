function getCurrent(editView, editMap) {
  const currentType = editView.getProperty(hmUI.prop.CURRENT_TYPE);
  return Object.entries(editMap).find((entry) => getEditType(...entry) === currentType) ?? [];
}

function getEditType(key, { editType, title_en }) {
  return editType ?? hmUI[`${title_en ? "data" : "edit"}_type`][key.toUpperCase()];
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
    EDIT_NULL,
  ];
}

function mkImgArray(dir, count = 10, night = false) {
  const out = [];
  for (let i = 0; i < count; i++) out.push(`${dir}/${i}.png`);
  if (dir === "widgets/weather" && night) {
    out[0] = out[26];
    out[1] = out[27];
    out[3] = out[28];
  }
  return out;
}

function withFont(fontSubdir, { dotOrColon, padding, unit }) {
  const fontDir = `fonts/${fontSubdir}`;
  const unitImage = unit ? `${fontDir}/${unit}.png` : undefined;
  return {
    font_array: mkImgArray(fontDir),
    dot_image: dotOrColon ? `${fontDir}/${dotOrColon}.png` : undefined,
    invalid_image: `${fontDir}/null.png`,
    padding,
    unit_en: unitImage,
    unit_sc: unitImage,
    unit_tc: unitImage,
  };
}
