// For development purposes, use LocalStorage to sync redux state across tabs...
export function get(key) {
  try {
    const store = localStorage.getItem(key);
    if (store) return JSON.parse(store);
  } catch (e) {
    console.error("Error getting store from  local storage", e);
  }

  return undefined;
}

export function set(key, store) {
  try {
    localStorage.setItem(key, JSON.stringify(store));
  } catch (e) {
    console.error("Error saving store to local storage", e);
  }
}
