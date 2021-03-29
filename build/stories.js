class a{userMaxLength=5;userMinLength=3;selectUser=null;preparedUsers({users:a,selectedUserId:t},e){const i=[];return a.forEach(((a,s)=>{s<e&&i.push(a),a.id===t&&s>2&&(this.selectUser=a,i.pop(),i.push(a))})),i}getSelectUser(){return this.selectUser}template(a){const{emoji:t,selectedUserId:e}=a,i=this.preparedUsers(a,this.userMaxLength),s=this.selectUser;return`\n      <div class="Leaders-root">\n        <div class="Leaders-charts">\n          ${i.map(((a,i)=>{const{id:n,avatar:r,name:v,valueText:d}=a,l=0===i,c=i+1,o=n===e,m=1===c&&s;return`\n                <div class="Leaders-chart" style="grid-area: rank_${c};z-index: ${this.userMaxLength-i}" data-rank="${c}">\n                  <div class="Leaders-user">\n                    <div class="User-root" id="${n}">\n                      <div class="User-emoji">\n                        ${l?t:o?"👍":""}\n                      </div>\n                      <img\n                        class="User-avatar"\n                        src="/assets/images/4x/${r}"\n                      />\n                      <div class="User-name">${v}</div>\n                      <div class="User-value">${d}</div>\n                    </div>\n                  </div>\n                  <div\n                    class="Leaders-bar ${l?"Leaders-bar--active":""}"\n                  >\n                    ${c}\n                    \n                    ${m?`\n                          <div class="Leaders-user">\n                            <div class="User-root" id="${m.id}">\n                              <div class="User-emoji">\n                                👍\n                              </div>\n                              <img\n                                class="User-avatar"\n                                src="/assets/images/4x/${m.avatar}"\n                              />\n                              <div class="User-name">${m.name}</div>\n                              <div class="User-value">${m.valueText}</div>\n                            </div>\n                            <div class="Leaders-userLine">5</div>\n                          </div>\n                        `:""}\n                  </div>\n                </div>\n              `})).join("")}\n        </div>\n      </div>\n    `}}class t{maxValue=0;getMaxValue(a){return this.maxValue||(this.maxValue=Math.max(...a.map((a=>a.value)))),this.maxValue}template(a){const{values:t,users:e}=a,i=this.getMaxValue(t);return`\n      <div class="Chart-root">\n        <div class="Chart-barsWrap">\n          <div class="Chart-bars">\n            ${t.map((({value:a,title:t,active:e})=>`\n                  <div class="Chart-bar">\n                    <div class="Chart-barValue ${e?"Chart-barValue--active":""}">${a||""}</div>\n                    <div\n                      class="Chart-barColumn ${e?"Chart-barColumn--active":""}"\n                      style="height: calc(${a} / ${i} * (70% - 30px));"\n                    ></div>\n                    <div class="Chart-barTitle">${t}</div>\n                  </div>\n                `)).join("")}\n          </div>\n        </div>\n        <div class="Chart-leaders">\n          ${e.slice(0,2).map((({valueText:a,name:t,avatar:e,id:i})=>`\n                <div class="Chart-leader">\n                  <div class="User-root User-gorizontal" id="${i}">\n                    <img\n                      class="User-avatar"\n                      src="/assets/images/4x/${e}"\n                    />\n                    <div class="User-content">\n                      <div class="User-name">${t}</div>\n                      <div class="User-value">${a}</div>\n                    </div>\n                  </div>\n                </div>\n              `)).join("")}\n        </div>\n      </div>\n    `}}class e{template(a){const{categories:t}=a;return`\n      <div class="Diagram-root">\n        <div class="Diagram-chart">\n          <div class="Diagram-svg"></div>\n          <div class="Diagram-total">\n            <div class="Diagram-totalText">182 коммита</div>\n            <div class="Diagram-totalDiff">+42 с прошлого спринта</div>\n          </div>\n        </div>\n        <table class="Diagram-categories">\n          ${t.map((({differenceText:a,title:t,valueText:e})=>`\n                <tr class="Diagram-category">\n                  <td class="Diagram-categoryItem">\n                    <span class="Diagram-categoryCircle"></span>\n                  </td>\n                  <td class="Diagram-categoryItem Diagram-categoryTitle">${t}</td>\n                  <td class="Diagram-categoryItem Diagram-categoryDiff">${a.replace(/ коммитов/i,"").replace(/ коммитa/i,"")}</td>\n                  <td class="Diagram-categoryItem Diagram-categoryValue">${e.replace(/ коммитов/i,"").replace(/ коммита/i,"")}</td>\n                </tr>\n              `)).join("")}\n        </table>\n      </div>\n    `}}class i{template({title:a="",subtitle:t="",children:e="",className:i="default"}){return`\n      <div class="Layout-root Layout-${i}">\n        <div class="Layout-header">\n          <div class="Header-root">\n            <h1 class="Headline-root">${a}</h1>\n            <p class="Body-root Body-grey">${t}</p>\n          </div>\n        </div>\n        <div class="Layout-main">${e}</div>\n      </div>\n    `}}function s(a){return 1&a}function n(){return window.innerWidth>=567?"desktop":"mobile"}class r{week=["mon","tue","wed","thu","fri","sat","sun"];getSrc(a){return a>=1&&a<=2?"mid":a>=3&&a<=4?"max":a>=5&&a<=6?"extra":"min"}getCommits(a){const t=[];for(const e of this.week){let i=[];if("mobile"!==n())for(let t=0;t<a[e].length;t+=2)i.push(a[e][t]+a[e][t+1]);else i=a[e];t.push(i)}return t}renderMobileChart(a,t){return a.map(((a,e)=>`\n        <div \n          class="Activity-houre" \n          style="\n            z-index: ${e};\n            grid-area: ${this.week[t]};\n            grid-column: ${s(e)?2*t+2:2*t+1} / span 2;\n            grid-row: ${e+1} / span 3;\n          ">\n          <span class="Activity-chart Activity-chart--${this.getSrc(a)}"></span>\n        </div>\n      `)).join("")}renderDesktopChart(a,t){return a.map(((a,e)=>`\n        <div \n          class="Activity-houre" \n          style="\n            z-index: ${t};\n            grid-area: ${this.week[t]};\n            grid-column: ${s(t)?2*e+2:2*e+1} / span 2;\n            grid-row: ${t+1} / span 2;\n          ">\n          <span class="Activity-chart Activity-chart--${this.getSrc(a)}"></span>\n        </div>\n      `)).join("")}template({data:a}){const t="desktop"===n();return`\n      <div class="Activity-root">\n        <div class="Activity-charts">\n          ${this.getCommits(a).map(((a,e)=>t?this.renderDesktopChart(a,e):this.renderMobileChart(a,e))).join("")}\n        </div>\n        <div class="Activity-intervals">\n          <div class="Activity-interval Activity-interval-1">\n            <div class="Activity-intervalImg Activity-intervalImg-1"></div>\n            <div class="Activity-intervalText Activity-intervalText-1"></div>\n          </div>\n          <div class="Activity-interval Activity-interval-0">\n            <div class="Activity-intervalImg Activity-intervalImg-0"></div>\n            <div class="Activity-intervalText Activity-intervalText-0"></div>\n          </div>\n          <div class="Activity-interval Activity-interval-1-2">\n            <div class="Activity-intervalImg Activity-intervalImg-1-2"></div>\n            <div class="Activity-intervalText Activity-intervalText-1-2"></div>\n          </div>\n          <div class="Activity-interval Activity-interval-3-4">\n            <div class="Activity-intervalImg Activity-intervalImg-3-4"></div>\n            <div class="Activity-intervalText Activity-intervalText-3-4"></div>\n          </div>\n          <div class="Activity-interval Activity-interval-5-6">\n            <div class="Activity-intervalImg Activity-intervalImg-5-6"></div>\n            <div class="Activity-intervalText Activity-intervalText-5-6"></div>\n          </div>\n        </div>\n      </div>\n    `}}class v{nextSlide="mobile"===n()?9:7;template({users:a,selectedUserId:t}){return`\n      <div class="Vote-root">\n        <div class="Vote-areas">\n            ${a.map((({id:a,avatar:e,name:i},s)=>{const n=t===a;return`\n                <div class="Vote-area" data-action="update" data-params='{ "alias": "leaders", "data": { "selectedUserId": "${a}" }}' style="grid-area: area${s+1};" data-active="${n?"true":"false"}">\n                        <div class="User-root" id="${a}">\n                            <div class="User-emoji">\n                                ${n?"👍":""}\n                            </div>\n                            <img\n                                class="User-avatar"\n                                src="/assets/images/4x/${e}"\n                            />\n                            <div class="User-name">${i}</div>\n                        </div>\n                    </div>\n                `})).join("")}\n\n            <div class="Vote-area" data-action="update" data-params='{ "alias": "leaders", "data": { "offset": "${this.nextSlide}" }}' data-nav="up" style="grid-area: nav-button-up;">\n                <button class="Vote-navButton Vote-navButton--prev" disabled></button>\n            </div>\n            <div class="Vote-area" data-action="update" data-params='{ "alias": "leaders", "data": { "offset": "${this.nextSlide}" }}' data-nav="down" style="grid-area: nav-button-down;">\n                <button class="Vote-navButton Vote-navButton--next"></button>  \n            </div>\n        </div>\n      </div>\n    `}}class d{constructor(){this.layout=new i,this.leaders=new a,this.vote=new v,this.chart=new t,this.diagram=new e,this.activity=new r}static renderTemplate(a,t){return(new d).render(a,t)}render(a,t){return this[a]?this.layout.template({title:t.title,subtitle:t.subtitle,className:a,children:this[a].template(t)}):null}}window.renderTemplate=d.renderTemplate;
