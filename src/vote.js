import { getApp } from "./utils";

class Vote {
  defaultSlide = getApp() === "mobile" ? 8 : 6;

  template({ users, selectedUserId, offset = 0 }) {
    let prevSlide = Math.max(0, offset - this.defaultSlide);
    let nextSlide = Math.min(
      Math.ceil(users.length / this.defaultSlide) * this.defaultSlide -
        this.defaultSlide,
      offset + this.defaultSlide
    );

    return /* html */ `
      <div class="Vote-root">
        <div class="Vote-areas">
            ${users
              .slice(offset, offset + this.defaultSlide)
              .map(({ id, avatar, name }, index) => {
                const isActive = selectedUserId === id;

                return /* html */ `
                <div class="Vote-area" data-action="update" data-params='{ \"alias\": \"vote\", \"data\": { \"selectedUserId\": ${id} }}' style="grid-area: area${
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

            <div
              class="Vote-area"
              data-nav="up"
              style="grid-area: nav-button-up;"
              data-action="update"
              data-params='{ \"alias\": \"vote\", \"data\": { \"offset\": ${prevSlide} }}'
            >
              <button class="Vote-navButton Vote-navButton--prev" ${
                !offset ? "disabled" : ""
              }></button>
            </div>
            <div 
              class="Vote-area"
              data-nav="down"
              style="grid-area: nav-button-down;"
              data-action="update"
              data-params='{ \"alias\": \"vote\", \"data\": { \"offset\": ${nextSlide} }}'
            >
              <button class="Vote-navButton Vote-navButton--next" ${
                offset === nextSlide ? "disabled" : ""
              }></button>  
            </div>
        </div>
      </div>
    `;
  }
}

export default Vote;
