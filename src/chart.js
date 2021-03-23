class Chart {
  maxValue = 0;

  getMaxValue(values) {
    if (!this.maxValue) {
      this.maxValue = Math.max(...values.map((i) => i.value));
    }

    return this.maxValue;
  }

  template(data) {
    const { values, users } = data;
    const maxValue = this.getMaxValue(values);

    return /* html */ `
      <div class="Chart-root">
        <div class="Chart-barsWrap">
          <div class="Chart-bars">
            ${values
              .map(({ value, title, active }) => {
                return /* html */ `
                  <div class="Chart-bar">
                    <div class="Chart-barValue ${
                      active ? "Chart-barValue--active" : ""
                    }">${value || ""}</div>
                    <div
                      class="Chart-barColumn ${
                        active ? "Chart-barColumn--active" : ""
                      }"
                      style="height: calc(${value} / ${maxValue} * (70% - 30px));"
                    ></div>
                    <div class="Chart-barTitle">${title}</div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
        <div class="Chart-leaders">
          ${users
            .slice(0, 2)
            .map(({ valueText, name, avatar, id }) => {
              return /* html */ `
                <div class="Chart-leader">
                  <div class="User-root User-gorizontal" id="${id}">
                    <img
                      class="User-avatar"
                      src="/assets/images/4x/${avatar}"
                    />
                    <div class="User-content">
                      <div class="User-name">${name}</div>
                      <div class="User-value">${valueText}</div>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }
}

export default Chart;
