const inputField = document.querySelector(".input"),
  sentry = document.querySelector(".sentry");
if (!inputField || !sentry)
  throw new Error("Missing .input or .sentry element");
inputField.classList.add("hidden");
let autoHideTimer = null,
  inactivityTimer = null;
const AUTO_HIDE_MS = 2e3,
  INACTIVITY_MS = 1e4;
function showInput() {
  sentry.classList.add("hidden"),
    inputField.classList.remove("hidden"),
    requestAnimationFrame(() => inputField.classList.add("visible")),
    inputField.focus(),
    startAutoHideTimer(),
    startInactivityTimer();
}
function hideInput() {
  inputField.classList.remove("visible"),
    inputField.classList.add("hidden"),
    sentry.classList.remove("hidden"),
    (inputField.value = ""),
    clearAutoHideTimer(),
    clearInactivityTimer();
}
function startAutoHideTimer() {
  clearAutoHideTimer(),
    inputField.classList.contains("hidden") ||
      inputField.value.trim() ||
      (autoHideTimer = setTimeout(() => {
        inputField.value.trim() || hideInput();
      }, AUTO_HIDE_MS));
}
function clearAutoHideTimer() {
  autoHideTimer && (clearTimeout(autoHideTimer), (autoHideTimer = null));
}
function startInactivityTimer() {
  clearInactivityTimer(),
    (inactivityTimer = setTimeout(() => {
      hideInput();
    }, INACTIVITY_MS));
}
function clearInactivityTimer() {
  inactivityTimer && (clearTimeout(inactivityTimer), (inactivityTimer = null));
}
document.addEventListener("keydown", (i) => {
  1 === i.key.length && inputField.classList.contains("hidden")
    ? showInput()
    : "Escape" === i.key &&
      document.activeElement === inputField &&
      hideInput();
}),
  inputField.addEventListener("blur", () => {
    inputField.value.trim() ? clearAutoHideTimer() : hideInput();
  }),
  inputField.addEventListener("input", () => {
    clearInactivityTimer(),
      startInactivityTimer(),
      inputField.value.trim() ? clearAutoHideTimer() : startAutoHideTimer();
  });
