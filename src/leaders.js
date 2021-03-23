import { isNumberOdd } from "./utils";

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

                    ${
                      rank === 1
                        ? /* html */ `
                      <div class="Leaders-user">
                        <div class="User-root" id="${id}">
                          <div class="User-emoji">
                            ${isActive ? "👍" : ""}
                          </div>
                          <img
                            class="User-avatar"
                            src="/assets/images/4x/${avatar}"
                          />
                          <div class="User-name">${name}</div>
                          <div class="User-value">${valueText}</div>
                        </div>
                        <div class="Leaders-userLine">5</div>
                      </div>
                    `
                        : ""
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
