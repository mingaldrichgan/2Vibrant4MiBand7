import { getColor } from "../colors";
import { getCurrentEntry, getEditType, getOptionalTypes, withFont, withSelect, withTip } from "../utils";
import { BAR_TYPES } from "./types";

export function renderBars(widgetKeys) {
  const barKeys = [];
  const barUrls = [];

  for (let i = 0; i < 4; i++) {
    const optional_types = getOptionalTypes(BAR_TYPES, (key) => `edit/bars/${i}/preview/${key}.png`);
    const defaultKey = ["STEP", "CAL", "BATTERY", "BATTERY"][i];

    const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      _name: `bars[${i}]`,
      edit_id: 101 + i,
      x: i % 2 === 0 ? 0 : 96,
      y: i < 2 ? 0 : 354,
      w: 96,
      h: 136,
      default_type: getEditType(defaultKey, BAR_TYPES[defaultKey]),
      optional_types,
      count: optional_types.length,
      ...withSelect(`edit/bars/${i}`),
      ...withTip(i % 2 === 0 ? 12 : -68, i < 2 ? 136 : -36),
    });

    if (!widgetKeys) continue;

    const [currentKey, currentData] = getCurrentEntry(editGroup, BAR_TYPES);
    barKeys.push(currentKey);
    barUrls.push(currentData?.url);
  }

  if (widgetKeys) {
    for (let w = 0; w < 2; w++) {
      // 0: top, 1: bottom
      const i = w * 2; // left
      const j = i + 1; // right
      const isMerged = barKeys[i] === barKeys[j];
      renderBar(isMerged ? w : i, isMerged, barKeys[i], BAR_TYPES[barKeys[i]], widgetKeys[w]);
      if (!isMerged) {
        renderBar(j, false, barKeys[j], BAR_TYPES[barKeys[j]], widgetKeys[w]);
      }
    }
  }

  return barUrls;
}

function renderBar(i, isMerged, currentKey, currentData, adjacentWidgetKey) {
  if (!currentData) return;

  const arcProps = {
    center_x: 96,
    center_y: (isMerged ? [96, 394] : [96, 96, 394, 394])[i],
    radius: 82,
    start_angle: (isMerged ? [-90, 90] : [-90, 90, -90, 90])[i],
    end_angle: (isMerged ? [90, 270] : [-11, 11, -169, 169])[i],
    line_width: 20,
  };

  const { color, fg, bg } = getColor(currentData);
  const { getProgress, getText } = currentData;

  hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { _name: `bars[${i}].arc.bg`, ...arcProps, color: bg, level: 100 });

  const arc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
    _name: `bars[${i}].arc.fg`,
    ...arcProps,
    color: fg,
    ...(getProgress ? { level: getProgress.fn() } : { type: hmUI.data_type[currentData.progressKey ?? currentKey] }),
  });

  if (getProgress) {
    timer.createTimer(getProgress.ms, getProgress.ms, () => arc.setProperty(hmUI.prop.LEVEL, getProgress.fn()));
  }

  if (currentKey === adjacentWidgetKey) return;

  hmUI.createWidget(hmUI.widget.IMG, {
    _name: `bars[${i}].icon`,
    x: (isMerged ? [3, 167] : [27, 143, 27, 143])[i],
    y: (isMerged ? [99, 369] : [74, 74, 394, 394])[i],
    src: `icons/bars/${currentKey}.png`,
  });

  const x = (isMerged ? [96, 4] : [4, 96, 4, 96])[i];
  const text = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
    _name: `bars[${i}].text`,
    x,
    y: (isMerged ? [100, 372] : [100, 100, 372, 372])[i],
    w: 92,
    align_h: x < 96 ? hmUI.align.LEFT : hmUI.align.RIGHT,
    ...withFont(`bars/${color ?? currentKey}`, currentData),
    ...(getText ? { text: getText.fn() } : { type: hmUI.data_type[currentKey] }),
  });

  if (getText) {
    timer.createTimer(getText.ms, getText.ms, () => text.setProperty(hmUI.prop.TEXT, String(getText.fn())));
  }
}
