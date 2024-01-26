import { getColor } from "../colors";
import { getCurrentEntry, getEditType, getOptionalTypes, withFont, withSelect, withTip } from "../utils";
import { WIDGET_TYPES } from "./types";

export function renderWidgets(isEdit) {
  const widgetKeys = [];
  const widgetUrls = [];
  const optional_types = getOptionalTypes(WIDGET_TYPES, (key) => `edit/widgets/preview/${key}.png`);

  for (let i = 0; i < 2; i++) {
    const defaultKey = i === 0 ? "WEATHER_CURRENT" : "HEART";

    const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      _name: `widgets[${i}]`,
      edit_id: 110 + i,
      x: 48,
      y: i === 0 ? 44 : 368,
      w: 96,
      h: 78,
      select_image: "edit/widgets/select.png",
      un_select_image: "edit/widgets/unselect.png",
      default_type: getEditType(defaultKey, WIDGET_TYPES[defaultKey]),
      optional_types,
      count: optional_types.length,
      ...withSelect("edit/widgets"),
      ...withTip(-28, i === 0 ? 92 : -50),
    });

    if (isEdit) continue;

    const [currentKey, currentData] = getCurrentEntry(editGroup, WIDGET_TYPES);
    renderWidget(i, currentKey, currentData);
    widgetKeys.push(currentKey);
    widgetUrls.push(currentData?.url);
  }

  return { widgetKeys, widgetUrls };
}

function renderWidget(i, currentKey, currentData) {
  if (!currentData) return;

  (
    currentData.renderIcon ??
    ((props) => hmUI.createWidget(hmUI.widget.IMG, { ...props, src: `icons/widgets/${currentKey}.png` }))
  )({ _name: `widgets[${i}].icon`, x: 74, y: i === 0 ? 35 : 377 });

  const { color } = getColor(currentData);
  const { getText } = currentData;

  const text = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
    _name: `widgets[${i}].text`,
    x: 48,
    y: i === 0 ? 83 : 425,
    w: 96,
    h: 30,
    align_h: hmUI.align.CENTER_H,
    ...currentData.textProps,
    ...withFont(`widgets/${color ?? currentKey}`, currentData),
    ...(getText ? { text: getText.fn() } : { type: hmUI.data_type[currentKey] }),
  });

  if (getText) {
    timer.createTimer(getText.ms, getText.ms, () => text.setProperty(hmUI.prop.TEXT, String(getText.fn())));
  }
}
