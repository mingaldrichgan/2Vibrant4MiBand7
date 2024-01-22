let __$$app$$__ = __$$hmAppManager$$__.currentApp;
let __$$module$$__ = __$$app$$__.current;
__$$module$$__.module = DeviceRuntimeCore.WatchFace({
  onInit() {
    const currentScreen = hmSetting.getScreenType();
    const isAOD = currentScreen === hmSetting.screen_type.AOD;
    const isEdit = currentScreen === hmSetting.screen_type.SETTINGS;

    const [widgetKeys, widgetUrls] = isAOD ? [] : renderWidgets(isEdit);
    const barUrls = renderBars(!isAOD && !isEdit && widgetKeys);
    renderClock(isAOD, isEdit);
    initTapZones(widgetUrls, barUrls);
  },
});
