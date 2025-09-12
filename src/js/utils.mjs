// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage (SAFE)
export function getLocalStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("getLocalStorage failed for key:", key, err);
    return null;
  }
}

export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("setLocalStorage failed for key:", key, err);
  }
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// W02 helper: get query param from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * W02-Individual helper:
 * Generic renderer that maps a list of items through a template and inserts the result.
 * @param {(item:any)=>string} templateFn
 * @param {Element} parentElement
 * @param {any[]} list
 * @param {"beforebegin"|"afterbegin"|"beforeend"|"afterend"} position
 * @param {boolean} clear
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}