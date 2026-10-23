(function () {
  if (window.__enginesMarketStaticNavigationLoaded) return;
  window.__enginesMarketStaticNavigationLoaded = true;

  const CALL_NUMBER_DISPLAY = "020 3488 4649";
  const CALL_NUMBER_TEL = "tel:+442034884649";
  const WHATSAPP_URL = "https://wa.me/447311343662";
  const SITE_URL = "https://enginesmarket.co.uk";
  const DESKTOP_PREVIEW_COUNT = 10;

  const state = {
    navMenus: [],
    footerNavigation: [],
    openMenuId: null,
    activeBrandHref: "",
    brandsExpanded: false,
    mobileOpen: false,
    mobileStack: [{ type: "root" }],
    desktopQueries: {},
    mobileQueries: {},
    expandedGroups: {},
  };

  const refs = {
    header: null,
    desktopNav: null,
    desktopPanel: null,
    mobilePanel: null,
    menuButton: null,
    footer: null,
  };

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (typeof text === "string") element.textContent = text;
    return element;
  }

  function createLink(label, href, className) {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.textContent = label;
    if (className) anchor.className = className;
    return anchor;
  }

  function createPhoneIcon() {
    const icon = createElement("span", "em-static-icon", "");
    icon.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.63 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.44-1.29a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.64.63A2 2 0 0 1 22 16.92Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return icon;
  }

  function createWhatsappIcon() {
    const icon = createElement("span", "em-static-icon", "");
    icon.innerHTML =
      '<svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';
    return icon;
  }

  function createChevron(className, direction) {
    const icon = createElement("span", className, "");
    const path = direction === "right" ? "M7 5l5 5-5 5" : "M5 7l5 5 5-5";
    icon.innerHTML =
      '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="' + path + '"/></svg>';
    return icon;
  }

  function createLogo() {
    const logo = createLink("", "/", "em-static-logo");
    logo.setAttribute("aria-label", "Engines Market homepage");
    logo.innerHTML =
      '<img class="em-static-logo__image" src="/branding/engine-market-logo-header-tight.png" alt="Engines Market" width="3919" height="763">';
    return logo;
  }

  function makeGroupKey(scope, menuId, title) {
    return [scope, menuId, title].join("::");
  }

  function getExpanded(scope, menuId, title) {
    return Boolean(state.expandedGroups[makeGroupKey(scope, menuId, title)]);
  }

  function setExpanded(scope, menuId, title, value) {
    state.expandedGroups[makeGroupKey(scope, menuId, title)] = value;
  }

  function getQuery(scope, menuId) {
    const bag = scope === "desktop" ? state.desktopQueries : state.mobileQueries;
    return bag[menuId] || "";
  }

  function setQuery(scope, menuId, value) {
    const bag = scope === "desktop" ? state.desktopQueries : state.mobileQueries;
    bag[menuId] = value;
  }

  function closeDesktopMenu() {
    state.openMenuId = null;
    state.activeBrandHref = "";
    state.brandsExpanded = false;
    renderDesktopPanel();
  }

  function closeMobileMenu() {
    state.mobileOpen = false;
    state.mobileStack = [{ type: "root" }];
    renderMobilePanel();
  }

  function getMenu(menuId) {
    return state.navMenus.find((menu) => menu.id === menuId) || null;
  }

  function getFooterColumns() {
    return state.footerNavigation || [];
  }

  function ensureCanonicalLink() {
    const normalizedPath =
      window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/+$/, "");
    const canonicalHref =
      normalizedPath === "/" ? SITE_URL + "/" : SITE_URL + normalizedPath;
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalHref);
  }

  function buildBrandsPanel(menu) {
    const panel = createElement("div", "em-static-panel em-static-panel--brands");
    const visibleBrands =
      state.brandsExpanded || menu.brands.length <= DESKTOP_PREVIEW_COUNT
        ? menu.brands
        : menu.brands.slice(0, DESKTOP_PREVIEW_COUNT);

    if (!state.activeBrandHref || !menu.brands.some((brand) => brand.href === state.activeBrandHref)) {
      state.activeBrandHref = visibleBrands[0] ? visibleBrands[0].href : "";
    }

    const activeBrand = menu.brands.find((brand) => brand.href === state.activeBrandHref) || visibleBrands[0];
    const grid = createElement("div", "em-static-brand-grid");

    visibleBrands.forEach((brand, index) => {
      const item = createElement("div", "em-static-brand-item");
      if (activeBrand && activeBrand.href === brand.href) item.setAttribute("data-active", "true");

      const row = createElement("div", "em-static-brand-row");
      item.addEventListener("mouseenter", () => {
        if (state.activeBrandHref === brand.href) return;
        state.activeBrandHref = brand.href;
        renderDesktopPanel();
      });
      item.addEventListener("focusin", () => {
        if (state.activeBrandHref === brand.href) return;
        state.activeBrandHref = brand.href;
        renderDesktopPanel();
      });

      const label = createLink(brand.label, brand.href, "em-static-brand-link");
      label.addEventListener("click", closeDesktopMenu);

      const arrow = createChevron("em-static-brand-caret", "right");
      arrow.setAttribute("aria-hidden", "true");

      row.appendChild(label);
      row.appendChild(arrow);
      item.appendChild(row);

      if (activeBrand && activeBrand.href === brand.href) {
        item.appendChild(buildBrandFlyout(activeBrand, index % 4 >= 2));
      }
      grid.appendChild(item);
    });

    panel.appendChild(grid);

    if (menu.brands.length > DESKTOP_PREVIEW_COUNT) {
      const viewAll = createElement(
        "button",
        "em-static-panel-muted-link em-static-panel-button em-static-brands-view-all",
        state.brandsExpanded ? "Show less" : "View all (" + menu.brands.length + ")",
      );
      viewAll.type = "button";
      viewAll.addEventListener("click", () => {
        state.brandsExpanded = !state.brandsExpanded;
        renderDesktopPanel();
      });
      panel.appendChild(viewAll);
    }

    if (menu.footerLink) {
      const footer = createElement("div", "em-static-panel-footer");
      const link = createLink(menu.footerLink.label, menu.footerLink.href, "em-static-panel-muted-link");
      link.addEventListener("click", closeDesktopMenu);
      footer.appendChild(link);
      panel.appendChild(footer);
    }

    return panel;
  }

  function buildBrandFlyout(brand, openLeft) {
    const flyout = createElement(
      "div",
      "em-static-brand-flyout" + (openLeft ? " em-static-brand-flyout--left" : ""),
    );
    const models = brand.models || [];
    const variants = brand.variants || [];
    const overview = createLink(brand.label + " Overview", brand.href, "em-static-panel-muted-link");
    overview.addEventListener("click", closeDesktopMenu);
    flyout.appendChild(overview);

    if (!models.length && !variants.length) {
      flyout.appendChild(createElement("p", "em-static-panel-empty", "No model or variant pages listed yet."));
      return flyout;
    }

    const columns = createElement(
      "div",
      models.length && variants.length ? "em-static-brand-columns em-static-brand-columns--two" : "em-static-brand-columns",
    );
    if (models.length) columns.appendChild(buildLinkListBlock("Models (" + models.length + ")", models, "desktop"));
    if (variants.length) columns.appendChild(buildLinkListBlock("Variants (" + variants.length + ")", variants, "desktop"));
    flyout.appendChild(columns);
    return flyout;
  }

  function buildLinkListBlock(title, links, scope, menuId) {
    const block = createElement("div", "em-static-panel-group");
    const heading = createElement("p", "em-static-panel-group-title", title);
    const list = createElement("ul", "em-static-panel-list");

    (links || []).forEach((item) => {
      const row = createElement("li");
      const link = createLink(item.label, item.href, "em-static-panel-link");
      link.addEventListener("click", scope === "desktop" ? closeDesktopMenu : closeMobileMenu);
      row.appendChild(link);
      list.appendChild(row);
    });

    block.appendChild(heading);
    block.appendChild(list);

    if (menuId && links && links.length > DESKTOP_PREVIEW_COUNT) {
      block.setAttribute("data-menu-id", menuId);
    }

    return block;
  }

  function buildColumnsPanel(menu, scope) {
    const panel = createElement("div", "em-static-panel");
    const gridClass =
      menu.groups.length >= 4
        ? "em-static-panel-grid em-static-panel-grid--4"
        : "em-static-panel-grid em-static-panel-grid--3";
    const grid = createElement("div", gridClass);

    menu.groups.forEach((group) => {
      const block = createElement("div", "em-static-panel-group");
      const heading = createElement("p", "em-static-panel-group-title", group.title);
      block.appendChild(heading);

      const links = group.links || [];
      const expanded = getExpanded(scope, menu.id, group.title);
      const canExpand = links.length > DESKTOP_PREVIEW_COUNT;
      const visibleLinks = expanded || !canExpand ? links : links.slice(0, DESKTOP_PREVIEW_COUNT);
      const list = createElement("ul", "em-static-panel-list");

      visibleLinks.forEach((item) => {
        const row = createElement("li");
        const link = createLink(item.label, item.href, "em-static-panel-link");
        link.addEventListener("click", scope === "desktop" ? closeDesktopMenu : closeMobileMenu);
        row.appendChild(link);
        list.appendChild(row);
      });

      block.appendChild(list);

      if (canExpand) {
        const button = createElement(
          "button",
          "em-static-panel-muted-link em-static-panel-button",
          expanded ? "Show less" : "View all (" + links.length + ")",
        );
        button.type = "button";
        button.addEventListener("click", () => {
          setExpanded(scope, menu.id, group.title, !expanded);
          scope === "desktop" ? renderDesktopPanel() : renderMobilePanel();
        });
        block.appendChild(button);
      } else if (group.viewAll) {
        const viewAll = createLink(group.viewAll.label, group.viewAll.href, "em-static-panel-muted-link");
        viewAll.addEventListener("click", scope === "desktop" ? closeDesktopMenu : closeMobileMenu);
        block.appendChild(viewAll);
      }

      grid.appendChild(block);
    });

    panel.appendChild(grid);
    return panel;
  }

  function buildEnginesPanel(menu, scope) {
    const panel = createElement("div", "em-static-panel");
    const query = getQuery(scope, menu.id).trim().toLowerCase();
    const field = createElement("label", "em-static-panel-search");
    const input = createElement("input", "em-static-panel-search-input");
    input.type = "search";
    input.placeholder = "Search engines…";
    input.value = getQuery(scope, menu.id);
    input.addEventListener("input", (event) => {
      const value = event.target.value;
      const cursorPosition = event.target.selectionStart ?? value.length;
      setQuery(scope, menu.id, value);
      scope === "desktop" ? renderDesktopPanel() : renderMobilePanel();

      const panelRoot = scope === "desktop" ? refs.desktopPanel : refs.mobilePanel;
      const nextInput = panelRoot && panelRoot.querySelector(".em-static-panel-search-input");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
    field.appendChild(input);
    panel.appendChild(field);

    const filteredGroups = query
      ? menu.groups
          .map((group) => ({
            title: group.title,
            links: (group.links || []).filter(
              (link) => link.label.toLowerCase().includes(query) || link.href.toLowerCase().includes(query),
            ),
          }))
          .filter((group) => group.links.length)
      : menu.groups;

    if (!filteredGroups.length) {
      const emptyText =
        scope === "desktop" ? "No engines match “" + getQuery(scope, menu.id).trim() + "”." : "No engines match.";
      panel.appendChild(createElement("p", "em-static-panel-empty", emptyText));
      return panel;
    }

    const grid = createElement("div", "em-static-panel-grid em-static-panel-grid--4");
    filteredGroups.forEach((group) => {
      const block = createElement("div", "em-static-panel-group");
      const heading = createElement("p", "em-static-panel-group-title", group.title + " (" + group.links.length + ")");
      block.appendChild(heading);

      const searching = Boolean(query);
      const expanded = getExpanded(scope, menu.id, group.title);
      const canExpand = !searching && group.links.length > DESKTOP_PREVIEW_COUNT;
      const visibleLinks = searching || expanded || !canExpand ? group.links : group.links.slice(0, DESKTOP_PREVIEW_COUNT);
      const list = createElement("ul", "em-static-panel-list");

      visibleLinks.forEach((item) => {
        const row = createElement("li");
        const link = createLink(item.label, item.href, "em-static-panel-link");
        link.addEventListener("click", scope === "desktop" ? closeDesktopMenu : closeMobileMenu);
        row.appendChild(link);
        list.appendChild(row);
      });

      block.appendChild(list);

      if (canExpand) {
        const button = createElement(
          "button",
          "em-static-panel-muted-link em-static-panel-button",
          expanded ? "Show less" : "View all (" + group.links.length + ")",
        );
        button.type = "button";
        button.addEventListener("click", () => {
          setExpanded(scope, menu.id, group.title, !expanded);
          scope === "desktop" ? renderDesktopPanel() : renderMobilePanel();
        });
        block.appendChild(button);
      }

      grid.appendChild(block);
    });

    panel.appendChild(grid);
    return panel;
  }

  function renderDesktopNav() {
    if (!refs.desktopNav) return;
    refs.desktopNav.textContent = "";

    state.navMenus.forEach((menu) => {
      const item = createElement("div", "em-static-nav__item");
      const button = createElement("button", "em-static-nav__trigger");
      button.type = "button";
      button.setAttribute("aria-expanded", state.openMenuId === menu.id ? "true" : "false");
      button.setAttribute("aria-controls", "em-static-desktop-panel");
      button.appendChild(createElement("span", "", menu.label));
      button.appendChild(createChevron("em-static-nav__chevron", "down"));
      button.addEventListener("click", () => {
        state.openMenuId = state.openMenuId === menu.id ? null : menu.id;
        if (menu.id === "brands" && !state.activeBrandHref && menu.brands && menu.brands[0]) {
          state.activeBrandHref = menu.brands[0].href;
        }
        renderDesktopPanel();
        renderDesktopNav();
      });
      item.appendChild(button);
      refs.desktopNav.appendChild(item);
    });
  }

  function renderDesktopPanel() {
    if (!refs.desktopPanel) return;
    refs.desktopPanel.textContent = "";

    const openMenu = state.navMenus.find((menu) => menu.id === state.openMenuId);
    if (!openMenu) {
      refs.desktopPanel.removeAttribute("data-open");
      refs.desktopPanel.removeAttribute("data-menu-kind");
      return;
    }

    refs.desktopPanel.setAttribute("data-open", "true");
    refs.desktopPanel.setAttribute("data-menu-kind", openMenu.kind);

    if (openMenu.kind === "brands") {
      refs.desktopPanel.appendChild(buildBrandsPanel(openMenu));
      return;
    }

    if (openMenu.kind === "engines") {
      refs.desktopPanel.appendChild(buildEnginesPanel(openMenu, "desktop"));
      return;
    }

    refs.desktopPanel.appendChild(buildColumnsPanel(openMenu, "desktop"));
  }

  function renderMobileRoot(container) {
    const list = createElement("ul", "em-static-mobile-root");

    state.navMenus.forEach((menu) => {
      const row = createElement("li", "em-static-mobile-card");
      const button = createElement("button", "em-static-mobile-nav-button");
      button.type = "button";
      button.appendChild(createElement("span", "", menu.label));
      button.appendChild(createChevron("em-static-mobile-chevron", "right"));
      button.addEventListener("click", () => {
        state.mobileStack.push({ type: "menu", menuId: menu.id });
        renderMobilePanel();
      });
      row.appendChild(button);
      list.appendChild(row);
    });

    container.appendChild(list);
  }

  function renderMobileBrands(container, menu) {
    const box = createElement("div", "em-static-mobile-box");
    const back = createElement("button", "em-static-mobile-back", "← " + menu.label);
    back.type = "button";
    back.addEventListener("click", () => {
      state.mobileStack.pop();
      renderMobilePanel();
    });
    box.appendChild(back);

    menu.brands.forEach((brand) => {
      const row = createElement("div", "em-static-mobile-brand-row");
      const link = createLink(brand.label, brand.href, "em-static-mobile-brand-link");
      link.addEventListener("click", closeMobileMenu);
      row.appendChild(link);

      const button = createElement("button", "em-static-mobile-brand-button");
      button.type = "button";
      button.setAttribute("aria-label", "Open " + brand.label + " models and variants");
      button.appendChild(createChevron("em-static-mobile-chevron", "right"));
      button.addEventListener("click", () => {
        state.mobileStack.push({ type: "brand", menuId: menu.id, brandHref: brand.href });
        renderMobilePanel();
      });
      row.appendChild(button);
      box.appendChild(row);
    });

    if (menu.footerLink) {
      const footerLink = createLink(menu.footerLink.label, menu.footerLink.href, "em-static-mobile-footer-link");
      footerLink.addEventListener("click", closeMobileMenu);
      box.appendChild(footerLink);
    }

    container.appendChild(box);
  }

  function renderMobileBrandDetail(container, menu, frame) {
    const brand = menu.brands.find((item) => item.href === frame.brandHref);
    if (!brand) return;

    const box = createElement("div", "em-static-mobile-box");
    const back = createElement("button", "em-static-mobile-back", "← " + brand.label);
    back.type = "button";
    back.addEventListener("click", () => {
      state.mobileStack.pop();
      renderMobilePanel();
    });
    box.appendChild(back);

    const overview = createLink(brand.label + " Overview", brand.href, "em-static-mobile-footer-link");
    overview.addEventListener("click", closeMobileMenu);
    box.appendChild(overview);

    if (brand.models && brand.models.length) {
      box.appendChild(buildLinkListBlock("Models (" + brand.models.length + ")", brand.models, "mobile"));
    }

    if (brand.variants && brand.variants.length) {
      box.appendChild(buildLinkListBlock("Variants (" + brand.variants.length + ")", brand.variants, "mobile"));
    }

    if ((!brand.models || !brand.models.length) && (!brand.variants || !brand.variants.length)) {
      box.appendChild(createElement("p", "em-static-panel-empty", "No model or variant pages listed yet."));
    }

    container.appendChild(box);
  }

  function renderMobilePanel() {
    if (!refs.mobilePanel || !refs.header) return;
    refs.mobilePanel.textContent = "";
    refs.header.setAttribute("data-mobile-open", state.mobileOpen ? "true" : "false");
    if (refs.menuButton) {
      refs.menuButton.setAttribute("aria-expanded", state.mobileOpen ? "true" : "false");
      refs.menuButton.setAttribute(
        "aria-label",
        state.mobileOpen ? "Close navigation menu" : "Open navigation menu",
      );
      refs.menuButton.innerHTML = state.mobileOpen
        ? '<span class="em-static-menu__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>'
        : '<span class="em-static-menu__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>';
    }

    if (!state.mobileOpen) return;

    const frame = state.mobileStack[state.mobileStack.length - 1];
    const container = createElement("div", "em-static-mobile-shell");

    if (frame.type === "root") {
      renderMobileRoot(container);
      refs.mobilePanel.appendChild(container);
      return;
    }

    const menu = getMenu(frame.menuId);
    if (!menu) return;

    if (frame.type === "menu" && menu.kind === "brands") {
      renderMobileBrands(container, menu);
      refs.mobilePanel.appendChild(container);
      return;
    }

    if (frame.type === "brand" && menu.kind === "brands") {
      renderMobileBrandDetail(container, menu, frame);
      refs.mobilePanel.appendChild(container);
      return;
    }

    const box = createElement("div", "em-static-mobile-box");
    const back = createElement("button", "em-static-mobile-back", "← " + menu.label);
    back.type = "button";
    back.addEventListener("click", () => {
      state.mobileStack.pop();
      renderMobilePanel();
    });
    box.appendChild(back);

    if (menu.kind === "engines") {
      box.appendChild(buildEnginesPanel(menu, "mobile"));
    } else {
      box.appendChild(buildColumnsPanel(menu, "mobile"));
    }

    container.appendChild(box);
    refs.mobilePanel.appendChild(container);
  }

  function renderFooter() {
    if (!refs.footer) return;
    refs.footer.textContent = "";

    const inner = createElement("div", "em-static-footer__inner");

    const brand = createElement("div", "em-static-footer__brand");
    brand.appendChild(createLogo());
    brand.appendChild(
      createElement(
        "p",
        "",
        "Compare replacement, used and reconditioned engine options from trusted UK specialists.",
      ),
    );

    const contact = createElement("div", "em-static-footer__contact");
    contact.appendChild(createLink("Call " + CALL_NUMBER_DISPLAY, CALL_NUMBER_TEL));
    contact.appendChild(createLink("WhatsApp 07311 343662", WHATSAPP_URL));
    contact.appendChild(createLink("Get a quote", "/get-a-quote"));
    brand.appendChild(contact);
    inner.appendChild(brand);

    const desktopNav = createElement("nav", "em-static-footer__desktop-nav");
    desktopNav.setAttribute("aria-label", "Footer navigation");
    const mobileNav = createElement("nav", "em-static-footer__mobile-nav");
    mobileNav.setAttribute("aria-label", "Footer navigation");

    getFooterColumns().forEach((column) => {
      const desktopBlock = createElement("div");
      const heading = createElement("h2", "", column.label || column.title);
      const list = createElement("ul");
      (column.links || []).forEach((item) => {
        const row = createElement("li");
        row.appendChild(createLink(item.label, item.href));
        list.appendChild(row);
      });

      desktopBlock.appendChild(heading);
      desktopBlock.appendChild(list);
      desktopNav.appendChild(desktopBlock);

      const details = createElement("details", "em-static-footer__mobile-group");
      const summary = createElement("summary", "em-static-footer__mobile-summary");
      summary.appendChild(createElement("span", "", column.label || column.title));
      summary.appendChild(createChevron("em-static-footer__mobile-chevron", "down"));
      details.appendChild(summary);

      const mobilePanel = createElement("div", "em-static-footer__mobile-panel");
      const mobileList = createElement("ul", "em-static-footer__mobile-list");
      (column.links || []).forEach((item) => {
        const row = createElement("li");
        row.appendChild(createLink(item.label, item.href));
        mobileList.appendChild(row);
      });
      mobilePanel.appendChild(mobileList);
      details.appendChild(mobilePanel);
      mobileNav.appendChild(details);
    });

    inner.appendChild(desktopNav);
    inner.appendChild(mobileNav);
    refs.footer.appendChild(inner);

    const bottom = createElement(
      "div",
      "em-static-footer__bottom",
      "Copyright " + new Date().getFullYear() + " Engines Market. All rights reserved.",
    );
    refs.footer.appendChild(bottom);
  }

  function createHeader() {
    const header = createElement("header", "em-static-header");
    const inner = createElement("div", "em-static-header__inner");

    inner.appendChild(createLogo());

    const desktopNavWrap = createElement("div", "em-static-nav-wrap");
    refs.desktopNav = createElement("nav", "em-static-nav");
    refs.desktopNav.setAttribute("aria-label", "Primary navigation");
    desktopNavWrap.appendChild(refs.desktopNav);
    inner.appendChild(desktopNavWrap);

    const actions = createElement("div", "em-static-actions");
    actions.appendChild(createLink(CALL_NUMBER_DISPLAY, CALL_NUMBER_TEL));
    const whatsapp = createLink("", WHATSAPP_URL, "em-static-whatsapp");
    whatsapp.target = "_blank";
    whatsapp.rel = "noreferrer";
    whatsapp.setAttribute("aria-label", "Chat on WhatsApp");
    whatsapp.appendChild(createWhatsappIcon());
    whatsapp.appendChild(createElement("span", "", "WhatsApp"));
    actions.appendChild(whatsapp);
    inner.appendChild(actions);

    const mobileActions = createElement("div", "em-static-mobile-actions");
    const mobileCall = createLink("", CALL_NUMBER_TEL, "em-static-mobile-icon-button");
    mobileCall.setAttribute("aria-label", "Call Engines Market");
    mobileCall.appendChild(createPhoneIcon());
    mobileActions.appendChild(mobileCall);

    const mobileWhatsapp = createLink("", WHATSAPP_URL, "em-static-mobile-icon-button em-static-mobile-whatsapp");
    mobileWhatsapp.setAttribute("aria-label", "Chat on WhatsApp");
    mobileWhatsapp.target = "_blank";
    mobileWhatsapp.rel = "noreferrer";
    mobileWhatsapp.appendChild(createWhatsappIcon());
    mobileActions.appendChild(mobileWhatsapp);

    const menuButton = createElement("button", "em-static-menu");
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "em-static-mobile-nav");
    menuButton.innerHTML = '<span class="em-static-menu__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>';
    menuButton.addEventListener("click", () => {
      state.mobileOpen = !state.mobileOpen;
      if (!state.mobileOpen) state.mobileStack = [{ type: "root" }];
      renderMobilePanel();
    });
    mobileActions.appendChild(menuButton);
    inner.appendChild(mobileActions);
    refs.menuButton = menuButton;

    refs.desktopPanel = createElement("div", "em-static-desktop-panel");
    refs.desktopPanel.id = "em-static-desktop-panel";
    refs.mobilePanel = createElement("div", "em-static-mobile-panel");
    refs.mobilePanel.id = "em-static-mobile-nav";
    desktopNavWrap.appendChild(refs.desktopPanel);

    header.appendChild(inner);
    header.appendChild(refs.mobilePanel);
    refs.header = header;
    return header;
  }

  function createFooter() {
    refs.footer = createElement("footer", "em-static-footer");
    return refs.footer;
  }

  async function loadNavData() {
    const response = await fetch("/api/static-nav", { credentials: "same-origin" });
    if (!response.ok) throw new Error("Failed to load static nav data.");
    const payload = await response.json();
    if (!payload || !Array.isArray(payload.navMenus)) throw new Error("Invalid static nav payload.");
    return payload;
  }

  function bindGlobalEvents() {
    document.addEventListener("pointerdown", (event) => {
      if (refs.header && !refs.header.contains(event.target)) {
        closeDesktopMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDesktopMenu();
        if (state.mobileOpen) closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024 && state.mobileOpen) {
        closeMobileMenu();
      }
    });
  }

  async function init() {
    if (document.querySelector(".em-static-header")) return;

    document.body.insertBefore(createHeader(), document.body.firstChild);
    document.body.appendChild(createFooter());
    bindGlobalEvents();
    ensureCanonicalLink();

    try {
      const payload = await loadNavData();
      state.navMenus = payload.navMenus;
      state.footerNavigation = Array.isArray(payload.footerNavigation) ? payload.footerNavigation : [];
    } catch (error) {
      console.error(error);
      return;
    }

    renderDesktopNav();
    renderDesktopPanel();
    renderMobilePanel();
    renderFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
