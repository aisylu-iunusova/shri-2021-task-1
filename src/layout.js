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

export default Layout;
