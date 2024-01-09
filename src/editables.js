function renderWidgets() {
  const keys = [];
  const urls = [];
  const isEdit = hmSetting.getScreenType() == hmSetting.screen_type.SETTINGS;

  for (let i = 0; i < 2; i++) {
    const editView = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      edit_id: 110 + i,
      x: 48,
      y: i == 0 ? 36 : 376,
      w: 96,
      h: 78,
      select_image: "edit/center.png",
      un_select_image: "edit/center_w.png",
      default_type: i * 2,
      optional_types: Object.keys(EDIT_WIDGETS).map((key) => {
        const data = EDIT_WIDGETS[key];
        return {
          type: data.value,
          preview: `widgets/demo/${key}.png`,
        };
      }),
      count: Object.keys(EDIT_WIDGETS).length,
      tips_BG: "",
      tips_x: -1000,
      tips_y: 0,
      tips_width: 1,
    });

    if (isEdit) continue;

    // Fetch current
    const current = editView.getProperty(hmUI.prop.CURRENT_TYPE);

    let currentKey = "weather";
    for (let i in EDIT_WIDGETS) {
      if (EDIT_WIDGETS[i].value === current) {
        currentKey = i;
        break;
      }
    }

    const currentData = EDIT_WIDGETS[currentKey];
    _drawWidget(i, currentKey, currentData);
    keys.push(currentKey);
    urls.push(currentData.url);
  }

  return [keys, urls];
}

function _drawWidget(i, currentKey, currentData) {
  if (i == 99) return;
  if (currentData.render) {
    currentData.render(i == 0 ? 36 : 376);
    return;
  }

  // Icon
  hmUI.createWidget(hmUI.widget.IMG, {
    x: 74,
    y: i == 0 ? 36 : 376,
    src: `widgets/icon/${currentKey}.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  });
  hmUI.createWidget(hmUI.widget.TEXT_IMG, {
    x: 48,
    y: i == 0 ? 84 : 424,
    w: 96,
    h: 30,
    align_h: hmUI.align.CENTER_H,
    invalid_image: "fonts/white/null.png",
    negative_image: "fonts/white/minus.png",
    show_level: hmUI.show_level.ONLY_NORMAL,
    ...currentData.config,
  });
}

function renderBars(widgetKeys) {
  const urls = [];
  const isEdit = hmSetting.getScreenType() == hmSetting.screen_type.SETTINGS;

  for (let i = 0; i < 2; i++) {
    const optional_types = [
      ...Object.entries(EDIT_BARS).map(([key, { type }]) => ({
        type,
        preview: `bars/demo/${i}/${key}.png`,
      })),
      EDIT_VOID,
    ];

    const editView = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      edit_id: 101 + i,
      x: 0,
      y: i == 0 ? 4 : 352,
      w: 192,
      h: 136,
      select_image: `edit/${i}a.png`,
      un_select_image: `edit/${i}.png`,
      default_type: hmUI.data_type[i === 0 ? "BATTERY" : "STEP"],
      optional_types,
      count: optional_types.length,
      tips_BG: "",
      tips_x: -1000,
      tips_y: 0,
      tips_width: 1,
    });

    if (isEdit) continue;

    // Fetch current
    const currentType = editView.getProperty(hmUI.prop.CURRENT_TYPE);
    const [currentKey, currentData] = Object.entries(EDIT_BARS).find(
      ([, { type }]) => type === currentType
    );

    _drawBar(i, currentKey, currentData, widgetKeys);
    urls.push(currentData.url);
  }

  return urls;
}

function _drawBar(i, currentKey, currentData, widgetKeys) {
  if (i == 99) return;

  const arcProps = {
    center_x: 96,
    center_y: i == 0 ? 100 : 392,
    radius: 82,
    start_angle: i == 0 ? -90 : 90,
    end_angle: i == 0 ? 90 : 270,
    line_width: 20,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };

  const color = COLORS[currentData.color];

  // Draw BG
  hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
    ...arcProps,
    color: [color % 256, (color >> 8) % 256, color >> 16] // [B, G, R]
      .map((value) => Math.round(value * 0.3)) // lower opacity
      .reduce((sum, value, index) => sum + (value << (8 * index))),
    level: 100,
  });

  // Draw FG
  hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
    ...arcProps,
    color,
    type: currentData.progressType ?? currentData.type,
  });

  if (currentKey === widgetKeys[i]) return;

  // Draw ICON
  hmUI.createWidget(hmUI.widget.IMG, {
    x: i == 0 ? 3 : 167,
    y: i == 0 ? 104 : 368,
    src: `bars/icon/${currentKey}.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  });

  // Draw TEXT
  hmUI.createWidget(hmUI.widget.TEXT_IMG, {
    x: i == 0 ? 96 : 4,
    y: i == 0 ? 102 : 370,
    w: 92,
    ...withFont(`sm_${currentData.color}`, currentData),
    align_h: i == 0 ? hmUI.align.RIGHT : hmUI.align.LEFT,
    type: currentData.type,
    show_level: hmUI.show_level.ONLY_NORMAL,
  });
}
