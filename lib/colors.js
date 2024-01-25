const COLORS = {
  purple: { fg: 0x7b53ff, bg: 0x25194c },
  red: { fg: 0xff0038, bg: 0x4c0011 },
  yellow: { fg: 0xffd801, bg: 0x4c4100 },
  white: { fg: 0xdfdfdf, bg: 0x424242 },
};

function getColor({ color = "white" }) {
  return typeof color === "string" ? { ...COLORS[color], color } : color;
}
