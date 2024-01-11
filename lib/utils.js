function getCurrent(editView, editMap) {
  const currentType = editView.getProperty(hmUI.prop.CURRENT_TYPE);
  return Object.entries(editMap).find((entry) => getEditType(...entry) === currentType) ?? [];
}

function getEditType(key, { title_en }) {
  return hmUI[`${title_en ? "data" : "edit"}_type`][key.toUpperCase()];
}

function getOptionalTypes(editMap, previewFn) {
  return [
    ...Object.entries(editMap).map(([key, { title_en, title_sc, title_tc }]) => ({
      type: getEditType(key, { title_en }),
      preview: previewFn(key),
      title_en,
      title_sc,
      title_tc,
    })),
    { type: 99, preview: "", title_en: "––", title_sc: "––", title_tc: "––" },
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
  const out = { font_array: mkImgArray(fontDir) };
  if (dotOrColon) out.dot_image = `${fontDir}/${dotOrColon}.png`;
  if (padding) out.padding = padding;
  if (unit) {
    const unitImage = `${fontDir}/${unit}.png`;
    out.unit_en = unitImage;
    out.unit_sc = unitImage;
    out.unit_tc = unitImage;
  }
  return out;
}
