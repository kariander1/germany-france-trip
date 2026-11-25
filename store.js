// Ticks & notes, saved on this device and (optionally) synced between phones through a private GitHub Gist.
// Every value carries a timestamp; on sync the newest value per item wins.
(function () {
  const KEY = `trip_state`, SKEY = `trip_sync`, FILE = `trip-state.json`, API = `https://api.github.com/gists`;
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  let st = load(KEY, null);
  if (!st) { // migrate the old per-device ticks
    st = { done: {}, notes: {} };
    const old = load(`trip_done`, {}); for (const k in old) st.done[k] = { v: 1, t: 1 };
    save(KEY, st);
  }
  st.done = st.done || {}; st.notes = st.notes || {};

  // ?sync link: #sync=<gistId>.<token>
  const m = location.hash.match(/sync=([0-9a-f]+)\.([\w-]+)/i);
  if (m) {
    save(SKEY, { gist: m[1], token: m[2] });
    history.replaceState(null, ``, location.pathname + location.search);
  }
  let cfg = load(SKEY, null);

  const subs = [], ssubs = [];
  const emit = () => subs.forEach(f => { try { f(); } catch (e) {} });
  const emitS = () => ssubs.forEach(f => { try { f(); } catch (e) {} });
  let timer = null, lastSync = 0, status = ``;

  const S = window.STORE = {
    done: k => !!(st.done[k] && st.done[k].v),
    note: k => (st.notes[k] && st.notes[k].v) || ``,
    setDone(k, v) { st.done[k] = { v: v ? 1 : 0, t: Date.now() }; save(KEY, st); S.push(); },
    setNote(k, v) { st.notes[k] = { v: v || ``, t: Date.now() }; save(KEY, st); S.push(); },
    onChange: f => subs.push(f),
    onStatus: f => ssubs.push(f),
    get synced() { return !!cfg; },
    get status() { return status; },
    get lastSync() { return lastSync; },
    shareLink() {
      if (!cfg) return ``;
      const u = new URL(location.href); u.hash = ``; u.search = ``;
      const s = localStorage.getItem(`trip_start`); if (s) u.searchParams.set(`start`, s);
      return `${u}#sync=${cfg.gist}.${cfg.token}`;
    },
    async enable(token) {
      token = token.trim();
      const r = await fetch(API, { method: `POST`, headers: hdr(token), body: JSON.stringify({ description: `Trip ticks & notes (germany-france-trip)`, public: false, files: { [FILE]: { content: JSON.stringify(st) } } }) });
      if (!r.ok) throw new Error(r.status === 401 ? `token` : `http ${r.status}`);
      const g = await r.json();
      cfg = { gist: g.id, token }; save(SKEY, cfg); lastSync = Date.now(); status = `ok`;
      return S.shareLink();
    },
    disable() { cfg = null; try { localStorage.removeItem(SKEY); } catch (e) {} status = ``; },
    push() { if (!cfg) return; clearTimeout(timer); timer = setTimeout(S.sync, 1500); },
    async sync() {
      if (!cfg || !navigator.onLine) return;
      try {
        status = `busy`; emitS();
        const r = await fetch(`${API}/${cfg.gist}`, { headers: hdr(cfg.token), cache: `no-store` });
        if (!r.ok) throw new Error(`http ${r.status}`);
        const g = await r.json(), f = g.files && g.files[FILE];
        let remote = { done: {}, notes: {} };
        if (f) {
          let txt = f.content;
          if (f.truncated && f.raw_url) txt = await (await fetch(f.raw_url, { cache: `no-store` })).text();
          try { remote = JSON.parse(txt); } catch (e) {}
        }
        const before = JSON.stringify(st), merged = merge(st, remote);
        const changedLocal = JSON.stringify(merged) !== before;
        const changedRemote = JSON.stringify(merged) !== JSON.stringify(merge(remote, { done: {}, notes: {} }));
        st = merged; save(KEY, st);
        if (changedRemote) {
          const p = await fetch(`${API}/${cfg.gist}`, { method: `PATCH`, headers: hdr(cfg.token), body: JSON.stringify({ files: { [FILE]: { content: JSON.stringify(st) } } }) });
          if (!p.ok) throw new Error(`http ${p.status}`);
        }
        lastSync = Date.now(); status = `ok`;
        if (changedLocal) emit();
      } catch (e) { status = `err`; }
      emitS();
    },
  };
  function hdr(t) { return { Authorization: `Bearer ${t}`, Accept: `application/vnd.github+json`, 'Content-Type': `application/json` }; }
  function merge(a, b) {
    const out = { done: {}, notes: {} };
    for (const kind of [`done`, `notes`]) {
      const A = a[kind] || {}, B = b[kind] || {};
      for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
        const x = A[k], y = B[k];
        out[kind][k] = !x ? y : !y ? x : (y.t > x.t ? y : x);
      }
    }
    return out;
  }
  addEventListener(`load`, () => S.sync());
  setInterval(() => { if (document.visibilityState === `visible`) S.sync(); }, 45000);
  document.addEventListener(`visibilitychange`, () => { if (document.visibilityState === `visible`) S.sync(); });
  addEventListener(`online`, () => S.sync());
})();
