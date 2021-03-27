import Stories from "./stories";
import { getParamByName } from "./utils";

import "./styles/index.css";

window.renderTemplate = Stories.renderTemplate;

if (process.env.NODE_ENV) {
  fetch("/data/data.json")
    .then((res) => res.json())
    .then((result) => {
      const slide = getParamByName("slide");
      const theme = getParamByName("theme");
      const body = document.querySelector("body");

      const { alias, data } = slide ? result[slide - 1] : result[0];

      body.className = `theme_${theme || "dark"}`;
      body.innerHTML = Stories.renderTemplate(alias, data);
    })
    .catch((error) => {
      console.error(error);
      document.body.innerHTML = "Произошла ошибка при загрузки данных!";
    });
}
