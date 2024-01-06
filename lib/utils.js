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
