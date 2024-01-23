function renderWidgets(isEdit) {
  const keys = [];
  const urls = [];
  const optional_types = getOptionalTypes(WIDGETS, (key) => `edit/widgets/preview/${key}.png`);

  for (let i = 0; i < 2; i++) {
    const defaultKey = i === 0 ? "WEATHER_CURRENT" : "HEART";

    const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      edit_id: 110 + i,
      x: 48,
      y: i === 0 ? 44 : 368,
      w: 96,
      h: 78,
      select_image: "edit/widgets/select.png",
      un_select_image: "edit/widgets/unselect.png",
      default_type: getEditType(defaultKey, WIDGETS[defaultKey]),
      optional_types,
      count: optional_types.length,
      tips_BG: "edit/tips.png",
      tips_x: -14,
      tips_y: i === 0 ? 82 : -40,
      tips_width: 124,
    });

    if (isEdit) continue;

    const [currentKey, currentData] = getCurrentEntry(editGroup, WIDGETS);
    renderWidget(i, currentKey, currentData);
    keys.push(currentKey);
    urls.push(currentData?.url);
  }

  return [keys, urls];
}

function renderWidget(i, currentKey, currentData) {
  if (!currentData) return;

  (
    currentData.renderIcon ??
    ((props) => hmUI.createWidget(hmUI.widget.IMG, { ...props, src: `icons/widgets/${currentKey}.png` }))
  )({ x: 74, y: i === 0 ? 36 : 376 });

  (
    currentData.renderText ??
    ((props) => hmUI.createWidget(hmUI.widget.TEXT_IMG, { ...props, type: hmUI.data_type[currentKey] }))
  )({
    x: 48,
    y: i === 0 ? 84 : 424,
    w: 96,
    h: 30,
    align_h: hmUI.align.CENTER_H,
    ...withFont(`widgets/${currentData.color?.font ?? currentKey}`, currentData),
  });
}
