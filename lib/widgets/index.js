import { getColor } from "../colors";
import { watchface } from "../events";
import { addTimer } from "../timer";
import { getCurrentEntry, getEditType, getOptionalTypes, withFont, withSelect, withTip } from "../utils";
import { WIDGET_TYPES } from "./types";

export function renderWidgets(isEdit) {
  const widgetKeys = [];
  const widgetURLs = [];
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
    widgetURLs.push(currentData?.url);
  }

  return { widgetKeys, widgetURLs };
}

function renderWidget(i, currentKey, currentData) {
  if (!currentData) return;

  (
    currentData.renderIcon ??
    ((props) => watchface.createWidget(hmUI.widget.IMG, { ...props, src: `icons/widgets/${currentKey}.png` }))
  )({ _name: `widgets[${i}].${currentKey}.icon`, x: 74, y: i === 0 ? 35 : 377 });

  const { color } = getColor(currentData);
  const { getText } = currentData;

  let text = getText?.();
  const textUI = watchface.createWidget(hmUI.widget.TEXT_IMG, {
    _name: `widgets[${i}].${currentKey}.text`,
    x: 48,
    y: i === 0 ? 83 : 425,
    w: 96,
    h: 30,
    align_h: hmUI.align.CENTER_H,
    ...currentData.textProps,
    ...withFont(`widgets/${color ?? currentKey}`, currentData),
    ...(getText ? { text } : { type: hmUI.data_type[currentKey] }),
  });

  if (getText) {
    addTimer(() => {
      if (text !== (text = getText())) {
        textUI.setProperty(hmUI.prop.TEXT, text?.toString());
      }
    });
  }
}
