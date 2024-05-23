// @ts-check
/**
 * Retrieves the settings from the local storage using the 'ha-tab-settings' key.
*/
async function getSettings() {
  const SETTINGS_KEY = "HATABS_SETTINGS";
  const settings = await chrome.storage.local.get(SETTINGS_KEY);
  return /** @type {import("./types.d.ts").Settings} */(settings[SETTINGS_KEY]);
}

/**
 * Gets the currently active tab from the browser.
 * @returns {Promise<chrome.tabs.Tab | undefined>}
 */
async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function checkTabs() {
  const { host, apiKey, device } = await getSettings();

  if (!host || !apiKey || !device) {
    console.log("invalid settings for HA-Tabs");
    return;
  }
  const haEntityURL = `${host}/api/states/${device}`;
  console.debug(`Sending request to ${haEntityURL}`);
  const activeTab = await getCurrentTab();
  
  const url = activeTab?.url ? new URL(activeTab.url) : null;
  console.debug(`Active tab: ${url?.host ?? 'NO ACTIVE TAB URL'}`);

  const response = await fetch(haEntityURL, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      state: url ? url.host : ''
    })
  });

  console.debug('HA response:', response);
}

chrome.tabs.onActivated.addListener(() => checkTabs());
chrome.tabs.onRemoved.addListener(() => checkTabs());
chrome.tabs.onCreated.addListener(() => checkTabs());
chrome.tabs.onUpdated.addListener(() => checkTabs());
chrome.windows.onFocusChanged.addListener(() => checkTabs());
chrome.windows.onCreated.addListener(() => checkTabs());
checkTabs();
