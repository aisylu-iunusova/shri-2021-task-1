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

            <div class="Vote-area" data-nav="up" style="grid-area: nav1;">
                <button class="Vote-navButton Vote-navButton--prev" disabled>
                </button>
            </div>
            <div class="Vote-area" data-nav="down" style="grid-area: nav2;">
                <button class="Vote-navButton Vote-navButton--next">
                </button>  
            </div>
        </div>
      </div>
    `;
  }
}

export default Vote;
