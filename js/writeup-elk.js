/* ============================================================
   ELK Home SOC — interactive components.
   Vanilla JS, no dependencies. Same conventions as main.js.
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- architecture diagram node details ---------- */
  const NODE_INFO = {
    nginx: {
      title: "Nginx",
      text: "The web-facing component. Runs inside the environment and produces genuine access logs — source IP, HTTP method, request path, status code, bytes sent, user agent, timestamp. Because it is a real process rather than a generator, its telemetry is genuine application traffic that the pipeline must parse. Why it matters: web-scanning detection reads this stream for repeated 4xx responses against sensitive paths.",
    },
    flask: {
      title: "Flask",
      text: "A small application behind Nginx exposing controlled endpoints (health, products, cart, checkout, login, admin, error, slow). Emits structured JSON request events so application behavior can be analyzed alongside infrastructure telemetry. Its error endpoint exists specifically to exercise the application-health detection.",
    },
    ssh: {
      title: "SSH",
      text: "In simulation, a generator produces realistic authentication events — failed logins, success, and targeted-user patterns. An optional container can instead run a real sshd so the lab generates genuine authentication activity. Either way the downstream pipeline receives the same event shape, which is the point: the source can change without the backend caring.",
    },
    windows: {
      title: "Windows",
      text: "In simulation, a generator emits structured security events — chiefly 4624 (successful logon) and 4625 (failed logon). For real integration, Winlogbeat on an actual endpoint reads the Windows Event Log and ships it in. The indexed events in this article were produced by a Winlogbeat agent identifying as DC01-PROD, version 8.13.0.",
    },
    filebeat: {
      title: "Filebeat",
      text: "The collection agent for Linux, web and application-style logs. Tails log files and forwards events to Logstash. Runs on the source itself — inside a container in simulation, or on a real endpoint in real mode. It is the first point where raw bytes leave the source and enter the pipeline.",
    },
    winlogbeat: {
      title: "Winlogbeat",
      text: "The collection agent for Windows Event Logs. Reads events locally on the Windows host and ships them to Logstash. A reference winlogbeat.yml in the repository configures a real endpoint. The version pinned in the project (8.13.0) matches the agent that produced the real 4624/4625 evidence in this article.",
    },
    logstash: {
      title: "Logstash",
      text: "The processing layer and normalization boundary. Receives events from the Beats agents, parses raw lines into named fields, normalizes timestamps into @timestamp, converts string types to numeric, enriches IPs with geo context when available, and routes events to per-source indexes (logs-nginx-*, logs-windows-*, …) with alerts separated into security-detections-*. Everything downstream depends on decisions made here.",
    },
    es: {
      title: "Elasticsearch",
      text: "The storage and search layer. Stores processed events as indexed documents so analysts can query structured fields and aggregate across them — moving from raw events to patterns. This is the aggregation layer that powers detections: grouping failures by source.ip or counting 4625 events happens here.",
    },
    kibana: {
      title: "Kibana",
      text: "The analyst interface. Discover for event-level investigation, dashboards for a higher-level view. The workflow: identify an anomaly in a dashboard, then drop into Discover to investigate the underlying events. It is the front end of every investigation walkthrough in this article.",
    },
    detection: {
      title: "Detection engine",
      text: "Evaluates telemetry against security conditions and creates structured alerts stored separately in security-detections-*. Focuses on patterns — repeated failures, threshold crossings, failure-to-success sequences — rather than single events. An alert is itself a document: rule name, source IP, severity, timestamp, ready to be investigated like any other security event.",
    },
  };

  function initArchitecture() {
    const info = $("#elkNodeInfo");
    const title = $("#elkNodeTitle");
    const text = $("#elkNodeText");
    if (!info || !title || !text) return;

    $$(".elk-node[data-node]").forEach((node) => {
      node.addEventListener("click", () => {
        $$(".elk-node[data-node]").forEach((n) => n.classList.remove("active"));
        node.classList.add("active");
        const d = NODE_INFO[node.dataset.node];
        if (d) {
          title.textContent = d.title;
          text.textContent = d.text;
        }
      });
    });
  }

  /* ---------- deployment mode selector ---------- */
  function initModes() {
    const tabs = $$(".elk-mode-tab");
    const panels = $$(".elk-mode-panel");
    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.toggle("active", t === tab);
          t.setAttribute("aria-selected", String(t === tab));
        });
        panels.forEach((p) => {
          p.hidden = p.id !== tab.getAttribute("aria-controls");
          p.classList.toggle("active", p.id === tab.getAttribute("aria-controls"));
        });
      });
    });
  }

  /* ---------- logstash pipeline stages ---------- */
  function initPipeline() {
    const stages = $$(".elk-stage-btn");
    if (!stages.length) return;

    stages.forEach((btn) => {
      btn.addEventListener("click", () => {
        const control = btn.getAttribute("aria-controls");
        const panel = document.getElementById(control);
        const expanded = btn.getAttribute("aria-expanded") === "true";

        stages.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-expanded", "false");
        });
        $$(".elk-stageinfo").forEach((p) => (p.hidden = true));

        if (!expanded && panel) {
          btn.classList.add("active");
          btn.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  /* ---------- investigation timeline ---------- */
  function initTimeline() {
    const events = $$(".elk-event");
    if (!events.length) return;

    events.forEach((ev) => {
      ev.addEventListener("click", () => {
        const detail = document.getElementById(ev.getAttribute("aria-controls"));
        const expanded = ev.getAttribute("aria-expanded") === "true";
        ev.setAttribute("aria-expanded", String(!expanded));
        if (detail) detail.hidden = expanded;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initArchitecture();
    initModes();
    initPipeline();
    initTimeline();
  });
})();
