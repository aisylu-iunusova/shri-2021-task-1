import Leaders from "./leaders";
import Chart from "./chart";
import Diagram from "./diagram";
import Layout from "./layout";
import Activity from "./activity";
import Vote from "./vote";
import { getParamByName } from "./utils";

class Stories {
  constructor() {
    this.layout = new Layout();
    this.leaders = new Leaders();
    this.vote = new Vote();
    this.chart = new Chart();
    this.diagram = new Diagram();
    this.activity = new Activity();

    this.setTheme();
  }

  static renderTemplate(alias, data) {
    return new Stories().render(alias, data);
  }

  setTheme() {
    const theme = getParamByName("theme");
    const body = document.querySelector("body");

    body.className = `theme_${theme || "dark"}`;
  }

  render(alias, data) {
    if (this[alias]) {
      return this.layout.template({
        title: data.title,
        subtitle: data.subtitle,
        className: alias,
        children: this[alias].template(data),
      });
    }

    return null;
  }
}

export default Stories;
