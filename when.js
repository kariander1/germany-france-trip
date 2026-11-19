// The site stores no dates. Open it once with ?start=YYYY-MM-DD (first day) and this
// device remembers it, which turns on dates and the live "where are we" bar.
// ?start=off forgets it.
(function () {
  const re = /^\d{4}-\d\d-\d\d$/, u = new URL(location.href), q = u.searchParams.get(`start`);
  let s = null;
  try {
    if (q === `off`) localStorage.removeItem(`trip_start`);
    else if (q && re.test(q)) localStorage.setItem(`trip_start`, q);
    s = localStorage.getItem(`trip_start`);
  } catch (e) {}
  if (!s && q && re.test(q)) s = q;
  if (q) { u.searchParams.delete(`start`); history.replaceState(null, ``, u); }

  const T = window.TRIP, EN = window.LANG === `en`;
  const ddmm = d => `${+d.slice(8, 10)}.${+d.slice(5, 7)}`;
  window.dayLbl = (d, i) => d.date ? ddmm(d.date) : `${i + 1}`;
  window.dayLong = d => d.date ? `${d.dow} · ${ddmm(d.date)}` : ``;
  window.TRIP_KNOWN = !!(s && re.test(s));
  if (!window.TRIP_KNOWN) return;

  const [y, m, dd] = s.split(`-`).map(Number);
  const wd = new Intl.DateTimeFormat(EN ? `en-GB` : `he-IL`, { weekday: EN ? `short` : `long`, timeZone: `UTC` });
  T.days.forEach((d, i) => { const t = new Date(Date.UTC(y, m - 1, dd + i, 12)); d.date = t.toISOString().slice(0, 10); d.dow = wd.format(t); });
  T.start = T.days[0].date; T.end = T.days[T.days.length - 1].date;
  T.startMs = Date.UTC(y, m - 1, dd, 8, 30); // landing, local time
})();
