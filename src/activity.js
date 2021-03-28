import { isNumberOdd, getAppTheme, getApp } from "./utils";

class Activity {
  week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  getSrc(type) {
    if (type >= 1 && type <= 2) {
      return "mid";
    }

    if (type >= 3 && type <= 4) {
      return "max";
    }

    if (type >= 5 && type <= 6) {
      return "extra";
    }

    return "min";
  }

  getCommits(data) {
    const result = [];

    for (const dayName of this.week) {
      let dayCommits = [];

      if (getApp() !== "mobile") {
        for (let i = 0; i < data[dayName].length; i += 2) {
          dayCommits.push(data[dayName][i] + data[dayName][i + 1]);
        }
      } else {
        dayCommits = data[dayName];
      }

      result.push(dayCommits);
    }

    return result;
  }

  renderMobileChart(day, dayIndex) {
    return day
      .map((commits, index) => {
        return /* html */ `
        <div 
          class="Activity-houre" 
          style="
            z-index: ${index};
            grid-area: ${this.week[dayIndex]};
            grid-column: ${
              !isNumberOdd(index) ? 2 * dayIndex + 1 : 2 * dayIndex + 2
            } / span 2;
            grid-row: ${index + 1} / span 3;
          ">
          <span class="img_chart img_chart--${this.getSrc(commits)}"></span>
        </div>
      `;
      })
      .join("");
  }

  renderDesktopChart(day, dayIndex) {
    return day
      .map((commits, index) => {
        return /* html */ `
        <div 
          class="Activity-houre" 
          style="
            z-index: ${dayIndex};
            grid-area: ${this.week[dayIndex]};
            grid-column: ${
              !isNumberOdd(dayIndex) ? 2 * index + 1 : 2 * index + 2
            } / span 2;
            grid-row: ${dayIndex + 1} / span 2;
          ">
          <span class="img_chart img_chart--${this.getSrc(commits)}"></span>
        </div>
      `;
      })
      .join("");
  }

  template({ data }) {
    const desktop = getApp() === "desktop";

    return /* html */ `
      <div class="Activity-root">
        <div class="Activity-chart">
          ${this.getCommits(data)
            .map((day, dayIndex) => {
              return desktop
                ? this.renderDesktopChart(day, dayIndex)
                : this.renderMobileChart(day, dayIndex);
            })
            .join("")}
        </div>
      </div>
    `;
  }
}

export default Activity;
