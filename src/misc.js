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
