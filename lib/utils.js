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

function withFont(fontSubdir, { dotOrColon, unit }) {
  const fontDir = `fonts/${fontSubdir}`;
  const out = { font_array: mkImgArray(fontDir) };

  if (dotOrColon) {
    out.dot_image = `${fontDir}/${dotOrColon}.png`;
  }

  if (unit) {
    const unitImage = `${fontDir}/${unit}.png`;
    out.unit_en = unitImage;
    out.unit_sc = unitImage;
    out.unit_tc = unitImage;
  }
  return out;
}

function withType(object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, data]) => [
      key,
      { type: hmUI.data_type[key.toUpperCase()], ...data },
    ])
  );
}
