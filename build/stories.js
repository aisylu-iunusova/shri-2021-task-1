class n{userLength=5;device(){window.innerWidth<=567&&(this.userLength=3)}onResize(){window.addEventListener("resize",(()=>{this.device()})),this.device()}preparedUsers({users:n,selectedUserId:e},a){const t=[];return n.forEach(((n,i)=>{i<a&&t.push(n),n.id===e&&i>a-1&&(t.pop(),t.push(n))})),t}template(n){this.onResize();const{emoji:e,selectedUserId:a}=n,t=this.preparedUsers(n,this.userLength);return`\n      <div class="Leaders-root">\n        <div class="Leaders-charts">\n          ${t.slice(0,this.userLength).map(((i,r)=>{const{id:s,avatar:l,name:o,valueText:d}=i,c=0===r,u=r+1,p=s===a,v=1===u&&n.users[this.userLength-1].id!==t[this.userLength-1].id&&t[this.userLength-1];return`\n                <div class="Leaders-chart" style="grid-area: rank_${u};z-index: ${this.userLength-r}" data-rank="${u}">\n                  <div class="Leaders-user">\n                    <div class="User-root" id="${s}">\n                      <div class="User-emoji">\n                        ${c?e:p?"👍":""}\n                      </div>\n                      <img\n                        class="User-avatar"\n                        src="/assets/images/4x/${l}"\n                      />\n                      <div class="User-name">${o}</div>\n                      <div class="User-value">${d}</div>\n                    </div>\n                  </div>\n                  <div\n                    class="Leaders-bar ${c?"Leaders-bar--active":""}"\n                  >\n                    ${u}\n                    \n                    ${v?`\n                          <div class="Leaders-user">\n                            <div class="User-root" id="${v.id}">\n                              <div class="User-emoji">\n                                👍\n                              </div>\n                              <img\n                                class="User-avatar"\n                                src="/assets/images/4x/${v.avatar}"\n                              />\n                              <div class="User-name">${v.name}</div>\n                              <div class="User-value">${v.valueText}</div>\n                            </div>\n                            <div class="Leaders-userLine">5</div>\n                          </div>\n                        `:""}\n                  </div>\n                </div>\n              `})).join("")}\n        </div>\n      </div>\n    `}}class e{maxValue=0;getMaxValue(n){return this.maxValue||(this.maxValue=Math.max(...n.map((n=>n.value)))),this.maxValue}template(n){const{values:e,users:a}=n,t=this.getMaxValue(e);return`\n      <div class="Chart-root">\n        <div class="Chart-barsWrap">\n          <div class="Chart-bars">\n            ${e.map((({value:n,title:e,active:a})=>`\n                  <div class="Chart-bar">\n                    <div class="Chart-barValue ${a?"Chart-barValue--active":""}">${n||""}</div>\n                    <div\n                      class="Chart-barColumn ${a?"Chart-barColumn--active":""}"\n                      style="height: calc(${n} / ${t} * (70% - 30px));"\n                    ></div>\n                    <div class="Chart-barTitle">${e}</div>\n                  </div>\n                `)).join("")}\n          </div>\n        </div>\n        <div class="Chart-leaders">\n          ${a.slice(0,2).map((({valueText:n,name:e,avatar:a,id:t})=>`\n                <div class="Chart-leader">\n                  <div class="User-root User-gorizontal" id="${t}">\n                    <img\n                      class="User-avatar"\n                      src="/assets/images/4x/${a}"\n                    />\n                    <div class="User-content">\n                      <div class="User-name">${e}</div>\n                      <div class="User-value">${n}</div>\n                    </div>\n                  </div>\n                </div>\n              `)).join("")}\n        </div>\n      </div>\n    `}}class a{template(n){const{categories:e}=n;return`\n      <div class="Diagram-root">\n        <div class="Diagram-chart">\n          <svg\n  class="Plot-root"\n  width="240"\n  height="240"\n  viewBox="0 0 240 240"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <g filter="url(#filter0_ii)">\n    <path\n      d="M233.834 126.149C237.143 126.328 239.986 123.79 239.999 120.476C240.079 100.469 235.153 80.7248 225.629 63.0578C216.106 45.3907 202.319 30.4235 185.561 19.4928C182.786 17.6824 179.103 18.6621 177.433 21.5245L165.342 42.2562C163.673 45.1187 164.654 48.775 167.39 50.6445C178.445 58.1982 187.56 68.3037 193.941 80.1404C200.322 91.9772 203.754 105.146 203.987 118.533C204.045 121.847 206.56 124.676 209.869 124.855L233.834 126.149Z"\n      fill="url(#paint0_radial)"\n      fill-opacity="0.6"\n    />\n  </g>\n  <g filter="url(#filter1_ii)">\n    <path\n      d="M62.3506 21.6509C60.6748 18.7921 56.9895 17.8205 54.218 19.637C38.1658 30.1581 24.8452 44.3946 15.4079 61.174C4.98865 79.6994 -0.323338 100.66 0.0152251 121.911C0.353788 143.163 6.33076 163.944 17.3349 182.128C27.3019 198.598 41.0691 212.403 57.4484 222.408C60.2763 224.135 63.9288 223.046 65.5126 220.136L76.9837 199.054C78.5675 196.144 77.4781 192.518 74.6878 190.731C63.8924 183.815 54.7995 174.504 48.1344 163.49C40.4315 150.761 36.2477 136.214 36.0107 121.338C35.7737 106.462 39.4921 91.7896 46.7856 78.8218C53.0965 67.6011 61.8881 58.0049 72.4578 50.7487C75.1897 48.8733 76.163 45.2148 74.4873 42.356L62.3506 21.6509Z"\n      fill="url(#paint1_radial)"\n      fill-opacity="0.5"\n    />\n  </g>\n  <g filter="url(#filter2_ii)">\n    <path\n      d="M67.8948 221.396C66.3802 224.343 67.5362 227.975 70.5555 229.34C86.7689 236.672 104.435 240.317 122.276 239.978C142.12 239.602 161.56 234.31 178.856 224.575C196.152 214.841 210.764 200.968 221.382 184.201C230.929 169.125 236.979 152.132 239.125 134.468C239.524 131.178 237.019 128.305 233.714 128.071L209.774 126.372C206.469 126.137 203.621 128.632 203.151 131.912C201.472 143.636 197.328 154.896 190.967 164.94C183.535 176.678 173.306 186.389 161.199 193.203C149.092 200.017 135.484 203.721 121.593 203.985C109.706 204.21 97.9305 201.91 87.0368 197.262C83.9889 195.962 80.3789 197.102 78.8643 200.049L67.8948 221.396Z"\n      fill="url(#paint2_radial)"\n      fill-opacity="0.25"\n    />\n  </g>\n  <g filter="url(#filter3_ii)">\n    <path\n      d="M175.504 20.4242C177.117 17.5297 176.085 13.8609 173.113 12.3942C156.571 4.22889 138.342 -0.0246085 119.84 0.000107069C101.338 0.0248227 83.1203 4.32701 66.5996 12.5365C63.6321 14.0111 62.6095 17.6827 64.2305 20.5728L75.9715 41.5049C77.5926 44.395 81.2418 45.4025 84.2402 43.9918C95.3703 38.7554 107.539 36.0166 119.888 36.0001C132.237 35.9836 144.413 38.6899 155.557 43.8966C158.559 45.2992 162.205 44.2819 163.819 41.3875L175.504 20.4242Z"\n      fill="url(#paint3_radial)"\n      fill-opacity="0.8"\n    />\n  </g>\n  <defs>\n    <filter\n      id="filter0_ii"\n      x="163.523"\n      y="18.578"\n      width="76.477"\n      height="108.58"\n      filterUnits="userSpaceOnUse"\n      color-interpolation-filters="sRGB"\n    >\n      <feFlood flood-opacity="0" result="BackgroundImageFix" />\n      <feBlend\n        mode="normal"\n        in="SourceGraphic"\n        in2="BackgroundImageFix"\n        result="shape"\n      />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation="10" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.4 0"\n      />\n      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset dx="-1" dy="1" />\n      <feGaussianBlur stdDeviation="0.5" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"\n      />\n      <feBlend\n        mode="normal"\n        in2="effect1_innerShadow"\n        result="effect2_innerShadow"\n      />\n    </filter>\n    <filter\n      id="filter1_ii"\n      x="-1"\n      y="18.7155"\n      width="78.715"\n      height="205.518"\n      filterUnits="userSpaceOnUse"\n      color-interpolation-filters="sRGB"\n    >\n      <feFlood flood-opacity="0" result="BackgroundImageFix" />\n      <feBlend\n        mode="normal"\n        in="SourceGraphic"\n        in2="BackgroundImageFix"\n        result="shape"\n      />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation="10" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0.6 0"\n      />\n      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset dx="-1" dy="1" />\n      <feGaussianBlur stdDeviation="0.5" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"\n      />\n      <feBlend\n        mode="normal"\n        in2="effect1_innerShadow"\n        result="effect2_innerShadow"\n      />\n    </filter>\n    <filter\n      id="filter2_ii"\n      x="66.2308"\n      y="126.356"\n      width="172.936"\n      height="114.644"\n      filterUnits="userSpaceOnUse"\n      color-interpolation-filters="sRGB"\n    >\n      <feFlood flood-opacity="0" result="BackgroundImageFix" />\n      <feBlend\n        mode="normal"\n        in="SourceGraphic"\n        in2="BackgroundImageFix"\n        result="shape"\n      />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation="10" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0.2 0"\n      />\n      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset dx="-1" dy="1" />\n      <feGaussianBlur stdDeviation="0.5" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"\n      />\n      <feBlend\n        mode="normal"\n        in2="effect1_innerShadow"\n        result="effect2_innerShadow"\n      />\n    </filter>\n    <filter\n      id="filter3_ii"\n      x="62.4636"\n      y="0"\n      width="113.799"\n      height="45.623"\n      filterUnits="userSpaceOnUse"\n      color-interpolation-filters="sRGB"\n    >\n      <feFlood flood-opacity="0" result="BackgroundImageFix" />\n      <feBlend\n        mode="normal"\n        in="SourceGraphic"\n        in2="BackgroundImageFix"\n        result="shape"\n      />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation="10" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.9 0"\n      />\n      <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />\n      <feColorMatrix\n        in="SourceAlpha"\n        type="matrix"\n        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\n        result="hardAlpha"\n      />\n      <feOffset dx="-1" dy="1" />\n      <feGaussianBlur stdDeviation="0.5" />\n      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />\n      <feColorMatrix\n        type="matrix"\n        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"\n      />\n      <feBlend\n        mode="normal"\n        in2="effect1_innerShadow"\n        result="effect2_innerShadow"\n      />\n    </filter>\n    <radialGradient\n      id="paint0_radial"\n      cx="0"\n      cy="0"\n      r="1"\n      gradientUnits="userSpaceOnUse"\n      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"\n    >\n      <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.4" />\n      <stop offset="1" stop-color="#FFEF99" stop-opacity="0.2" />\n    </radialGradient>\n    <radialGradient\n      id="paint1_radial"\n      cx="0"\n      cy="0"\n      r="1"\n      gradientUnits="userSpaceOnUse"\n      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"\n    >\n      <stop offset="0.828125" stop-color="#BFBFBF" stop-opacity="0.69" />\n      <stop offset="0.921875" stop-color="#E4E4E4" stop-opacity="0.2" />\n    </radialGradient>\n    <radialGradient\n      id="paint2_radial"\n      cx="0"\n      cy="0"\n      r="1"\n      gradientUnits="userSpaceOnUse"\n      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"\n    >\n      <stop offset="0.828125" stop-color="#A6A6A6" stop-opacity="0.69" />\n      <stop offset="0.921875" stop-color="#CBCBCB" stop-opacity="0.2" />\n    </radialGradient>\n    <radialGradient\n      id="paint3_radial"\n      cx="0"\n      cy="0"\n      r="1"\n      gradientUnits="userSpaceOnUse"\n      gradientTransform="translate(119.624 120.376) rotate(90) scale(119.624)"\n    >\n      <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.7" />\n      <stop offset="1" stop-color="#FFEF99" stop-opacity="0.4" />\n    </radialGradient>\n  </defs>\n</svg>\n          <div class="Diagram-total">\n            <div class="Diagram-totalText">182 коммита</div>\n            <div class="Diagram-totalDiff">+42 с прошлого спринта</div>\n          </div>\n        </div>\n        <table class="Diagram-categories">\n          ${e.map((({differenceText:n,title:e,valueText:a})=>`\n                <tr class="Diagram-category">\n                  <td class="Diagram-categoryItem">\n                    <span class="Diagram-categoryCircle"></span>\n                  </td>\n                  <td class="Diagram-categoryItem Diagram-categoryTitle">${e}</td>\n                  <td class="Diagram-categoryItem Diagram-categoryDiff">${n.replace(/ коммитов/i,"").replace(/ коммитa/i,"")}</td>\n                  <td class="Diagram-categoryItem Diagram-categoryValue">${a.replace(/ коммитов/i,"").replace(/ коммита/i,"")}</td>\n                </tr>\n              `)).join("")}\n        </table>\n      </div>\n    `}}class t{template({title:n="",subtitle:e="",children:a="",className:t="default"}){return`\n      <div class="Layout-root Layout-${t}">\n        <div class="Layout-header">\n          <div class="Header-root">\n            <h1 class="Headline-root">${n}</h1>\n            <p class="Body-root Body-grey">${e}</p>\n          </div>\n        </div>\n        <div class="Layout-main">${a}</div>\n      </div>\n    `}}class i{getSrc(n){return n>=1&&n<=2?"mid-light":n>=3&&n<=4?"max-light":n>=5&&n<=6?"extra-light":"min-light"}template({data:n}){return`\n      <div class="Activity-root">\n        <div class="Activity-chart">\n          ${["mon","tue","wed","thu","fri","sat","sun"].map((e=>n[e].map(((a,t)=>{const i=n[e][t]+(null==n[e][t+1]?0:n[e][t+1]);return 1&t?null:`\n                      <div class="Activity-houre">\n                        <img src="./assets/images/${this.getSrc(i)}.svg" />\n                      </div>\n                    `})).join(""))).join("")}\n        </div>\n        <div class="Activity-test"></div>\n      </div>\n    `}}class r{template({users:n,selectedUserId:e}){return`\n      <div class="Vote-root">\n        <div class="Vote-areas">\n            ${n.map((({id:n,avatar:a,name:t},i)=>{const r=e===n;return`\n                    <div class="Vote-area" style="grid-area: main${i+1};" data-active="${r?"true":"false"}">\n                        <div class="User-root" id="${n}">\n                            <div class="User-emoji">\n                                ${r?"👍":""}\n                            </div>\n                            <img\n                                class="User-avatar"\n                                src="/assets/images/4x/${a}"\n                            />\n                            <div class="User-name">${t}</div>\n                        </div>\n                    </div>\n                `})).join("")}\n\n            <div class="Vote-area" data-nav style="grid-area: nav1;">\n                <button class="Vote-navButton Vote-navButton--prev" disabled>\n                    <img src="/assets/images/button-dark.svg" /> \n                </button>\n            </div>\n            <div class="Vote-area" data-nav style="grid-area: nav2;">\n                <button class="Vote-navButton Vote-navButton--next">\n                    <img src="/assets/images/button-dark.svg" /> \n                </button>  \n            </div>\n        </div>\n      </div>\n    `}}class s{constructor(){this.layout=new t,this.leaders=new n,this.vote=new r,this.chart=new e,this.diagram=new a,this.activity=new i}static renderTemplate(n,e){return(new s).render(n,e)}render(n,e){return this[n]?this.layout.template({title:e.title,subtitle:e.subtitle,className:n,children:this[n].template(e)}):null}}window.renderTemplate=s.renderTemplate;
