const TARGETS = [
  { key: "auth", label: "SAT Auth", url: "https://cfdiau.sat.gob.mx/" },
  { key: "portal", label: "Portal SAT", url: "https://portalcfdi.facturaelectronica.sat.gob.mx/" },
  { key: "descarga", label: "Descarga XML", url: "https://descargamasiva.sat.gob.mx/" },
  { key: "qr", label: "Consulta CFDI", url: "https://consultaqr.facturaelectronica.sat.gob.mx/" }
];

const TIMEOUT_MS = 8000;
const MIN_BASELINE_MS = 800;      // evita falsos positivos por respuestas absurdamente bajas
const WARN_VARIATION = 0.30;      // +30%
const HARD_WARN_MS = 4000;        // aunque baseline sea rara, arriba de esto ya es warning
const HARD_DOWN_HTTP = 500;

function isoLocalMX(date = new Date()) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/Mexico_City"
  }).format(date);
}

async function probe(url) {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "Expiriti-SAT-Monitor/1.0"
      }
    });

    clearTimeout(timeout);

    return {
      ok: res.ok,
      status: res.status,
      ms: Date.now() - started
    };
  } catch (err) {
    clearTimeout(timeout);
    return {
      ok: false,
      status: 0,
      ms: null
    };
  }
}

function classify(result, baselineMs) {
  if (!result.ok || result.status >= HARD_DOWN_HTTP || result.ms == null) {
    return { status: "down", detail: "Caído" };
  }

  const safeBaseline = Math.max(Number(baselineMs || 0), MIN_BASELINE_MS);
  const variation = safeBaseline > 0 ? (result.ms - safeBaseline) / safeBaseline : 0;

  if (result.ms >= HARD_WARN_MS || variation >= WARN_VARIATION) {
    return { status: "warn", detail: "Lento" };
  }

  return { status: "ok", detail: "OK" };
}

function overallFrom(services) {
  if (services.some(s => s.status === "down")) return "down";
  if (services.some(s => s.status === "warn")) return "warn";
  return "ok";
}

async function runMonitor(env) {
  const baseline = (await env.SAT_MONITOR.get("baseline", "json")) || {};
  const previous = (await env.SAT_MONITOR.get("latest", "json")) || null;

  const measured = [];
  for (const target of TARGETS) {
    const result = await probe(target.url);
    const baseMs = baseline[target.key]?.ms ?? previous?.metrics?.[target.key]?.ms ?? MIN_BASELINE_MS;
    const decision = classify(result, baseMs);

    measured.push({
      key: target.key,
      label: target.label,
      status: decision.status,
      detail: decision.detail,
      ms: result.ms,
      http: result.status
    });
  }

  const payload = {
    overall: overallFrom(measured),
    checked_at: isoLocalMX(),
    services: [
      measured.find(x => x.key === "auth"),
      { key: "timbrado", label: "Timbrado PAC", status: "ok", detail: "OK", ms: null, http: 200 },
      measured.find(x => x.key === "descarga"),
      measured.find(x => x.key === "portal"),
      measured.find(x => x.key === "qr")
    ].filter(Boolean),
    metrics: Object.fromEntries(
      measured.map(x => [x.key, { ms: x.ms, http: x.http }])
    ),
    source: "worker"
  };

  // baseline simple: promedio móvil suave
  const nextBaseline = {};
  for (const item of measured) {
    const prevBase = baseline[item.key]?.ms ?? item.ms ?? MIN_BASELINE_MS;
    const curr = item.ms ?? prevBase;
    nextBaseline[item.key] = {
      ms: Math.round(prevBase * 0.7 + curr * 0.3)
    };
  }

  await env.SAT_MONITOR.put("latest", JSON.stringify(payload));
  await env.SAT_MONITOR.put("baseline", JSON.stringify(nextBaseline));

  return payload;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/sat-status") {
      const force = url.searchParams.get("force") === "1";

      if (force) {
        const fresh = await runMonitor(env);
        return Response.json(fresh, {
          headers: {
            "cache-control": "no-store",
            "access-control-allow-origin": "*"
          }
        });
      }

      const latest = await env.SAT_MONITOR.get("latest", "json");
      if (latest) {
        return Response.json(latest, {
          headers: {
            "cache-control": "no-store",
            "access-control-allow-origin": "*"
          }
        });
      }

      const fresh = await runMonitor(env);
      return Response.json(fresh, {
        headers: {
          "cache-control": "no-store",
          "access-control-allow-origin": "*"
        }
      });
    }

    return new Response("Not found", { status: 404 });
  },

  async scheduled(_event, env, _ctx) {
    await runMonitor(env);
  }
};


