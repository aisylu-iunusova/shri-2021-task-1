
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
/**
 * Проверяет число на четное и нечетное
 *
 * @param {Number} value
 */
function isNumberOdd(value) {
  return value & 1;
}

/**
 * Получает из url нужный параметр
 *
 * @param {string} name
 * @param {string} url
 */
function getParamByName(name, url) {
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

class Leaders {
  preparedUsers({ users, selectedUserId }) {
    const result = [];

    users.slice(0, 5).forEach((user, index) => {
      const results = {
        rank: index + 1,
        user,
      };

      if (selectedUserId && selectedUserId === user.id) {
        results["selected"] = true;
      }

      if (isNumberOdd(index)) {
        result.push(results);
      } else {
        result.unshift(results);
      }
    });

    if (selectedUserId && !result.find((i) => i.user.id === selectedUserId)) {
      result.shift();
      result.unshift({
        rank: 5,
        user: users.find((i) => i.id === selectedUserId),
      });
    }

    return result;
  }

  template(data) {
    const { emoji } = data;
    const users = this.preparedUsers(data);

    return /* html */ `
      <div class="Leaders-root">
        <div class="Leaders-charts">
          ${users
            .map(({ rank, user, selected }, index) => {
              const { id, avatar, name, valueText } = user;
              const isActive = Math.floor(users.length / 2) === index;

              return /* html */ `
                <div class="Leaders-chart" data-rank="${rank}">
                  <div class="Leaders-user">
                    <div class="User-root" id="${id}">
                      <div class="User-emoji">
                        ${isActive ? emoji : selected ? "👍" : ""}
                      </div>
                      <img
                        class="User-avatar"
                        src="/assets/images/4x/${avatar}"
                      />
                      <div class="User-name">${name}</div>
                      <div class="User-value">${valueText}</div>
                    </div>
                  </div>
                  <div
                    class="Leaders-bar ${isActive ? "Leaders-bar--active" : ""}"
                  >
                    ${rank}
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

const PlotIcon = /* html */ `<svg
  class="Plot-root"
  width="240"
  height="240"
  viewBox="0 0 240 240"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g filter="url(#filter0_ii)">
    <path
      d="M233.834 126.149C237.143 126.328 239.986 123.79 239.999 120.476C240.079 100.469 235.153 80.7248 225.629 63.0578C216.106 45.3907 202.319 30.4235 185.561 19.4928C182.786 17.6824 179.103 18.6621 177.433 21.5245L165.342 42.2562C163.673 45.1187 164.654 48.775 167.39 50.6445C178.445 58.1982 187.56 68.3037 193.941 80.1404C200.322 91.9772 203.754 105.146 203.987 118.533C204.045 121.847 206.56 124.676 209.869 124.855L233.834 126.149Z"
      fill="url(#paint0_radial)"
      fill-opacity="0.6"
    />
  </g>
  <g filter="url(#filter1_ii)">
    <path
      d="M62.3506 21.6509C60.6748 18.7921 56.9895 17.8205 54.218 19.637C38.1658 30.1581 24.8452 44.3946 15.4079 61.174C4.98865 79.6994 -0.323338 100.66 0.0152251 121.911C0.353788 143.163 6.33076 163.944 17.3349 182.128C27.3019 198.598 41.0691 212.403 57.4484 222.408C60.2763 224.135 63.9288 223.046 65.5126 220.136L76.9837 199.054C78.5675 196.144 77.4781 192.518 74.6878 190.731C63.8924 183.815 54.7995 174.504 48.1344 163.49C40.4315 150.761 36.2477 136.214 36.0107 121.338C35.7737 106.462 39.4921 91.7896 46.7856 78.8218C53.0965 67.6011 61.8881 58.0049 72.4578 50.7487C75.1897 48.8733 76.163 45.2148 74.4873 42.356L62.3506 21.6509Z"
      fill="url(#paint1_radial)"
      fill-opacity="0.5"
    />
  </g>
  <g filter="url(#filter2_ii)">
    <path
      d="M67.8948 221.396C66.3802 224.343 67.5362 227.975 70.5555 229.34C86.7689 236.672 104.435 240.317 122.276 239.978C142.12 239.602 161.56 234.31 178.856 224.575C196.152 214.841 210.764 200.968 221.382 184.201C230.929 169.125 236.979 152.132 239.125 134.468C239.524 131.178 237.019 128.305 233.714 128.071L209.774 126.372C206.469 126.137 203.621 128.632 203.151 131.912C201.472 143.636 197.328 154.896 190.967 164.94C183.535 176.678 173.306 186.389 161.199 193.203C149.092 200.017 135.484 203.721 121.593 203.985C109.706 204.21 97.9305 201.91 87.0368 197.262C83.9889 195.962 80.3789 197.102 78.8643 200.049L67.8948 221.396Z"
      fill="url(#paint2_radial)"
      fill-opacity="0.25"
    />
  </g>
  <g filter="url(#filter3_ii)">
    <path
      d="M175.504 20.4242C177.117 17.5297 176.085 13.8609 173.113 12.3942C156.571 4.22889 138.342 -0.0246085 119.84 0.000107069C101.338 0.0248227 83.1203 4.32701 66.5996 12.5365C63.6321 14.0111 62.6095 17.6827 64.2305 20.5728L75.9715 41.5049C77.5926 44.395 81.2418 45.4025 84.2402 43.9918C95.3703 38.7554 107.539 36.0166 119.888 36.0001C132.237 35.9836 144.413 38.6899 155.557 43.8966C158.559 45.2992 162.205 44.2819 163.819 41.3875L175.504 20.4242Z"
      fill="url(#paint3_radial)"
      fill-opacity="0.8"
    />
  </g>
  <defs>
    <filter
      id="filter0_ii"
      x="163.523"
      y="18.578"
      width="76.477"
      height="108.58"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="BackgroundImageFix"
        result="shape"
      />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="10" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.4 0"
      />
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dx="-1" dy="1" />
      <feGaussianBlur stdDeviation="0.5" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
      />
      <feBlend
        mode="normal"
        in2="effect1_innerShadow"
        result="effect2_innerShadow"
      />
    </filter>
    <filter
      id="filter1_ii"
      x="-1"
      y="18.7155"
      width="78.715"
      height="205.518"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="BackgroundImageFix"
        result="shape"
      />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="10" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0.6 0"
      />
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dx="-1" dy="1" />
      <feGaussianBlur stdDeviation="0.5" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
      />
      <feBlend
        mode="normal"
        in2="effect1_innerShadow"
        result="effect2_innerShadow"
      />
    </filter>
    <filter
      id="filter2_ii"
      x="66.2308"
      y="126.356"
      width="172.936"
      height="114.644"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="BackgroundImageFix"
        result="shape"
      />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="10" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0.2 0"
      />
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dx="-1" dy="1" />
      <feGaussianBlur stdDeviation="0.5" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
      />
      <feBlend
        mode="normal"
        in2="effect1_innerShadow"
        result="effect2_innerShadow"
      />
    </filter>
    <filter
      id="filter3_ii"
      x="62.4636"
      y="0"
      width="113.799"
      height="45.623"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="BackgroundImageFix"
        result="shape"
      />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="10" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.9 0"
      />
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dx="-1" dy="1" />
      <feGaussianBlur stdDeviation="0.5" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
      />
      <feBlend
        mode="normal"
        in2="effect1_innerShadow"
        result="effect2_innerShadow"
      />
    </filter>
    <radialGradient
      id="paint0_radial"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"
    >
      <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.4" />
      <stop offset="1" stop-color="#FFEF99" stop-opacity="0.2" />
    </radialGradient>
    <radialGradient
      id="paint1_radial"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"
    >
      <stop offset="0.828125" stop-color="#BFBFBF" stop-opacity="0.69" />
      <stop offset="0.921875" stop-color="#E4E4E4" stop-opacity="0.2" />
    </radialGradient>
    <radialGradient
      id="paint2_radial"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"
    >
      <stop offset="0.828125" stop-color="#A6A6A6" stop-opacity="0.69" />
      <stop offset="0.921875" stop-color="#CBCBCB" stop-opacity="0.2" />
    </radialGradient>
    <radialGradient
      id="paint3_radial"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"
    >
      <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.7" />
      <stop offset="1" stop-color="#FFEF99" stop-opacity="0.4" />
    </radialGradient>
  </defs>
</svg>`;

class Diagram {
  template(data) {
    const { categories } = data;

    return /* html */ `
      <div class="Diagram-root">
        <div class="Diagram-chart">
          ${PlotIcon}
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

class Layout {
  template({
    title = "",
    subtitle = "",
    children = "",
    className = "default",
  }) {
    return /* html */ `
      <div class="Layout-root Layout-${className}">
        <div class="Layout-header">
          <div class="Header-root">
            <h1 class="Headline-root">${title}</h1>
            <p class="Body-root Body-grey">${subtitle}</p>
          </div>
        </div>
        <div class="Layout-main">${children}</div>
      </div>
    `;
  }
}

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
                  const type =
                    data[key][index] +
                    (data[key][index + 1] == undefined
                      ? 0
                      : data[key][index + 1]);

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

class Vote {
  template({ users, selectedUserId }) {
    return /* html */ `
      <div class="Vote-root">
        <div class="Vote-areas">
            ${users
              .map(({ id, avatar, name }, index) => {
                const isActive = selectedUserId === id;

                return /* html */ `
                    <div class="Vote-area" style="grid-area: main${
                      index + 1
                    };" data-active="${isActive ? "true" : "false"}">
                        <div class="User-root" id="${id}">
                            <div class="User-emoji">
                                ${isActive ? "👍" : ""}
                            </div>
                            <img
                                class="User-avatar"
                                src="/assets/images/4x/${avatar}"
                            />
                            <div class="User-name">${name}</div>
                        </div>
                    </div>
                `;
              })
              .join("")}

            <div class="Vote-area" data-nav style="grid-area: nav1;">
                <button class="Vote-navButton Vote-navButton--prev" disabled>
                    <img src="/assets/images/button-dark.svg" /> 
                </button>
            </div>
            <div class="Vote-area" data-nav style="grid-area: nav2;">
                <button class="Vote-navButton Vote-navButton--next">
                    <img src="/assets/images/button-dark.svg" /> 
                </button>  
            </div>
        </div>
      </div>
    `;
  }
}

class Stories {
  constructor() {
    this.layout = new Layout();
    this.leaders = new Leaders();
    this.vote = new Vote();
    this.chart = new Chart();
    this.diagram = new Diagram();
    this.activity = new Activity();
  }

  static renderTemplate(alias, data) {
    return new Stories().render(alias, data);
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

// global
window.renderTemplate = Stories.renderTemplate;

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
