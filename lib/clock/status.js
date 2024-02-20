import { getDateWidth, TIME } from "../sensors";

const STATUS_SIZE = { w: 26, h: 26 };

const STATUS_ON_LEFT = {
  bluetooth: { x: 0, y: 216 },
  dnd: { x: 0, y: 248 },
};

const STATUS_ON_BOTH_SIDES = {
  bluetooth: { x: 0, y: 232 },
  dnd: { x: 166, y: 232 },
};

export function renderStatus(hasDigits, hasPointer) {
  let currentPosition = getStatusPosition();

  const bluetooth = hmUI.createWidget(hmUI.widget.GROUP, {
    _name: "status.bluetooth",
    ...currentPosition.bluetooth,
    ...STATUS_SIZE,
  });
  bluetooth.createWidget(hmUI.widget.IMG, {
    _name: "status.bluetooth.on",
    src: "status/bluetooth_on.png",
  });
  bluetooth.createWidget(hmUI.widget.IMG_STATUS, {
    _name: "status.bluetooth.off",
    src: "status/bluetooth_off.png",
    type: hmUI.system_status.DISCONNECT,
  });

  const dnd = hmUI.createWidget(hmUI.widget.GROUP, {
    _name: "status.dnd",
    ...currentPosition.dnd,
    ...STATUS_SIZE,
  });
  dnd.createWidget(hmUI.widget.IMG, {
    _name: "status.dnd.off",
    src: "status/dnd_off.png",
  });
  dnd.createWidget(hmUI.widget.IMG_STATUS, {
    _name: "status.dnd.on",
    src: "status/dnd_on.png",
    type: hmUI.system_status.DISTURB,
  });

  if (!hasDigits || !hasPointer) return;

  TIME.addEventListener(TIME.event.DAYCHANGE, () => {
    if (currentPosition !== (currentPosition = getStatusPosition())) {
      bluetooth.setProperty(hmUI.prop.MORE, currentPosition.bluetooth);
      dnd.setProperty(hmUI.prop.MORE, currentPosition.dnd);
      // for (let widget of bluetooth) {
      //   widget.setProperty(hmUI.prop.MORE, currentPosition.bluetooth);
      // }
      // for (let widget of dnd) {
      //   widget.setProperty(hmUI.prop.MORE, currentPosition.dnd);
      // }
    }
  });

  function getStatusPosition() {
    return hasDigits && hasPointer && getDateWidth() > 46 ? STATUS_ON_LEFT : STATUS_ON_BOTH_SIDES;
  }
}
