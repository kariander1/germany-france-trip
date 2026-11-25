// Language: Hebrew (default) or English. ?lang=en / ?lang=he, remembered per browser.
(function () {
  let lang = `he`;
  try { lang = localStorage.getItem(`trip_lang`) || `he`; } catch (e) {}
  const q = new URLSearchParams(location.search).get(`lang`);
  if (q === `en` || q === `he`) { lang = q; try { localStorage.setItem(`trip_lang`, q); } catch (e) {} }
  window.LANG = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === `en` ? `ltr` : `rtl`;
  window.setLang = l => { try { localStorage.setItem(`trip_lang`, l); } catch (e) {} const u = new URL(location.href); u.searchParams.set(`lang`, l); location.href = u.toString(); };

  const S = {
    he: {
      title: `גרמניה ואלזס בחורף`, subtitle: `מינכן · נוישוונשטיין · הדרך הרומנטית · היידלברג · קולמר · שטרסבורג · פרנקפורט`,
      dates: `ירח דבש 🤍 · 11 ימים`, watch: `▶ צפו בסיפור`, onMap: `🗺️ המסלול על המפה`, plan: `📅 התוכנית יום־יום`,
      mapH: `המסלול מהחלל`, mapP: `11 ימים, מבוואריה דרך הדרך הרומנטית ועד אלזס ופרנקפורט. לחצו על נקודה כדי לקפוץ ליום.`,
      story: `הסיפור`, jumpNow: `📍 קפיצה לעכשיו`, jumpFirst: `📍 ליום הראשון`, jumpStart: `📍 להתחלה`, fold: `כיווץ היום`, unfold: `פתיחת היום`, fabNow: `📍 עכשיו`, pickStart: `באיזה תאריך מתחיל הטיול?`, ok: `שמירה`, cancel: `ביטול`, changeDate: `שינוי תאריך`, notYet: n => `✈️ הטיול מתחיל בעוד ${n} ימים — מציג את יום 1.`,
      day: `יום`, of: `מתוך`, today: `היום`, dayInStory: `▶ היום הזה בסיפור`, weather: `מזג אוויר`, sleep: `לינה`, drive: `נהיגה`, goingHome: `חוזרים הביתה`,
      site: `אתר`, map: `מפה`, gf: `100% ללא גלוטן`,
      tags: { must: `חובה`, market: `שוק`, food: `אוכל`, event: `אירוע`, optional: `אופציונלי`, spa: `ספא` },
      days: `ימים`, hours: `שעות`, mins: `דקות`,
      cdLong: (d, h) => `✈️ עוד <b>${d} ימים ו־${h} שעות</b> לנחיתה במינכן`, cdShort: (h, m) => `✈️ עוד <b>${h} שעות ו־${m} דקות</b> נוחתים במינכן!`,
      over: `🤍 הטיול הסתיים — איזה כיף היה!`, onTrip: (n, t) => `🎄 אנחנו בטיול! יום ${n} — ${t}`,
      now: `עכשיו`, next: `הבא`, startsAt: t => `היום מתחיל ב־${t}`, endOfDay: `סוף היום 🌙`,
      foot1: `השעות בפס ״איפה אנחנו״ הן הערכה לפי סדר המסלול, בשעון מקומי (מרכז אירופה). שעות עם 🔒 הן אירועים או הזמנות עם שעה קבועה.`,
      foot2: `ללא גלוטן: תמיד לשאול על הפרדה בהכנה וזיהום משני. שעות פתיחה — לוודא סמוך לביקור.`,
      credit: `תמונות: Wikimedia Commons / Wikipedia, ברישיונות CC · צילומי לוויין: Esri, Maxar, Earthstar Geographics.`,
      // story
      sBrand: `🎄 גרמניה ואלזס · הסיפור`, sFull: `לתוכנית המלאה ←`, sPrev: `הקודם`, sNext: `הבא`, sAuto: `אוטומטי`, sAgain: `↻ שוב מההתחלה`, sFullBtn: `לתוכנית המלאה`,
      sEndH: `נתראה באירופה 🤍`, sEndP: `כל הפרטים, השעות והמקומות ללא גלוטן — בתוכנית המלאה.`,
      sIntroK: `ירח דבש · 11 ימים`, sIntroH: `גרמניה ואלזס <b>בחורף</b>`,
      sIntroL: m => [`11 ימים בדרכים`, `${m} עצירות בשווקי כריסמס`, `טירות, כפרים ומרחצאות חמים`, `והכי חשוב — אוכל ללא גלוטן`],
      sAllK: `המסלול כולו`, sAllH: `מסע אחד, <b>שתי מדינות</b>`, sStops: `עצירות`, sMarkets: `שווקי כריסמס`, sOpen: `פתיחה`, sSum: `סיכום`,
      sCredit: `צילומי לוויין: Esri, Maxar, Earthstar Geographics · תמונות: Wikimedia Commons`,
      secTitle: null, heNote: ``,
    },
    en: {
      title: `Germany & Alsace in Winter`, subtitle: `Munich · Neuschwanstein · the Romantic Road · Heidelberg · Colmar · Strasbourg · Frankfurt`,
      dates: `Honeymoon 🤍 · 11 days`, watch: `▶ Watch the story`, onMap: `🗺️ Route map`, plan: `📅 Day by day`,
      mapH: `The route from space`, mapP: `11 days, from Bavaria along the Romantic Road to Alsace and Frankfurt. Tap a pin to jump to that day.`,
      story: `Story`, jumpNow: `📍 Jump to now`, jumpFirst: `📍 Day one`, jumpStart: `📍 To the start`, fold: `Collapse day`, unfold: `Expand day`, fabNow: `📍 Now`, pickStart: `What date does the trip start?`, ok: `Save`, cancel: `Cancel`, changeDate: `Change date`, notYet: n => `✈️ The trip starts in ${n} days — showing day 1.`,
      day: `Day`, of: `of`, today: `Today`, dayInStory: `▶ This day in the story`, weather: `Weather`, sleep: `Hotel`, drive: `Driving`, goingHome: `Flying home`,
      site: `Website`, map: `Map`, gf: `100% gluten-free`,
      tags: { must: `Must`, market: `Market`, food: `Food`, event: `Event`, optional: `Optional`, spa: `Spa` },
      days: `days`, hours: `hours`, mins: `min`,
      cdLong: (d, h) => `✈️ <b>${d} days ${h} hours</b> until we land in Munich`, cdShort: (h, m) => `✈️ <b>${h} h ${m} min</b> until we land in Munich!`,
      over: `🤍 The trip is over — what a trip it was!`, onTrip: (n, t) => `🎄 We're on the trip! Day ${n} — ${t}`,
      now: `Now`, next: `Next`, startsAt: t => `Day starts at ${t}`, endOfDay: `end of the day 🌙`,
      foot1: `Times in the "where are we" bar are estimates from the order of the plan, in local time (Central Europe). Times marked 🔒 are fixed events or bookings.`,
      foot2: `Gluten-free: always ask about separate preparation and cross-contamination. Check opening hours close to the visit.`,
      credit: `Photos: Wikimedia Commons / Wikipedia, CC licences · Satellite imagery: Esri, Maxar, Earthstar Geographics.`,
      sBrand: `🎄 Germany & Alsace · the story`, sFull: `Full plan →`, sPrev: `Previous`, sNext: `Next`, sAuto: `Auto`, sAgain: `↻ Start again`, sFullBtn: `Open the full plan`,
      sEndH: `See you in Europe 🤍`, sEndP: `Every detail, time and gluten-free spot is in the full plan.`,
      sIntroK: `Honeymoon · 11 days`, sIntroH: `Germany & Alsace <b>in winter</b>`,
      sIntroL: m => [`11 days on the road`, `${m} Christmas-market stops`, `Castles, villages and thermal baths`, `And most importantly: gluten-free food`],
      sAllK: `The whole route`, sAllH: `One journey, <b>two countries</b>`, sStops: `stops`, sMarkets: `Christmas markets`, sOpen: `Intro`, sSum: `Summary`,
      sCredit: `Satellite: Esri, Maxar, Earthstar Geographics · Photos: Wikimedia Commons`,
      secTitle: { must: `Don't miss`, food: `Gluten-free`, spa: `Thermal baths & spa`, rain: `If it rains`, book: `Book ahead`, rec: `Our recommendation`, shop: `Shopping`, optional: `Optional extras` },
      heNote: ``,
    },
  };
  window.STR = S[lang];

  if (lang !== `en`) return;

  // English overlay for the trip content (detailed notes stay in Hebrew)
  const PL = { muc: `Munich Airport`, munich: `Munich`, neusch: `Neuschwanstein`, hopferau: `Hopferau`, fussen: `Füssen`, dinkel: `Dinkelsbühl`, rothen: `Rothenburg`, heidel: `Heidelberg`, colmar: `Colmar`, eguis: `Eguisheim`, riquew: `Riquewihr`, kaysers: `Kaysersberg`, sasbach: `Sasbachwalden`, stras: `Strasbourg`, baden: `Baden-Baden`, frank: `Frankfurt`, fra: `Frankfurt Airport` };
  if (window.PLACES) for (const k in PL) if (PLACES[k]) PLACES[k].n = PL[k];

  const D = [
    { title: `Munich`, place: `Munich`, w: `Showers in the morning, clearing by noon`, alert: `Bring warm clothes for the flight, or keep them at the top of the suitcase!`,
      n: [`Landing at Munich Airport (MUC)`, `S-Bahn: S1 or S8`, `Hotel: drop the luggage`, `Gluten-free breakfast`, `Marienplatz, Neues Rathaus & Glockenspiel`, `Viktualienmarkt`, `St. Peter's Church (Peterskirche)`, `Frauenkirche`, `Käthe Wohlfahrt Munich`, `Sendlinger Straße`, `Sendlinger Tor`, `Hotel: check-in & rest`, `Marienplatz Christmas market: tree lighting at 17:00 ✨`, `Hofbräuhaus`, `Medieval market, Wittelsbacherplatz`, `Back to the hotel`] },
    { title: `Munich`, place: `Munich`, w: `Rain and drizzle, mostly until the afternoon`, note: `A rainier day: start indoors and keep the markets for the afternoon and evening.`,
      n: [`Breakfast at a café`, `Munich Residenz`, `Christmas village in the Residenz`, `Odeonsplatz & Theatinerkirche`, `Hofgarten`, `Eisbachwelle (river surfers)`, `English Garden, Monopteros`, `Neuhauser Straße`, `Kaufingerstraße`, `TK Maxx`, `Pink Christmas, Stephansplatz`, `Mixto Verde: gluten-free dinner`, `Back to the hotel`] },
    { title: `Munich → Neuschwanstein → Füssen`, place: `Neuschwanstein`, w: `Dry, very cold morning, rain at midday`,
      drive: `2–2.5 h from Munich to the castle, ~15 min on to Füssen. Roadworks on the B17: leave extra time.`,
      alert: `Booked: Neuschwanstein, English guided tour at 14:00, two tickets. Don't be late! Check in the morning whether the bridge and shuttle are open.`,
      note: `Sunday: most regular shops are closed. It gets dark around 16:30–17:00 this time of year.`,
      n: [`Leave Munich`, `Hohenschwangau parking P4`, `Alpsee lake`, `Hohenschwangau Castle`, `Walk up to the castle`, `Neuschwanstein: English tour`, `Marienbrücke (Mary's Bridge)`, `Walk down, back to the car`, `Schloss Hopferau: Christmas market at the castle`, `Hotel: check-in`, `Füssen old town, Reichenstraße`, `Restaurant Ritterstuben: dinner`] },
    { title: `Füssen → Dinkelsbühl → Rothenburg`, place: `Rothenburg`, w: `On-and-off showers, cold all day`,
      drive: `About 2.5–3 h via Dinkelsbühl without stops. Leave room for weather, parking and traffic.`,
      note: `Don't linger too long in Füssen. Dinkelsbühl opens its Christmas market at 16:30 with a parade and band; if we stay, we reach Rothenburg after dark but still before its market closes at 19:00.`,
      n: [`Lechfall waterfall`, `Füssen old town`, `Drive to Dinkelsbühl`, `Dinkelsbühl old town, Weinmarkt`, `Lunch: Meiser / Café am Münster`, `Dinkelsbühl Christmas market, Spitalhof`, `Market opening parade, Marktplatz 🎺`, `Drive to Rothenburg`, `Rothenburg Reiterlesmarkt`, `Käthe Wohlfahrt Christmas Village`, `Plönlein`, `Night Watchman tour (English)`, `Restaurant Michelangelo: dinner`, `Overnight`] },
    { title: `Rothenburg by day, Heidelberg by night`, place: `Rothenburg → Heidelberg`, w: `Clouds with sunny breaks: a good walking day`,
      drive: `About 2 h from Rothenburg to Heidelberg (~167 km).`,
      note: `Daylight for Rothenburg (walls, views, shops, market), drive to Heidelberg in the afternoon. Some streets around Heidelberg's market are closed to cars: go to the hotel first, then walk.`,
      n: [`Plönlein`, `Spitaltor`, `Walk on the town walls`, `Burggarten`, `Marktplatz & Reiterlesmarkt`, `Lunch: Pane e Vino / Michelangelo`, `Käthe Wohlfahrt Christmas Village`, `German Christmas Museum`, `St. Jakob's Church`, `Drive to Heidelberg`, `Hotel: check-in`, `Heidelberg Christmas market, Universitätsplatz`, `Kornmarkt`, `Karlsplatz ice rink`, `red – die grüne Küche: dinner`] },
    { title: `Heidelberg by day, Colmar by night`, place: `Heidelberg → Colmar`, w: `Mostly cloudy, possible light rain`,
      drive: `About 2.5 h from Heidelberg to Colmar. Optional stop at thermal baths or Freiburg.`,
      note: `Daylight for Heidelberg (castle and old town), drive to Colmar late afternoon. Hotel parking in Colmar is limited: check ahead.`,
      n: [`Kornmarkt car park / funicular`, `Heidelberg Castle`, `Old town, Hauptstraße`, `Marktplatz & Church of the Holy Spirit`, `Old Bridge & bridge monkey`, `Universitätsplatz`, `Rada Coffee: gluten-free lunch`, `Drive to Colmar 🇫🇷`, `Hotel: check-in`, `Old town, Place de l'Ancienne Douane`, `Marché Gourmand food market`] },
    { title: `Colmar & the Alsace villages`, place: `Alsace`, w: `Fairly dry morning, showers from the evening`,
      drive: `1–1.5 h in total between Colmar, Eguisheim, Riquewihr and back.`,
      alert: `The Eguisheim and Riquewihr Christmas markets open only tomorrow! The villages are still worth it, but without stalls. All six Colmar markets are already open.`,
      n: [`Eguisheim, Parking de la Mairie`, `Place du Château Saint-Léon`, `Riquewihr, Parking P1`, `Rue du Général de Gaulle`, `La Féerie de Noël`, `Dolder tower`, `Lunch`, `Kaysersberg (optional)`, `Hotel: leave the car`, `Little Venice`, `Covered market`, `Christmas cellar, Domaine Karcher & Fils`, `Place de l'Ancienne Douane / Koïfhus`, `Once Upon a Night, Musée Unterlinden`, `Rue des Marchands / Maison Pfister`, `Place des Dominicains`, `Place Jeanne d'Arc`, `Candlelight: Hommage à Hans Zimmer 🕯️`, `Marché Gourmand / dinner`, `Overnight`] },
    { title: `Kaysersberg, the gluten-free market & Strasbourg`, place: `Sasbachwalden`, w: `Cloudy, possible afternoon showers`,
      drive: `About 2–2.5 h via Kaysersberg and Sasbachwalden.`,
      alert: `The big day! The gluten-free Christmas market in Sasbachwalden is the anchor of the day (14:00–21:00).`,
      n: [`Kaysersberg, Parking Porte Basse`, `Kaysersberg Christmas market, Cour de l'Arsenal`, `Fortified bridge`, `Drive to Sasbachwalden 🇩🇪`, `Sasbachwalden: parking & village`, `Gluten-free Christmas market, Kurpark 🌟`, `Drive to Strasbourg 🇫🇷`, `Hotel: check-in`, `Petite-France fire & light show 🔥`, `Place Kléber`] },
    { title: `Strasbourg & Baden-Baden`, place: `Strasbourg`, w: `Mostly cloudy, low chance of rain`,
      drive: `About 1 h each way between Strasbourg and Baden-Baden. Walk inside Strasbourg.`,
      note: `Two options: all day in Strasbourg, or Strasbourg in the morning + thermal baths in the afternoon and back for the fire show. For a calmer day, move Baden-Baden to Sunday on the way to Frankfurt.`,
      n: [`Breakfast at the hotel`, `Covered bridges / Barrage Vauban`, `La Petite France`, `Place Kléber`, `Christkindelsmärik, Place Broglie`, `Strasbourg Cathedral`, `Cathedral square / Maison Kammerzell`, `L'Éden: gluten-free bakery`, `Drive to Baden-Baden (option)`, `Baden-Baden parking (Bädergarage)`, `Caracalla Spa or Friedrichsbad ♨️`, `Kurhaus Christmas market (if time)`, `Back to Strasbourg`, `Fire & light show: last night 🔥`, `Marché OFF / back to the hotel`] },
    { title: `Frankfurt`, place: `Frankfurt`, w: `Cold, partly cloudy, probably dry`,
      drive: `2¼–2½ h from Strasbourg; about 3 h of driving with a Baden-Baden stop.`,
      note: `Leave in the morning to get at least half a day in Frankfurt. The Christmas market is open on Sunday even though most shops are closed. Kleinmarkthalle is closed on Sundays.`,
      n: [`Breakfast & check-out`, `Caracalla Spa (optional)`, `Drive to Frankfurt`, `Hotel: check-in`, `Isabella gluten-free pâtisserie`, `New Old Town & Cathedral`, `Eiserner Steg bridge`, `Römerberg & Christmas market 🎶`, `Main Tower`, `Christmas lights & back to the hotel`] },
    { title: `Flying home`, place: `Frankfurt`, w: `Possible rain mixed with snow`,
      n: [`Hotel: check-out`, `Frankfurt Airport (FRA): flight home ✈️`] },
  ];
  const T = window.TRIP; if (!T) return;
  T.title = S.en.title; T.subtitle = S.en.subtitle;
  document.title = /story/.test(location.pathname) ? `The story · Germany & Alsace` : `Germany & Alsace`;
  T.days.forEach((d, i) => {
    const e = D[i]; if (!e) return;
    d.title = e.title; d.place = e.place; d.weather.d = e.w;
    d.alert = e.alert || (d.alert ? `` : d.alert); d.note = e.note || (d.note ? `` : d.note); if (e.drive) d.drive = e.drive;
    const x = (window.EN_DETAILS || [])[i] || {};
    d.stops.forEach((s, k) => { if (e.n[k]) s.n = e.n[k]; if (x.sd && k in x.sd) s.d = x.sd[k] || ``; else s.he = true; });
    d.sections.forEach((sec, k) => {
      sec.title = S.en.secTitle[sec.k] || sec.title;
      const tr = x.sec && x.sec[k];
      if (tr) sec.items.forEach((it, j) => { const t = tr[j]; if (!t) { sec.he = true; return; } if (t.n) it.n = t.n; if (t.a) it.a = t.a; it.d = t.d || ``; });
      else sec.he = true;
    });
    if (d.links && x.links) d.links.forEach((l, k) => { if (x.links[k]) l.n = x.links[k]; });
  });
})();
