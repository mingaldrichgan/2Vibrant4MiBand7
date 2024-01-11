function _call(url) {
  switch (typeof url) {
    case "function":
      return url();
    case "string":
      return hmApp.startApp({ url, native: true });
  }
}

function _changeBrightness(delta) {
  const val = Math.min(Math.max(0, hmSetting.getBrightness() + delta), 100);
  hmSetting.setBrightness(val);
}

function initTapZones(widgetURLs, barURLs) {
  let mustHandle = false;

  const zone = hmUI.createWidget(hmUI.widget.IMG, {
    x: 0,
    y: 0,
    w: 192,
    h: 490,
    src: "",
  });

  zone.addEventListener(hmUI.event.CLICK_DOWN, () => (mustHandle = true));
  zone.addEventListener(hmUI.event.MOVE, () => (mustHandle = false));
  zone.addEventListener(hmUI.event.CLICK_UP, ({ x, y }) => {
    if (!mustHandle) return;
    mustHandle = false;

    if (48 < x && x < 120) {
      if (36 < y && y < 114) {
        return _call(widgetURLs[0]);
      } else if (376 < y && y < 454) {
        return _call(widgetURLs[1]);
      }
    }

    const isLeft = x < 96;
    if (y < 160) {
      return _call(barURLs[isLeft ? 0 : 1]); // top
    } else if (y > 330) {
      return _call(barURLs[isLeft ? 2 : 3]); // bottom
    } else {
      _changeBrightness(isLeft ? -5 : 5); // center
    }
  });
}
