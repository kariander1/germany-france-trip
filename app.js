(function () {
  const T = window.TRIP, IMG = window.IMG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? ``).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const img = k => IMG[k] || null;
  const gmaps = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const waze = q => `https://waze.com/ul?q=${encodeURIComponent(q)}&navigate=yes`;
  const toMin = t => { const [h, m] = t.split(`:`).map(Number); return h * 60 + m; };
  const S = window.STR, EN = window.LANG === `en`;
  const TAGS = S.tags;
  const HE = o => o && o.he ? ` dir="rtl" lang="he"` : ``;
  const SEC_ICON = { must: `⭐`, food: `🍽️`, spa: `♨️`, rain: `☔`, book: `🎟️`, rec: `💡`, shop: `🛍️`, optional: `🧭` };
  const FR = (d, i) => [5, 6, 8].includes(i);
  // ✓ done checkboxes, saved per browser (keys are by position, so they work in both languages)
  let DONE = {}; try { DONE = JSON.parse(localStorage.getItem(`trip_done`) || `{}`); } catch (e) {}
  const cb = k => `<input type="checkbox" class="done-cb" data-k="${k}"${DONE[k] ? ` checked` : ``} aria-label="✓">`;
  const doneCls = k => DONE[k] ? ` done` : ``;

  // ── hero
  $(`#heroTitle`).textContent = T.title;
  [[`.hero-dates`, `dates`], [`.mapsec-head h2`, `mapH`], [`.mapsec-head p`, `mapP`], [`.cta.primary`, `watch`], [`.cta[href="#mapsec"]`, `onMap`], [`.cta[href="#day-1"]`, `plan`]].forEach(([q, k]) => { const e = $(q); if (e) e.textContent = S[k]; });
  const nbs = $(`.nb-story span`); if (nbs) nbs.textContent = ` ` + S.story;
  const ft = document.querySelectorAll(`.foot p`); [S.foot1, S.foot2 + (S.heNote ? ` ` + S.heNote : ``), S.credit].forEach((t, k) => ft[k] && (ft[k].textContent = t));
  const lt = $(`#langBtn`); if (lt) { lt.textContent = EN ? `עב` : `EN`; lt.onclick = () => setLang(EN ? `he` : `en`); }
  $(`#heroSub`).textContent = T.subtitle;
  $(`#heroImg`).style.backgroundImage = `url("${img(`neuschwanstein`)}")`;
  document.querySelectorAll(`a[href^="story.html"]`).forEach(a => a.href = a.getAttribute(`href`));
  $(`#route`).innerHTML = T.days.map((d, i) =>
    `<li class="${FR(d, i) ? `flag-fr` : ``}"><a href="#day-${i + 1}">${dayLbl(d, i)} · ${esc(d.place)}</a></li>`).join(``);

  // ── days
  const stopHTML = (s, di, si) => {
    const pic = s.img && img(s.img);
    const q = s.q || (s.tag === `hotel` ? null : s.n);
    const k = `s-${di}-${si}`, chk = s.tag !== `hotel` && s.tag !== `drive`;
    return `<li class="st t-${s.tag || `plain`}${chk ? doneCls(k) : ``}" id="s-${di}-${si}" data-min="${s.t ? toMin(s.t) : ``}">
      <div class="st-time ${s.fixed ? `fixed` : ``}">${s.t ? (s.fixed ? `🔒 ` : `≈`) + s.t : ``}</div>
      <span class="st-dot"></span>
      <div class="st-body">
        ${pic ? `<img class="thumb" loading="lazy" src="${pic}" alt="" onerror="this.remove()">` : ``}
        <div class="st-main">
          <div class="st-name">${chk ? cb(k) : ``}${esc(s.n)}${s.tag && TAGS[s.tag] ? `<span class="tag ${s.tag}">${TAGS[s.tag]}</span>` : ``}</div>
          ${s.d ? `<p class="st-desc"${HE(s)}>${s.d}</p>` : ``}
          <div class="st-meta">
            ${q ? `<a href="${gmaps(q)}" target="_blank" rel="noopener">📍 Google Maps</a>
            <a href="${waze(q)}" target="_blank" rel="noopener">🚗 Waze</a>` : ``}
            ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener">🔗 ${S.site}</a>` : ``}
          </div>
        </div>
      </div></li>`;
  };
  const secHTML = (sec, open, di, xi) => `<details class="sec k-${sec.k}" ${open ? `open` : ``}>
      <summary>${SEC_ICON[sec.k] || `•`} ${esc(sec.title)}</summary>
      <ul${HE(sec)}>${sec.items.map((it, j) => { const k = `i-${di}-${xi}-${j}`, chk = it.n && (it.q || it.url); return `<li class="${chk ? doneCls(k) : ``}">
        ${it.n ? `${chk ? cb(k) : ``}<span class="n">${esc(it.n)}</span>${it.gf ? `<span class="gf">${S.gf}</span>` : ``}` : ``}
        ${it.a ? `<div class="a">${esc(it.a)}</div>` : ``}
        ${it.d ? `<div class="d">${it.d}</div>` : ``}
        ${it.q ? `<a class="lk" href="${gmaps(it.q)}" target="_blank" rel="noopener">📍 ${S.map}</a>` : ``}
        ${it.url ? `<a class="lk" href="${it.url}" target="_blank" rel="noopener">🔗 ${S.site}</a>` : ``}
      </li>`; }).join(``)}</ul></details>`;

  $(`#days`).innerHTML = T.days.map((d, i) => {
    const cover = img(d.img) || img(`munich`);
    return `<section class="day" id="day-${i + 1}" data-day="${i + 1}">
      <div class="day-bg" style="background-image:url('${cover}')"></div>
      <div class="day-cover" style="background-image:url('${cover}')">
        <div class="dc-text">
          <div class="dc-date"><span class="dc-num">${S.day} ${i + 1}</span> ${dayLong(d)}${FR(d, i) ? (d.date ? ` · ` : ``) + `🇫🇷` : ``}<span class="today-badge">${S.today}</span></div>
          <h2>${esc(d.title)}</h2>
          <a class="dc-story" href="story.html?day=${i + 1}">${S.dayInStory}</a>
        </div>
        <button class="dc-fold" type="button" data-i="${i}" aria-expanded="true"><span class="dc-prog"></span><b>▾</b></button>
      </div>
      <div class="day-body">
      <div class="info">
        <div class="info-card"><div class="ic">${d.weather.icon}</div><div><div class="k">${S.weather}</div><div class="v">${d.weather.t}<small>${esc(d.weather.d)}</small></div></div></div>
        ${i === T.days.length - 1 ? `<div class="info-card"><div class="ic">✈️</div><div><div class="k">${S.today}</div><div class="v">${S.goingHome}</div></div></div>` : ``}
        ${d.drive ? `<div class="info-card"><div class="ic">🚗</div><div><div class="k">${S.drive}</div><div class="v"><small>${esc(d.drive)}</small></div></div></div>` : ``}
      </div>
      ${d.alert ? `<div class="callout alert">⚠️ <b>${d.alert}</b></div>` : ``}
      ${d.note ? `<div class="callout note">💬 ${d.note}</div>` : ``}
      ${d.links ? `<div class="links"${EN ? `` : ``}>${d.links.map(l => `<a href="${l.u}" target="_blank" rel="noopener">🔗 ${esc(l.n)}</a>`).join(``)}</div>` : ``}
      <ol class="tl">${d.stops.map((s, si) => stopHTML(s, i, si)).join(``)}</ol>
      ${d.sections.length ? `<div class="secs">${d.sections.map((s, xi) => secHTML(s, s.k === `must` || s.k === `rec`, i, xi)).join(``)}</div>` : ``}
      </div>
    </section>`;
  }).join(``);

  $(`#days`).addEventListener(`change`, e => {
    const c = e.target.closest(`.done-cb`); if (!c) return;
    if (c.checked) DONE[c.dataset.k] = 1; else delete DONE[c.dataset.k];
    c.closest(`li`).classList.toggle(`done`, c.checked);
    try { localStorage.setItem(`trip_done`, JSON.stringify(DONE)); } catch (e) {}
    prog();
  });

  // ── collapse days: past days fold automatically; a manual tap wins and is remembered
  let FOLD = {}; try { FOLD = JSON.parse(localStorage.getItem(`trip_fold`) || `{}`); } catch (e) {}
  let autoFold = () => false;
  const setFold = (i, on) => {
    const sec = $(`#day-${i + 1}`); sec.classList.toggle(`folded`, on);
    const b = $(`.dc-fold`, sec); b.setAttribute(`aria-expanded`, !on); b.title = on ? S.unfold : S.fold;
  };
  const applyFold = () => T.days.forEach((d, i) => setFold(i, i in FOLD ? !!FOLD[i] : autoFold(i)));
  const prog = () => document.querySelectorAll(`.day`).forEach(sec => {
    const all = sec.querySelectorAll(`.done-cb`).length, n = sec.querySelectorAll(`.done-cb:checked`).length;
    $(`.dc-prog`, sec).textContent = all ? `✓ ${n}/${all}` : ``;
  });
  prog();
  const userFold = (i, on) => {
    if (on === autoFold(i)) delete FOLD[i]; else FOLD[i] = on ? 1 : 0;
    try { localStorage.setItem(`trip_fold`, JSON.stringify(FOLD)); } catch (e) {}
    setFold(i, on);
  };
  $(`#days`).addEventListener(`click`, e => {
    const b = e.target.closest(`.dc-fold`); if (!b) return;
    const i = +b.dataset.i, on = !$(`#day-${i + 1}`).classList.contains(`folded`);
    userFold(i, on);
    if (on) $(`#day-${i + 1}`).scrollIntoView({ block: `start` });
  });
  // opening a folded day when jumping into it
  const reveal = el => { const sec = el && el.closest(`.day`); if (sec && sec.classList.contains(`folded`)) userFold(+sec.dataset.day - 1, false); };
  addEventListener(`hashchange`, () => reveal($(location.hash)));

  // ── satellite route map
  if (window.L && window.GEO) {
    const m = L.map(`routemap`, { zoomControl: true, scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false });
    L.tileLayer(SAT_TILES, { maxZoom: 18, attribution: `Esri, Maxar, Earthstar Geographics` }).addTo(m);
    L.tileLayer(LABEL_TILES, { maxZoom: 18, opacity: .7 }).addTo(m);
    m.attributionControl.setPrefix(``);
    const lls = GEO.map(g => g.path.map(k => PLACES[k].ll));
    L.polyline(lls.flat(), { color: `#ffd27a`, weight: 3.5, opacity: .95, className: `rm-route` }).addTo(m);
    const seen = {};
    GEO.forEach((g, i) => { (seen[g.focus] = seen[g.focus] || []).push(i); });
    Object.entries(seen).forEach(([k, days]) => {
      const html = `<div class="rm-pin"><i>${days.map(d => d + 1).join(`·`)}</i><b>${PLACES[k].n}</b></div>`;
      L.marker(PLACES[k].ll, { icon: L.divIcon({ className: ``, html, iconSize: [0, 0] }), title: PLACES[k].n })
        .addTo(m).on(`click`, () => $(`#day-${days[0] + 1}`).scrollIntoView());
    });
    m.fitBounds(L.latLngBounds(lls.flat()), { padding: [30, 30] });
    addEventListener(`resize`, () => m.invalidateSize());
  }

  // ── now bar
  $(`#nbDays`).innerHTML = T.days.map((d, i) =>
    `<button class="nb-d" type="button" data-i="${i}" title="${S.day} ${i + 1} — ${esc(d.title)}"><span class="bar"><i></i></span><span class="lbl">${dayLbl(d, i)}</span></button>`).join(``);
  $(`#nbDays`).addEventListener(`click`, e => {
    const b = e.target.closest(`.nb-d`); if (b) $(`#day-${+b.dataset.i + 1}`).scrollIntoView();
  });

  // Local time at the destination (Europe/Berlin == Paris). ?now=YYYY-MM-DDTHH:MM to preview (needs a start date).
  function localNow() {
    const p = new URLSearchParams(location.search).get(`now`);
    if (p && /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(p)) return { date: p.slice(0, 10), min: toMin(p.slice(11, 16)), ms: Date.UTC(+p.slice(0, 4), +p.slice(5, 7) - 1, +p.slice(8, 10), +p.slice(11, 13), +p.slice(14, 16)) };
    const f = new Intl.DateTimeFormat(`en-CA`, { timeZone: `Europe/Berlin`, year: `numeric`, month: `2-digit`, day: `2-digit`, hour: `2-digit`, minute: `2-digit`, second: `2-digit`, hourCycle: `h23` });
    const o = {}; f.formatToParts(new Date()).forEach(x => o[x.type] = x.value);
    return { date: `${o.year}-${o.month}-${o.day}`, min: +o.hour * 60 + +o.minute, ms: Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour, +o.minute, +o.second) };
  }
  const hhmm = m => `${String(Math.floor(m / 60)).padStart(2, `0`)}:${String(m % 60).padStart(2, `0`)}`;
  let jumpTarget = null, firstRun = true;

  function update() {
    const now = localNow();
    const di = T.days.findIndex(d => d.date === now.date);
    const btns = [...document.querySelectorAll(`.nb-d`)];
    document.querySelectorAll(`.st`).forEach(e => e.classList.remove(`past`, `now`, `next`));
    document.querySelectorAll(`.day`).forEach(e => e.classList.remove(`today`));
    btns.forEach(b => b.classList.remove(`today`));
    const status = $(`#nbStatus`), cd = $(`#countdown`);
    autoFold = i => window.TRIP_KNOWN && now.date >= T.start && now.date <= T.end && T.days[i].date < now.date;
    applyFold();

    if (!window.TRIP_KNOWN) {
      // no private start date on this device: plain plan, no live tracking
      btns.forEach(b => $(`i`, b).style.width = `0`);
      status.innerHTML = `🎄 <b>${esc(T.title)}</b> · ${S.dates}`;
      cd.innerHTML = ``;
      $(`#nbDay`).hidden = true; jumpTarget = $(`#day-1`);
      $(`#nbJump`).textContent = S.jumpFirst;
    } else if (now.date < T.start || (di === 0 && now.min < toMin(T.days[0].stops[0].t) - 360)) {
      // before the trip
      btns.forEach(b => $(`i`, b).style.width = `0`);
      const diff = Math.max(0, T.startMs - now.ms), dd = Math.floor(diff / 864e5), hh = Math.floor(diff / 36e5) % 24, mm = Math.floor(diff / 6e4) % 60;
      status.innerHTML = dd >= 1 ? S.cdLong(dd, hh) : S.cdShort(hh, mm);
      cd.innerHTML = `<div class="cd"><b>${dd}</b><span>${S.days}</span></div><div class="cd"><b>${hh}</b><span>${S.hours}</span></div><div class="cd"><b>${mm}</b><span>${S.mins}</span></div>`;
      $(`#nbDay`).hidden = true; jumpTarget = $(`#day-1`);
      $(`#nbJump`).textContent = S.jumpFirst;
    } else if (now.date > T.end) {
      btns.forEach(b => $(`i`, b).style.width = `100%`);
      status.innerHTML = S.over;
      cd.innerHTML = `<div class="msg">${S.over}</div>`;
      $(`#nbDay`).hidden = true; jumpTarget = $(`#day-1`);
      $(`#nbJump`).textContent = S.jumpStart;
    } else {
      const day = T.days[di], sec = $(`#day-${di + 1}`);
      sec.classList.add(`today`); btns[di].classList.add(`today`);
      const timed = day.stops.map((s, si) => ({ s, si, m: s.t ? toMin(s.t) : null })).filter(x => x.m != null);
      const first = timed[0].m, last = timed[timed.length - 1].m;
      const span = Math.max(60, last - first + 60);
      const pct = Math.min(1, Math.max(0, (now.min - first) / span));
      btns.forEach((b, i) => $(`i`, b).style.width = i < di ? `100%` : i === di ? `${pct * 100}%` : `0`);

      let cur = -1; timed.forEach((x, k) => { if (x.m <= now.min) cur = k; });
      timed.forEach((x, k) => {
        const el = $(`#s-${di}-${x.si}`);
        if (k < cur) el.classList.add(`past`); else if (k === cur) el.classList.add(`now`); else if (k === cur + 1) el.classList.add(`next`);
      });
      const curS = cur >= 0 ? timed[cur] : null, nextS = timed[cur + 1];
      status.innerHTML = `${S.day} <b>${di + 1}</b> ${S.of} ${T.days.length} · ${dayLong(day)} · <b>${esc(day.title)}</b> · 🕒 ${hhmm(now.min)}`;
      cd.innerHTML = `<div class="msg">${S.onTrip(di + 1, esc(day.title))}</div>`;

      // day track
      const track = $(`#nbTrack`);
      track.querySelectorAll(`.nb-tick`).forEach(t => t.remove());
      timed.forEach((x, k) => {
        const t = document.createElement(`span`);
        t.className = `nb-tick${x.s.fixed ? ` fixed` : ``}${k <= cur ? ` done` : ``}`;
        t.style.insetInlineStart = `${((x.m - first) / span) * 100}%`; t.title = `${x.s.t} ${x.s.n}`;
        track.appendChild(t);
      });
      $(`#nbFill`).style.width = `${pct * 100}%`;
      $(`#nbMarker`).style.insetInlineStart = `${pct * 100}%`;
      $(`#nbNow`).innerHTML = (curS ? `${S.now}: <b>${esc(curS.s.n)}</b>` : S.startsAt(day.stops[0].t)) +
        (nextS ? ` · ${S.next}: ${esc(nextS.s.n)} (${nextS.s.t})` : curS ? ` · ${S.endOfDay}` : ``);
      $(`#nbDay`).hidden = false;
      jumpTarget = curS ? $(`#s-${di}-${curS.si}`) : sec;
      $(`#nbJump`).textContent = S.jumpNow;
      if (firstRun && !location.hash) {
        const go = () => { reveal(jumpTarget); jumpTarget.scrollIntoView({ block: `center`, behavior: `instant` }); };
        if (`scrollRestoration` in history) history.scrollRestoration = `manual`;
        (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(go, 150));
      }
    }
    firstRun = false;
  }
  const jump = () => { if (!jumpTarget) return; reveal(jumpTarget); jumpTarget.scrollIntoView({ block: `center`, behavior: `smooth` }); };
  $(`#nbJump`).addEventListener(`click`, jump);
  const fab = $(`#fabNow`); if (fab) { fab.textContent = S.fabNow; fab.addEventListener(`click`, jump); }
  update();
  setInterval(update, 30000);
})();
