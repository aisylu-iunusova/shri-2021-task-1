class Diagram {
  template(data) {
    const { categories } = data;

    return /* html */ `
      <div class="Diagram-root">
        <div class="Diagram-chart">
          <div class="Diagram-svg"></div>
          <div class="Diagram-total">
            <div class="Diagram-totalText">182 коммита</div>
            <div class="Diagram-totalDiff">+42 с прошлого спринта</div>
          </div>
        </div>
        <table class="Diagram-categories">
          ${categories
            .map(({ differenceText, title, valueText }) => {
              return /* html */ `
                <tr class="Diagram-category">
                  <td class="Diagram-categoryItem">
                    <span class="Diagram-categoryCircle"></span>
                  </td>
                  <td class="Diagram-categoryItem Diagram-categoryTitle">${title}</td>
                  <td class="Diagram-categoryItem Diagram-categoryDiff">${differenceText
                    .replace(/ коммитов/i, "")
                    .replace(/ коммитa/i, "")}</td>
                  <td class="Diagram-categoryItem Diagram-categoryValue">${valueText
                    .replace(/ коммитов/i, "")
                    .replace(/ коммита/i, "")}</td>
                </tr>
              `;
            })
            .join("")}
        </table>
      </div>
    `;
  }
}

export default Diagram;
