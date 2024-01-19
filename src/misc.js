function renderStatus(hasSpaceOnRightSide) {
  let x = 3;
  let y = hasSpaceOnRightSide ? 232 : 216;
  hmUI.createWidget(hmUI.widget.IMG, {
    x,
    y,
    src: "status/bluetooth_on.png",
  });
  hmUI.createWidget(hmUI.widget.IMG_STATUS, {
    x,
    y,
    src: "status/bluetooth_off.png",
    type: hmUI.system_status.DISCONNECT,
  });

  if (hasSpaceOnRightSide) {
    x = 163;
  } else {
    y = 248;
  }
  hmUI.createWidget(hmUI.widget.IMG, {
    x,
    y,
    src: "status/dnd_off.png",
  });
  hmUI.createWidget(hmUI.widget.IMG_STATUS, {
    x,
    y,
    src: "status/dnd_on.png",
    type: hmUI.system_status.DISTURB,
  });
}

function getTbTimerState() {
  const state = hmFS.SysProGetChars("mmk_tb_timer_state");
  if (!state) return "--.--";

  const [id, startedTime, endTime] = state.split(":").map((v) => parseInt(v));
  const delay = Math.floor((endTime - Date.now()) / 1000);
  if (delay <= 0) return "--.--";

  const minute = Math.min(Math.floor(delay / 60), 99)
      .toString()
      .padStart(2, "0"),
    second = (delay % 60).toString().padStart(2, "0");

  return `${minute}.${second}`;
}
