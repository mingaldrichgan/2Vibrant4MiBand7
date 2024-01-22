const STATUS_ON_LEFT = {
  bluetooth: { x: 3, y: 216 },
  dnd: { x: 3, y: 248 },
};

const STATUS_ON_BOTH_SIDES = {
  bluetooth: { x: 3, y: 232 },
  dnd: { x: 163, y: 232 },
};

function getStatusPosition(hasPointer) {
  return hasPointer && getDateWidth() > 43 ? STATUS_ON_LEFT : STATUS_ON_BOTH_SIDES;
}

function renderStatus(hasPointer) {
  let currentPosition = getStatusPosition(hasPointer);
  const bluetooth = [
    hmUI.createWidget(hmUI.widget.IMG, {
      ...currentPosition.bluetooth,
      src: "status/bluetooth_on.png",
    }),
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      ...currentPosition.bluetooth,
      src: "status/bluetooth_off.png",
      type: hmUI.system_status.DISCONNECT,
    }),
  ];

  const dnd = [
    hmUI.createWidget(hmUI.widget.IMG, {
      ...currentPosition.dnd,
      src: "status/dnd_off.png",
    }),
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      ...currentPosition.dnd,
      src: "status/dnd_on.png",
      type: hmUI.system_status.DISTURB,
    }),
  ];

  if (!hasPointer) return;

  TIME.addEventListener(TIME.event.DAYCHANGE, () => {
    if (currentPosition !== (currentPosition = getStatusPosition(hasPointer))) {
      for (let widget of bluetooth) widget.setProperty(hmUI.prop.MORE, currentPosition.bluetooth);
      for (let widget of dnd) widget.setProperty(hmUI.prop.MORE, currentPosition.dnd);
    }
  });
}
