class Leaders {
  userLength = 5;

  device() {
    if (window.innerWidth <= 567) {
      this.userLength = 3;
    }
  }

  preparedUsers({ users, selectedUserId }, length) {
    const result = [];

    users.forEach((user, index) => {
      index < length && result.push(user);

      if (user.id === selectedUserId && index > length - 1) {
        result.pop();
        result.push(user);
      }
    });

    return result;
  }

  template(data) {
    const { emoji, selectedUserId } = data;
    const users = this.preparedUsers(data, this.userLength);

    return /* html */ `
      <div class="Leaders-root">
        <div class="Leaders-charts">
          ${users
            .slice(0, this.userLength)
            .map((user, index) => {
              const { id, avatar, name, valueText } = user;
              const isActive = index === 0;
              const rank = index + 1;
              const selected = id === selectedUserId;
              const selectUser =
                rank === 1 &&
                data.users[this.userLength - 1].id !==
                  users[this.userLength - 1].id &&
                users[this.userLength - 1];

              return /* html */ `
                <div class="Leaders-chart" style="grid-area: rank_${rank};z-index: ${
                this.userLength - index
              }" data-rank="${rank}">
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
                    
                    ${
                      selectUser
                        ? /* html */ `
                          <div class="Leaders-user">
                            <div class="User-root" id="${selectUser.id}">
                              <div class="User-emoji">
                                👍
                              </div>
                              <img
                                class="User-avatar"
                                src="/assets/images/4x/${selectUser.avatar}"
                              />
                              <div class="User-name">${selectUser.name}</div>
                              <div class="User-value">${selectUser.valueText}</div>
                            </div>
                            <div class="Leaders-userLine">5</div>
                          </div>
                        `
                        : ``
                    }
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

export default Leaders;
