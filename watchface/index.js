import { renderBars } from "../lib/bars";
import { renderClock } from "../lib/clock";
import { addEventListeners } from "../lib/events";
import { renderWidgets } from "../lib/widgets";

__$$hmAppManager$$__.currentApp.current.module = DeviceRuntimeCore.WatchFace({
  onInit() {
    const currentScreen = hmSetting.getScreenType();
    const isAOD = currentScreen === hmSetting.screen_type.AOD;
    const isEdit = currentScreen === hmSetting.screen_type.SETTINGS;

    renderClock(isAOD, isEdit);
    const { widgetKeys, widgetURLs } = isAOD || renderWidgets(isEdit);
    const barUrls = isAOD || renderBars(widgetKeys);

    if (isAOD || isEdit) return;
    addEventListeners(widgetURLs, barUrls);
  },
});
