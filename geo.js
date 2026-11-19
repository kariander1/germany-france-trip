// Coordinates for the map and the story (approximate, centre of each place).
window.PLACES = {
  muc: { ll: [48.3538, 11.7861], n: `שדה התעופה מינכן` },
  munich: { ll: [48.1374, 11.5755], n: `מינכן` },
  neusch: { ll: [47.5576, 10.7498], n: `נוישוונשטיין` },
  hopferau: { ll: [47.6130, 10.6430], n: `הופפראו` },
  fussen: { ll: [47.5696, 10.7004], n: `פוסן` },
  dinkel: { ll: [49.0697, 10.3197], n: `דינקלסביל` },
  rothen: { ll: [49.3772, 10.1787], n: `רוטנבורג` },
  heidel: { ll: [49.4106, 8.7100], n: `היידלברג` },
  colmar: { ll: [48.0794, 7.3585], n: `קולמר` },
  eguis: { ll: [48.0428, 7.3064], n: `אגיסהיים` },
  riquew: { ll: [48.1667, 7.2975], n: `ריקוויר` },
  kaysers: { ll: [48.1389, 7.2636], n: `קייזרסברג` },
  sasbach: { ll: [48.6178, 8.1286], n: `ססבאכוולדן` },
  stras: { ll: [48.5818, 7.7509], n: `שטרסבורג` },
  baden: { ll: [48.7606, 8.2398], n: `באדן־באדן` },
  frank: { ll: [50.1106, 8.6821], n: `פרנקפורט` },
  fra: { ll: [50.0379, 8.5622], n: `שדה התעופה פרנקפורט` },
};
// Per day: the path driven that day, and the place to focus on (z = zoom).
window.GEO = [
  { path: [`muc`, `munich`], focus: `munich`, z: 13 },
  { path: [`munich`], focus: `munich`, z: 13.5 },
  { path: [`munich`, `neusch`, `hopferau`, `fussen`], focus: `neusch`, z: 12.5 },
  { path: [`fussen`, `dinkel`, `rothen`], focus: `rothen`, z: 13.5 },
  { path: [`rothen`, `heidel`], focus: `heidel`, z: 13 },
  { path: [`heidel`, `colmar`], focus: `colmar`, z: 13.5 },
  { path: [`colmar`, `eguis`, `riquew`, `colmar`], focus: `riquew`, z: 12 },
  { path: [`colmar`, `kaysers`, `sasbach`, `stras`], focus: `sasbach`, z: 11.5 },
  { path: [`stras`, `baden`, `stras`], focus: `stras`, z: 13.5 },
  { path: [`stras`, `frank`], focus: `frank`, z: 13.5 },
  { path: [`frank`, `fra`], focus: `frank`, z: 10.5 },
];
window.SAT_TILES = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`;
window.LABEL_TILES = `https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`;
