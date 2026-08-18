/* ============================================================
   Rendering + interactions. You shouldn't need to edit this —
   all content lives in js/data.js
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  const pad = (n) => String(n).padStart(2, "0");
  const ext = (url) =>
    url && url !== "#" ? ' target="_blank" rel="noopener noreferrer"' : "";

  /* Escapes, then turns [[bracketed text]] into a redaction bar. */
  const marked = (s) =>
    esc(s).replace(
      /\[\[(.+?)\]\]/g,
      (_, t) =>
        `<span class="redact" tabindex="0" role="button" title="Reveal">${t}</span>`
    );

  /* Social marks — stroke/fill use currentColor so they inherit the bar. */
  const SOCIAL_ICON = {
    github:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4z"/></svg>',
    // CyberDefenders — shield with a check: blue-team defence
    cyberdefenders:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7 4.6 5.6v6c0 4.4 3.1 8.2 7.4 9.7 4.3-1.5 7.4-5.3 7.4-9.7v-6z"/><path d="m8.9 11.9 2.2 2.2 4-4.3"/></svg>',
    // TryHackMe — plain shield
    tryhackme:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7 4.6 5.6v6c0 4.4 3.1 8.2 7.4 9.7 4.3-1.5 7.4-5.3 7.4-9.7v-6z"/><path d="M12 8.2v7.6M8.6 12h6.8"/></svg>',
    // CTFtime — the flag
    ctftime:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5.6 21.4V3M5.6 3.6h12.2l-2.3 4 2.3 4H5.6"/></svg>',
    discord:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.3 5.9a16 16 0 0 0-4-1.2l-.25.5a12 12 0 0 1 3.5 1.7 11 11 0 0 0-9.1 0 12 12 0 0 1 3.5-1.7l-.25-.5a16 16 0 0 0-4 1.2C5.2 9.5 4.5 13 4.9 16.5a16 16 0 0 0 4.9 2.4l1-1.7a10 10 0 0 1-1.6-.8l.4-.3a11 11 0 0 0 9 0l.4.3a10 10 0 0 1-1.6.8l1 1.7a16 16 0 0 0 4.9-2.4c.45-4-.65-7.5-2.9-10.6M9.7 14.6c-.95 0-1.75-.85-1.75-1.9s.78-1.9 1.75-1.9 1.76.86 1.74 1.9c0 1.05-.78 1.9-1.74 1.9m6.6 0c-.95 0-1.75-.85-1.75-1.9s.78-1.9 1.75-1.9 1.76.86 1.74 1.9c0 1.05-.78 1.9-1.74 1.9"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none"/></svg>',
  };

  /* Order shown in the top bar. */
  const SOCIAL_ORDER = [
    ["github", "GitHub"],
    ["linkedin", "LinkedIn"],
    ["cyberdefenders", "CyberDefenders"],
    ["tryhackme", "TryHackMe"],
    ["ctftime", "CTFtime"],
    ["discord", "Discord"],
    ["instagram", "Instagram"],
  ];

  function renderTopSocials() {
    const left = $("#topSocialsLeft");
    const right = $("#topSocialsRight");
    if (!left || !right) return;

    const L = PROFILE.links || {};
    const active = SOCIAL_ORDER.filter(([k]) => L[k]);

    const mark = ([k, label]) =>
      `<li><a href="${esc(L[k])}"${ext(L[k])} aria-label="${esc(
        label
      )}" title="${esc(label)}">${SOCIAL_ICON[k]}</a></li>`;

    // split around the logo — the extra one goes left when the count is odd
    const half = Math.ceil(active.length / 2);
    left.innerHTML = active.slice(0, half).map(mark).join("");
    right.innerHTML = active.slice(half).map(mark).join("");
  }

  /* ---------------- opening ---------------- */
  function renderProfile() {
    $("#statement").textContent = PROFILE.statement || PROFILE.role;
    $("#tagline").textContent = PROFILE.tagline;
    document.title = `${PROFILE.name} — Cybersecurity & Backend`;

    $("#aboutText").innerHTML = PROFILE.about
      .map((p) => `<p>${marked(p)}</p>`)
      .join("");

    // tapping a redaction reveals it on touch, where :hover doesn't exist
    $$(".redact").forEach((r) =>
      r.addEventListener("click", () => r.classList.toggle("open"))
    );

    const mail = $("#contactMail");
    mail.href = `mailto:${PROFILE.email}`;
    mail.textContent = PROFILE.email;

    const L = PROFILE.links || {};
    $("#socials").innerHTML = SOCIAL_ORDER.filter(([k]) => L[k])
      .map(
        ([k, label]) =>
          `<li><a href="${esc(L[k])}"${ext(L[k])}>${esc(label)}</a></li>`
      )
      .join("");

    $("#footerLeft").textContent = `© ${new Date().getFullYear()} ${PROFILE.name}`;
  }

  /* The page's sections, in order. Used by the contents list and search. */
  const SECTIONS = [
    ["About", "#top"],
    ["Writing", "#writing"],
    ["Selected work", "#work"],
    ["CTF results", "#ctf"],
    ["Toolkit", "#toolkit"],
    ["Contact", "#contact"],
  ];

  /* ---------------- landing ---------------- */
  function renderHero() {
    const h = PROFILE.hero || {};
    if (h.src) {
      const media = $("#heroMedia");
      media.style.backgroundImage = `url("${h.src}")`;
      if (h.position) media.style.backgroundPosition = h.position;
    }

    if (typeof QUOTES !== "undefined" && QUOTES.length)
      $("#quoteText").textContent = QUOTES[0].text;
  }

  /* ---------------- work ---------------- */
  function renderProjects() {
    $("#projectsList").innerHTML = PROJECTS.map((p, i) => {
      const links = [];
      if (p.links && p.links.repo)
        links.push(`<a href="${esc(p.links.repo)}"${ext(p.links.repo)}>Source</a>`);
      if (p.links && p.links.demo)
        links.push(`<a href="${esc(p.links.demo)}"${ext(p.links.demo)}>Live</a>`);

      const live = /shipped|live|complete/i.test(p.status || "");

      return `
      <li class="entry" data-tags="${esc((p.tags || []).join("|"))}">
        <div class="entry-in">
          <span class="entry-num">${pad(i + 1)}</span>
          <div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.blurb)}</p>
            <div class="stack">${(p.stack || [])
              .map((s) => `<span>${esc(s)}</span>`)
              .join("")}</div>
            ${links.length ? `<div class="entry-links">${links.join("")}</div>` : ""}
          </div>
          ${
            p.status
              ? `<span class="status${live ? " live" : ""}">${esc(p.status)}</span>`
              : "<span></span>"
          }
        </div>
      </li>`;
    }).join("");

    const tags = [...new Set(PROJECTS.flatMap((p) => p.tags || []))];
    buildFilters("#projectFilters", tags, "#projectsList .entry");
  }

  /* ---------------- writing ---------------- */
  function fmtDate(d) {
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    const p = (n) => String(n).padStart(2, "0");
    return `${dt.getFullYear()}.${p(dt.getMonth() + 1)}.${p(dt.getDate())}`;
  }

  function renderWriteups() {
    const sorted = [...WRITEUPS].sort((a, b) => new Date(b.date) - new Date(a.date));

    $("#writeupsList").innerHTML = sorted
      .map(
        (w) => `
      <li class="item" data-tags="${esc(w.category)}">
        <a href="${esc(w.url)}"${ext(w.url)}>
          <span class="date">${esc(fmtDate(w.date))}</span>
          <span>
            <span class="cat">${esc(w.category)}</span>
            ${
              w.severity
                ? `<span class="sev s-${esc(
                    w.severity.toLowerCase()
                  )}">${esc(w.severity)}</span>`
                : ""
            }
          </span>
          <span>
            <h3>${esc(w.title)}</h3>
            <p>${esc(w.summary)}</p>
            <span class="tagrow">
              ${(w.tags || [])
                .map((t) => `<span class="tag">${esc(t)}</span>`)
                .join("")}
            </span>
          </span>
          <span class="read">${esc(w.readTime || "")}</span>
        </a>
      </li>`
      )
      .join("");

    const cats = [...new Set(WRITEUPS.map((w) => w.category))];
    buildFilters("#writeupFilters", cats, "#writeupsList .item");
  }

  /* ---------------- ctf ---------------- */
  function renderCTF() {
    $("#ctfList").innerHTML = CTFS.map(
      (c) => `
      <li class="result${c.highlight ? " win" : ""}">
        <div class="result-in">
          <span class="place">${esc(c.placement)}</span>
          <div>
            <h3>${esc(c.event)}</h3>
            <div class="meta">${c.team ? `<span>${esc(c.team)}</span>` : ""}</div>
            ${c.note ? `<p>${esc(c.note)}</p>` : ""}
          </div>
          <span class="result-side">
            ${c.highlight ? `<span class="stamp">${esc(c.placement)} Place</span>` : ""}
            <span class="year">${esc(c.year)}</span>
          </span>
        </div>
      </li>`
    ).join("");
  }

  /* ---------------- toolkit ---------------- */
  function renderSkills() {
    $("#skillsList").innerHTML = SKILLS.map(
      (g) => `
      <section class="tk">
        <h3>${esc(g.title)}</h3>
        <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </section>`
    ).join("");
  }

  /* ---------------- credentials ---------------- */
  function renderCreds() {
    if (typeof CREDENTIALS === "undefined" || !CREDENTIALS.length) return;
    $("#credentials").hidden = false;
    $("#credsList").innerHTML = CREDENTIALS.map(
      (c) => `
      <li class="result">
        <div class="result-in">
          <span></span>
          <div>
            <h3>${esc(c.title)}</h3>
            <div class="meta"><span>${esc(c.issuer)}</span></div>
            ${c.note ? `<p>${esc(c.note)}</p>` : ""}
          </div>
          <span class="year">${esc(c.period)}</span>
        </div>
      </li>`
    ).join("");
  }

  /* ---------------- filters ---------------- */
  function buildFilters(mount, tags, itemSel) {
    const el = $(mount);
    if (!el) return;
    if (tags.length < 2) {
      el.remove();
      return;
    }
    el.innerHTML = ["All", ...tags]
      .map(
        (t, i) =>
          `<button class="filter${i === 0 ? " active" : ""}" role="tab" aria-selected="${
            i === 0
          }" data-tag="${esc(t)}">${esc(t)}</button>`
      )
      .join("");

    el.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", el).forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", String(on));
      });
      const tag = btn.dataset.tag;
      $$(itemSel).forEach((item) => {
        const t = (item.dataset.tags || "").split("|");
        item.hidden = !(tag === "All" || t.includes(tag));
      });
    });
  }

  /* ---------------- quick search ---------------- */
  function initPalette() {
    const root = $("#palette");
    const input = $("#paletteInput");
    const list = $("#paletteResults");
    if (!root || !input || !list) return;

    const index = [
      ...SECTIONS.map(([label, href]) => ({ kind: "Section", label, href })),
      ...PROJECTS.map((p) => ({
        kind: "Work",
        label: p.title,
        href: (p.links && p.links.repo) || "#work",
        terms: (p.tags || []).concat(p.stack || []).join(" "),
      })),
      ...WRITEUPS.map((w) => ({
        kind: "Writing",
        label: w.title,
        href: w.url && w.url !== "#" ? w.url : "#writing",
        terms: `${w.category} ${w.event} ${w.severity || ""}`,
      })),
      ...CTFS.map((c) => ({
        kind: "CTF",
        label: `${c.event} — ${c.placement}`,
        href: "#ctf",
        terms: `${c.year} ${c.team || ""}`,
      })),
    ];

    let hits = [];
    let sel = 0;

    function render() {
      if (!hits.length) {
        list.innerHTML = `<li class="palette-empty">No matches.</li>`;
        return;
      }
      list.innerHTML = hits
        .map(
          (h, i) => `
        <li class="${i === sel ? "sel" : ""}">
          <a href="${esc(h.href)}"${ext(h.href)}>
            <span class="kind">${esc(h.kind)}</span>
            <span class="label">${esc(h.label)}</span>
          </a>
        </li>`
        )
        .join("");
      const cur = list.children[sel];
      if (cur) cur.scrollIntoView({ block: "nearest" });
    }

    function search(q) {
      const s = q.trim().toLowerCase();
      hits = !s
        ? index.slice(0, 8)
        : index.filter((h) =>
            `${h.label} ${h.kind} ${h.terms || ""}`.toLowerCase().includes(s)
          );
      sel = 0;
      render();
    }

    function open() {
      root.hidden = false;
      input.value = "";
      search("");
      input.focus();
    }
    function close() {
      root.hidden = true;
      input.blur();
    }

    root.addEventListener("click", (e) => {
      if (e.target === root) close();
    });
    input.addEventListener("input", () => search(input.value));

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!hits.length) return;
        sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + hits.length) % hits.length;
        render();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const a = list.querySelector("li.sel a");
        if (a) {
          close();
          a.click();
        }
      } else if (e.key === "Escape") {
        close();
      }
    });

    document.addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
      if (!root.hidden) return;
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key === "k")) {
        e.preventDefault();
        open();
      }
    });
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderTopSocials();
    renderHero();
    renderProjects();
    renderWriteups();
    renderCTF();
    renderSkills();
    renderCreds();
    initPalette();
  });
})();
