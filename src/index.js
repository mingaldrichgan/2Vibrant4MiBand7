let __$$app$$__ = __$$hmAppManager$$__.currentApp;
let __$$module$$__ = __$$app$$__.current;
__$$module$$__.module = DeviceRuntimeCore.WatchFace({
  onInit() {
    const currentScreen = hmSetting.getScreenType();
    switch (currentScreen) {
      case hmSetting.screen_type.AOD:
        return renderClock({ isAOD: true });

      case hmSetting.screen_type.SETTINGS: {
        const isEdit = true;
        renderWidgets({ isEdit });
        renderBars();
        return renderClock({ isEdit });
      }

      default:
        const [widgetKeys, widgetUrls] = renderWidgets();
        const barUrls = renderBars(widgetKeys);
        const { hasPointer, hasSpaceOnRightSide } = renderClock();
        renderStatus(hasSpaceOnRightSide); // TODO: Status should be behind clock!
        renderDate(hasPointer);
        initTapZones(widgetUrls, barUrls);
    }
  },
});
