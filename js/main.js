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
    // CyberDefenders — official brand shield (Simple Icons)
    cyberdefenders:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.918 17.48c-.126 2.727-2.384 4.696-5.364 4.696H7.34v-6.123l-2.185-.957V24h8.381c4.334 0 7.549-2.962 7.549-6.881v-.163c-.65.235-1.372.415-2.167.524Zm1.355-9.501C18.611 4.313 17.726.989 15.432.213c-1.336-.452-2.005-.091-2.637.217-.199.09-.235.361-.072.505.361.307.813.687 1.336 1.174-1.95-1.138-7.333-2.835-7.874-.776-.488 1.86-1.319 4.587-1.319 4.587S.603 5.487.116 7.293c-.488 1.806 3.323 5.274 9.627 7.134 6.303 1.861 11.198 1.373 13.311-.921 2.113-2.294.072-5.473-2.781-5.527Zm-1.247.036c-.487.47-2.077 1.68-5.563 1.427-3.738-.271-6.809-2.474-7.604-3.088-.126-.091-.18-.235-.126-.398.054-.18.126-.469.253-.849.072-.234.343-.343.542-.216 1.571.903 4.1 2.221 6.791 2.402 2.402.163 3.847-.542 4.786-1.066.199-.108.452-.018.542.199l.47 1.156c.036.162.018.325-.091.433Z"/></svg>',
    // TryHackMe — official brand logo (Simple Icons)
    tryhackme:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a.625.625 0 1 0 0-1.25H4.761a3.273 3.273 0 0 1-3.27-3.27A3.273 3.273 0 0 1 6.59 7.08a.625.625 0 0 0 .7-1.035 4.488 4.488 0 0 0-1.68-.69 5.223 5.223 0 0 1 5.096-4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0-.488.305.625.625 0 1 0 .731 1.013 3.245 3.245 0 0 1 1.912-.616 3.278 3.278 0 0 1 3.203 2.61.625.625 0 0 0 1.225-.251 4.533 4.533 0 0 0-4.428-3.61 4.54 4.54 0 0 0-.958.105C16.556 2.328 13.9 0 10.705 0zm5.192 10.64a.925.925 0 0 0-.462.108.913.913 0 0 0-.313.29 1.27 1.27 0 0 0-.175.427 2.39 2.39 0 0 0-.054.514c0 .181.018.353.054.517.036.164.095.307.175.43a.899.899 0 0 0 .313.297c.127.073.281.11.462.11.18 0 .334-.037.46-.11a.897.897 0 0 0 .309-.296c.08-.124.137-.267.173-.431.036-.164.054-.336.054-.517 0-.18-.018-.352-.054-.514a1.271 1.271 0 0 0-.173-.426.901.901 0 0 0-.309-.291.917.917 0 0 0-.46-.108zm6.486 0a.925.925 0 0 0-.462.108.913.913 0 0 0-.313.29 1.27 1.27 0 0 0-.175.427 2.39 2.39 0 0 0-.053.514c0 .181.017.353.053.517.036.164.095.307.175.43a.899.899 0 0 0 .313.297c.127.073.281.11.462.11.18 0 .334-.037.46-.11a.897.897 0 0 0 .31-.296c.078-.124.136-.267.172-.431.036-.164.054-.336.054-.517 0-.18-.018-.352-.054-.514a1.271 1.271 0 0 0-.173-.426.901.901 0 0 0-.308-.291.916.916 0 0 0-.461-.108zm-8.537.068l-.84.618.313.43.476-.368v1.877h.603v-2.557zm6.486 0l-.841.618.314.43.477-.368v1.877h.603v-2.557zm-4.435.445c.08 0 .143.028.193.084.05.057.087.127.114.21.026.083.044.173.054.269a2.541 2.541 0 0 1 0 .533c-.01.097-.028.187-.054.27a.584.584 0 0 1-.114.21.243.243 0 0 1-.193.085.248.248 0 0 1-.195-.086.584.584 0 0 1-.118-.209 1.245 1.245 0 0 1-.056-.27 2.645 2.645 0 0 1 0-.533c.01-.096.029-.186.056-.27a.583.583 0 0 1 .118-.209.25.25 0 0 1 .195-.084zm6.486 0c.08 0 .144.028.193.084.05.057.087.127.114.21.027.083.044.173.054.269a2.541 2.541 0 0 1 0 .533c-.01.097-.027.187-.054.27a.584.584 0 0 1-.114.21.243.243 0 0 1-.193.085.249.249 0 0 1-.195-.086.581.581 0 0 1-.117-.209 1.245 1.245 0 0 1-.056-.27 2.642 2.642 0 0 1 0-.533c.01-.096.028-.186.056-.27a.58.58 0 0 1 .117-.209.25.25 0 0 1 .195-.084zm-2.191 3.51a.93.93 0 0 0-.463.109.908.908 0 0 0-.312.291c-.08.122-.139.263-.175.426a2.383 2.383 0 0 0-.054.514c0 .18.018.353.054.516.036.164.094.308.175.432a.91.91 0 0 0 .312.296.92.92 0 0 0 .463.11c.18 0 .333-.037.46-.11a.892.892 0 0 0 .308-.296 1.32 1.32 0 0 0 .174-.432c.036-.163.054-.335.054-.516 0-.18-.018-.352-.054-.514a1.274 1.274 0 0 0-.174-.426.89.89 0 0 0-.309-.291.918.918 0 0 0-.46-.108zm-6.402.07l-.841.617.314.43.476-.369v1.878h.604v-2.557zm2.125 0l-.841.617.314.43.477-.369v1.878h.603v-2.557zm2.116 0l-.84.617.313.43.477-.369v1.878h.603v-2.557zm2.16.443c.08 0 .144.028.194.085a.605.605 0 0 1 .114.21c.026.083.044.172.053.269a2.639 2.639 0 0 1 0 .532 1.28 1.28 0 0 1-.053.27.585.585 0 0 1-.114.21.244.244 0 0 1-.193.085.25.25 0 0 1-.196-.085.589.589 0 0 1-.117-.21 1.245 1.245 0 0 1-.056-.27 2.597 2.597 0 0 1 0-.532c.01-.097.028-.186.056-.27a.589.589 0 0 1 .117-.209.249.249 0 0 1 .196-.085zm-6.729 3.073a.676.676 0 0 0-.335.078.661.661 0 0 0-.227.211.91.91 0 0 0-.127.31c-.027.118-.04.242-.04.373s.013.256.04.375a.93.93 0 0 0 .127.313.65.65 0 0 0 .227.215c.092.053.204.08.335.08a.655.655 0 0 0 .334-.08.65.65 0 0 0 .225-.215c.057-.09.1-.194.125-.313a1.75 1.75 0 0 0 .04-.375c0-.13-.014-.255-.04-.373a.931.931 0 0 0-.125-.31.658.658 0 0 0-.225-.21.667.667 0 0 0-.334-.08zm3.086 0a.675.675 0 0 0-.336.078.661.661 0 0 0-.226.211.907.907 0 0 0-.127.31 1.69 1.69 0 0 0-.04.373c0 .131.013.256.04.375a.928.928 0 0 0 .127.313c.058.09.134.162.226.215.093.053.205.08.336.08a.655.655 0 0 0 .334-.08.65.65 0 0 0 .224-.215c.058-.09.1-.194.126-.313a1.752 1.752 0 0 0 0-.748.94.94 0 0 0-.126-.31.657.657 0 0 0-.224-.21.667.667 0 0 0-.334-.08zm5.108 0a.675.675 0 0 0-.336.078.661.661 0 0 0-.226.211.91.91 0 0 0-.127.31c-.027.118-.04.242-.04.373s.013.256.04.375a.931.931 0 0 0 .127.313c.058.09.134.162.226.215.093.053.205.08.336.08.13 0 .243-.027.334-.08a.65.65 0 0 0 .224-.215c.058-.09.1-.194.126-.313a1.75 1.75 0 0 0 .04-.375c0-.13-.014-.255-.04-.373a.943.943 0 0 0-.126-.31.657.657 0 0 0-.224-.21.668.668 0 0 0-.334-.08zm-6.658.05l-.61.448.227.311.346-.266v1.362h.438v-1.856zm3.068 0l-.61.448.227.311.346-.266v1.362h.438v-1.856zm5.108 0l-.611.448.228.311.346-.266v1.362h.438v-1.856zm-9.712.322c.058 0 .105.02.14.062a.421.421 0 0 1 .083.151.96.96 0 0 1 .04.196 1.932 1.932 0 0 1 0 .386.954.954 0 0 1-.04.197.421.421 0 0 1-.083.152.176.176 0 0 1-.14.061.18.18 0 0 1-.141-.06.427.427 0 0 1-.085-.153.887.887 0 0 1-.041-.197 1.96 1.96 0 0 1 0-.386.893.893 0 0 1 .04-.196.42.42 0 0 1 .086-.151.181.181 0 0 1 .141-.062zm3.086 0c.058 0 .104.02.14.062a.421.421 0 0 1 .082.151.94.94 0 0 1 .04.196 1.906 1.906 0 0 1 0 .386.93.93 0 0 1-.04.197.421.421 0 0 1-.082.152.176.176 0 0 1-.14.061.18.18 0 0 1-.141-.06.42.42 0 0 1-.086-.153.846.846 0 0 1-.04-.197 1.965 1.965 0 0 1-.011-.195c0-.057.004-.121.01-.191a.849.849 0 0 1 .041-.196.42.42 0 0 1 .086-.151.182.182 0 0 1 .141-.062zm5.108 0c.058 0 .104.02.14.062a.421.421 0 0 1 .082.151.92.92 0 0 1 .04.196 1.963 1.963 0 0 1 0 .386.943.943 0 0 1-.04.197.421.421 0 0 1-.082.152.177.177 0 0 1-.14.061.18.18 0 0 1-.142-.06.437.437 0 0 1-.085-.153.95.95 0 0 1-.04-.197 1.965 1.965 0 0 1-.011-.195c0-.057.004-.121.01-.191a.959.959 0 0 1 .04-.196.47.47 0 0 1 .086-.151.181.181 0 0 1 .142-.062zm-1.684 1.814a.675.675 0 0 0-.336.079.66.66 0 0 0-.227.21.91.91 0 0 0-.127.31 1.731 1.731 0 0 0 0 .748.939.939 0 0 0 .127.314c.059.09.134.162.227.215.093.053.205.08.336.08a.66.66 0 0 0 .334-.08.648.648 0 0 0 .224-.215c.058-.09.1-.195.126-.314a1.737 1.737 0 0 0-.001-.747.928.928 0 0 0-.125-.31.65.65 0 0 0-.224-.211.668.668 0 0 0-.334-.079zm3.063 0a.676.676 0 0 0-.336.079.664.664 0 0 0-.227.21.906.906 0 0 0-.127.31 1.74 1.74 0 0 0 0 .748.936.936 0 0 0 .127.314.66.66 0 0 0 .227.215c.092.053.204.08.336.08a.654.654 0 0 0 .334-.08.648.648 0 0 0 .223-.215c.058-.09.1-.195.126-.314a1.74 1.74 0 0 0 0-.747.928.928 0 0 0-.126-.31.65.65 0 0 0-.223-.211.666.666 0 0 0-.334-.079zm-1.545.05l-.611.448.228.312.346-.267v1.363h.438v-1.856zm-1.518.323c.057 0 .104.02.14.061a.42.42 0 0 1 .082.152.91.91 0 0 1 .04.195 1.966 1.966 0 0 1 0 .387.951.951 0 0 1-.04.197.421.421 0 0 1-.082.152.177.177 0 0 1-.14.06.18.18 0 0 1-.142-.06.428.428 0 0 1-.085-.152.914.914 0 0 1-.04-.197 1.96 1.96 0 0 1-.011-.195c0-.058.003-.122.01-.192a.923.923 0 0 1 .041-.195c.02-.06.048-.11.085-.152a.181.181 0 0 1 .142-.061zm3.063 0c.057 0 .104.02.14.061a.42.42 0 0 1 .082.152.94.94 0 0 1 .04.195 1.91 1.91 0 0 1 0 .387.93.93 0 0 1-.04.197.422.422 0 0 1-.083.152.175.175 0 0 1-.14.06.18.18 0 0 1-.141-.06.423.423 0 0 1-.085-.152.907.907 0 0 1-.04-.197 1.95 1.95 0 0 1 0-.387.915.915 0 0 1 .04-.195c.02-.06.048-.11.085-.152a.182.182 0 0 1 .142-.061zm-9.713.185a.465.465 0 0 0-.232.055.456.456 0 0 0-.157.146.627.627 0 0 0-.089.215 1.168 1.168 0 0 0-.027.259c0 .09.009.177.027.26a.648.648 0 0 0 .089.216c.04.063.093.112.157.149a.459.459 0 0 0 .232.056c.09 0 .168-.02.231-.056a.45.45 0 0 0 .156-.149.67.67 0 0 0 .087-.217 1.218 1.218 0 0 0 0-.518.647.647 0 0 0-.087-.215.448.448 0 0 0-.156-.146.458.458 0 0 0-.23-.055zm1.052.035l-.423.31.158.217.24-.185v.944h.303v-1.286zm-1.052.224c.04 0 .073.014.097.042a.284.284 0 0 1 .057.105.69.69 0 0 1 .028.136c.004.049.007.092.007.133 0 .04-.003.086-.007.135a.684.684 0 0 1-.028.136.285.285 0 0 1-.057.105.123.123 0 0 1-.097.043.125.125 0 0 1-.098-.043.298.298 0 0 1-.059-.105.612.612 0 0 1-.028-.136 1.39 1.39 0 0 1 0-.268.62.62 0 0 1 .028-.136.297.297 0 0 1 .06-.105.125.125 0 0 1 .097-.042zm3.775 1.394a.463.463 0 0 0-.232.054.452.452 0 0 0-.157.146.621.621 0 0 0-.088.214 1.19 1.19 0 0 0 0 .519.641.641 0 0 0 .088.217.46.46 0 0 0 .157.15.458.458 0 0 0 .232.054.454.454 0 0 0 .232-.055.45.45 0 0 0 .155-.149.664.664 0 0 0 .087-.217 1.189 1.189 0 0 0 0-.519.642.642 0 0 0-.087-.214.446.446 0 0 0-.155-.146.459.459 0 0 0-.232-.054zm1.052.034l-.423.31.158.216.24-.185v.945h.303V22.68zm-1.052.223c.04 0 .073.014.098.043a.3.3 0 0 1 .057.105.643.643 0 0 1 .027.135 1.31 1.31 0 0 1 0 .268.654.654 0 0 1-.027.137.307.307 0 0 1-.057.105.124.124 0 0 1-.098.042.125.125 0 0 1-.098-.042.293.293 0 0 1-.059-.105.618.618 0 0 1-.028-.137 1.364 1.364 0 0 1 0-.268.612.612 0 0 1 .028-.135.287.287 0 0 1 .06-.105.123.123 0 0 1 .097-.043z"/></svg>',
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
      if (p.links && p.links.article)
        links.push(`<a href="${esc(p.links.article)}">Article</a>`);

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

    buildFilters("#writeupFilters", WRITEUP_CATEGORIES, "#writeupsList .item");
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
    const trigger = $("#searchTrigger");
    if (trigger) trigger.addEventListener("click", open);
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
