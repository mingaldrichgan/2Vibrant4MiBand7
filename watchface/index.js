import { renderBars } from "./render/bars";
import { renderClock } from "./render/clock";
import { renderEventLayer } from "./render/events";
import { renderWidgets } from "./render/widgets";

__$$hmAppManager$$__.currentApp.current.module = DeviceRuntimeCore.WatchFace({
  onInit() {
    const currentScreen = hmSetting.getScreenType();
    const isAOD = currentScreen === hmSetting.screen_type.AOD;
    const isEdit = currentScreen === hmSetting.screen_type.SETTINGS;

    renderClock(isAOD, isEdit);
    const { widgetKeys, widgetUrls } = isAOD || renderWidgets(isEdit);
    const barUrls = isAOD || renderBars(widgetKeys);

    if (!isAOD && !isEdit) renderEventLayer(widgetUrls, barUrls);
  },
});
