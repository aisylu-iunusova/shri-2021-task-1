import Stories from "./stories";
import { getParamByName } from "./utils";
import "./styles/index.css";

fetch("/data/data.json")
  .then((res) => res.json())
  .then((result) => {
    const slide = getParamByName("slide");
    const theme = getParamByName("theme");

    const { alias, data } = slide ? result[slide - 1] : result[0];

    document.body.className = `theme_${theme || "dark"}`;
    document.body.innerHTML = Stories.renderTemplate(alias, data);
  })
  .catch(() => {
    document.body.innerHTML = "Произошла ошибка при загрузки данных!";
  });
