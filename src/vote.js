import { getApp } from "./utils";

class Vote {
  defaultSlide = getApp() === "mobile" ? 8 : 6;

  template({ users, selectedUserId, offset = 0 }) {
    let prevSlide = offset && offset - this.defaultSlide;
    let nextSlide = offset + this.defaultSlide;

    return /* html */ `
      <div class="Vote-root">
        <div class="Vote-areas">
            ${users
              .slice(offset, offset + this.defaultSlide)
              .map(({ id, avatar, name }, index) => {
                const isActive = selectedUserId === id;

                return /* html */ `
                <div class="Vote-area" data-action="update" data-params='{ \"alias\": \"leaders\", \"data\": { \"selectedUserId\": ${id} }}' style="grid-area: area${
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

            <div class="Vote-area" data-nav="up" style="grid-area: nav-button-up;">
              <button class="Vote-navButton Vote-navButton--prev" disabled="${
                !offset ? "true" : "false"
              }" data-action="update" data-params='{ \"alias\": \"leaders\", \"data\": { \"offset\": ${prevSlide} }}' ></button>
            </div>
            <div class="Vote-area" data-nav="down" style="grid-area: nav-button-down;">
              <button class="Vote-navButton Vote-navButton--next" disabled="${
                users.length <= nextSlide ? "true" : "false"
              }" data-action="update" data-params='{ \"alias\": \"leaders\", \"data\": { \"offset\": ${nextSlide} }}'></button>  
            </div>
        </div>
      </div>
    `;
  }
}

export default Vote;
