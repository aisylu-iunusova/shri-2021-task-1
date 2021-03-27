import { isNumberOdd } from "./utils";

class Activity {
  getSrc(type) {
    if (type >= 1 && type <= 2) {
      return "mid-light";
    }

    if (type >= 3 && type <= 4) {
      return "max-light";
    }

    if (type >= 5 && type <= 6) {
      return "extra-light";
    }

    return "min-light";
  }

  template({ data }) {
    const month = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    return /* html */ `
      <div class="Activity-root">
        <div class="Activity-chart">
          ${month
            .map((key) => {
              return data[key]
                .map((box, index) => {
                  const type = data[key][index] + (data[key][index + 1] || 0);

                  return !isNumberOdd(index)
                    ? /* html */ `
                      <div class="Activity-houre">
                        <img src="./assets/images/${this.getSrc(type)}.svg" />
                      </div>
                    `
                    : null;
                })
                .join("");
            })
            .join("")}
        </div>
        <div class="Activity-test"></div>
      </div>
    `;
  }
}

export default Activity;
