const SETTINGS_KEY = "HATABS_SETTINGS";
async function getSettings() {
  const settings = await chrome.storage.local.get(SETTINGS_KEY);
  return /** @type {import("./types.d.ts").Settings} */(settings[SETTINGS_KEY]);
}

async function saveSettings() {
  const settings = getSettingsFromDOM();
  await chrome.storage.local.set({[SETTINGS_KEY]: settings});
}

function getSettingsFromDOM() {
  /** @type {import("./types.d.ts").Settings} */
  const settings = {};
  /** @type {Array<keyof import("./types.d.ts").Settings>} */
  const keys = ['host', 'apiKey', 'device'];
  for (let k of keys) {
    settings[k] = document.getElementById(k)?.value;
  }
  return settings;
}

async function setSettingsToDOM() {
  const settings = await getSettings();
  for (let k of Object.keys(settings)) {
    document.getElementById(k).value = settings[k];
  }
}
setSettingsToDOM();

document.addEventListener("DOMContentLoaded", function () {
  var link = document.getElementById("save");
  link.addEventListener("click", function () {
    saveSettings();
  });
});
