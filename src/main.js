import Stories from "./stories";
import { getParamByName } from "./utils";
import "./styles/index.css";

// global
window.renderTemplate = Stories.renderTemplate;

if (process.env.NODE_ENV) {
  fetch("/data/data.json")
    .then((res) => res.json())
    .then((result) => {
      const slide = getParamByName("slide");
      const { alias, data } = slide ? result[slide - 1] : result[0];
      const body = document.querySelector("body");

      body.innerHTML = Stories.renderTemplate(alias, data);
    })
    .catch((error) => {
      console.error(error);
      document.body.innerHTML = "Произошла ошибка при загрузки данных!";
    });
}
