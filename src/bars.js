function renderBars(widgetKeys) {
  const keys = [];
  const urls = [];

  for (let i = 0; i < 4; i++) {
    const optional_types = getOptionalTypes(EDIT_BARS, (key) => `bars/demo/${i}/${key}.png`);
    const defaultKey = ["step", "cal", "battery", "battery"][i];

    const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      edit_id: 101 + i,
      x: i % 2 === 0 ? 0 : 96,
      y: i < 2 ? 0 : 354,
      w: 96,
      h: 136,
      select_image: `edit/${i}a.png`,
      un_select_image: `edit/${i}.png`,
      default_type: getEditType(defaultKey, EDIT_BARS[defaultKey]),
      optional_types,
      count: optional_types.length,
      tips_BG: "edit/tips.png",
      tips_x: i % 2 === 0 ? 27 : -69,
      tips_y: i < 2 ? 116 : -10,
      tips_width: 102,
    });

    if (!widgetKeys) continue; // No widgetKeys in edit mode.

    const [currentKey, currentData] = getCurrentEntry(editGroup, EDIT_BARS);
    keys.push(currentKey);
    urls.push(currentData?.url);
  }

  if (widgetKeys) {
    for (let w = 0; w < 2; w++) {
      // 0: top, 1: bottom
      const i = w * 2; // left
      const j = i + 1; // right
      const isMerged = keys[i] === keys[j];
      renderBar(isMerged ? w : i, isMerged, keys[i], EDIT_BARS[keys[i]], widgetKeys[w]);
      if (!isMerged) {
        renderBar(j, false, keys[j], EDIT_BARS[keys[j]], widgetKeys[w]);
      }
    }
  }

  return urls;
}

function renderBar(i, isMerged, currentKey, currentData, adjacentWidgetKey) {
  if (!currentData) return;

  const arcProps = {
    center_x: 96,
    center_y: (isMerged ? [96, 394] : [96, 96, 394, 394])[i],
    radius: 82,
    start_angle: (isMerged ? [-90, 90] : [-90, 90, -90, 90])[i],
    end_angle: (isMerged ? [90, 270] : [-12, 12, -168, 168])[i],
    line_width: 20,
  };

  const [fgColor, bgColor] = COLORS[currentData.color];

  // Draw BG
  hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { ...arcProps, color: bgColor, level: 100 });

  // Draw FG
  (
    currentData.renderArc ??
    ((props) =>
      hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { ...props, type: hmUI.data_type[currentKey.toUpperCase()] }))
  )({ ...arcProps, color: fgColor });

  if (currentKey === adjacentWidgetKey) return;

  // Draw ICON
  hmUI.createWidget(hmUI.widget.IMG, {
    x: (isMerged ? [3, 167] : [27, 143, 27, 143])[i],
    y: (isMerged ? [99, 369] : [74, 74, 394, 394])[i],
    src: `bars/icon/${currentKey}.png`,
  });

  // Draw TEXT
  const x = (isMerged ? [96, 4] : [4, 96, 4, 96])[i];
  (
    currentData.renderText ??
    ((props) => hmUI.createWidget(hmUI.widget.TEXT_IMG, { ...props, type: hmUI.data_type[currentKey.toUpperCase()] }))
  )({
    x,
    y: (isMerged ? [100, 372] : [100, 100, 372, 372])[i],
    w: 92,
    align_h: x < 96 ? hmUI.align.LEFT : hmUI.align.RIGHT,
    ...withFont(`bars/${currentData.color}`, currentData),
  });
}
