function mkImgArray(dir, count = 10, night = false) {
  const out = [];
  for(let i = 0; i < count; i++)
    out.push(`${dir}/${i}.png`);
  if (dir === "widgets/weather" && night) {
    var temp = out[0];
    out[0] = out[26];
    out[26] = temp;
    temp = out[1];
    out[1] = out[27];
    out[27] = temp;
    temp = out[3];
    out[3] = out[28];
    out[28] = temp;
  }
  return out;
}

