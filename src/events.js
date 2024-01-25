function call(url) {
  hmApp.startApp(typeof url === "string" ? { url, native: true } : url);
}

function changeBrightness(delta) {
  hmSetting.setBrightness(Math.min(Math.max(0, hmSetting.getBrightness() + delta), 100));
}

function renderEventLayer(widgetURLs, barURLs) {
  let mustHandle = false;
  const zone = hmUI.createWidget(hmUI.widget.IMG, { _name: "events", x: 0, y: 0, w: 192, h: 490 });

  zone.addEventListener(hmUI.event.CLICK_DOWN, () => (mustHandle = true));
  zone.addEventListener(hmUI.event.MOVE, () => (mustHandle = false));

  zone.addEventListener(hmUI.event.CLICK_UP, ({ x, y }) => {
    if (!mustHandle) return;
    mustHandle = false;

    if (48 <= x && x < 144) {
      if (35 <= y && y < 113) {
        call(widgetURLs[0]);
      } else if (376 < y && y < 455) {
        call(widgetURLs[1]);
      }
    } else {
      const isLeft = x < 96;
      if (y < 130) {
        call(barURLs[isLeft ? 0 : 1]);
      } else if (y >= 360) {
        call(barURLs[isLeft ? 2 : 3]);
      } else {
        changeBrightness(isLeft ? -10 : 10);
      }
    }
  });
}
