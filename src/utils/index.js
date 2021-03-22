/**
 * Проверяет число на четное и нечетное
 *
 * @param {Number} value
 */
export function isNumberOdd(value) {
  return value & 1;
}

/**
 * Получает из url нужный параметр
 *
 * @param {string} name
 * @param {string} url
 */
export function getParamByName(name, url) {
  if (!url) {
    url = window.location.href;
  }

  name = name.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
