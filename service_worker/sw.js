if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[r]) return;
    let f = {};
    const d = (e) => s(e, r),
      n = { module: { uri: r }, exports: f, require: d };
    a[r] = Promise.all(i.map((e) => n[e] || d(e))).then((e) => (c(...e), f));
  };
}
define(["./workbox-aef459b6"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "audio/inspect.wav",
          revision: "b812703017f41967a542ea6229bd6c26",
        },
        {
          url: "audio/startgame.wav",
          revision: "8f80837487f0e4a83b15b85edfdf8a9c",
        },
        {
          url: "audio/thalesboyOn.mp3",
          revision: "d4d9a56ae74b9a8cc523690146b0523e",
        },
        {
          url: "audio/toggleSound.mp3",
          revision: "7ad17ae8901bb65bd51d2b3afad7f863",
        },
        {
          url: "dist/games.js",
          revision: "28d0c83d65a3f9d47838f6c03c9cae98",
        },
        { url: "dist/main.js", revision: "25641e65eaa30ce5fddcc48a3fa947a8" },
        { url: "dist/menu.js", revision: "fee8f3af30e545d6fd65e75179828906" },
        {
          url: "dist/settings.js",
          revision: "9c9ceaa636afdf209c4bdbb1857d8398",
        },
        {
          url: "games/game_1/game_1_audio/error.wav",
          revision: "8e7316e58509273f8d6ef459d21e327c",
        },
        {
          url: "games/game_1/game_1_audio/gulp.mp3",
          revision: "8bd468313002a87ab83297db57ec0b61",
        },
        {
          url: "games/game_1/game_1_audio/themesong.mp3",
          revision: "789f9cf7b55db818d2d56a70ee12c362",
        },
        {
          url: "games/game_1/game_1.css",
          revision: "7c4e3ce0dcd099068f0c6c2c9168f6bb",
        },
        {
          url: "games/game_1/game_1.html",
          revision: "c574246ffa6004b44a4364bdaf9c49cf",
        },
        {
          url: "games/game_1/game_1.js",
          revision: "32a6789cb3abf6f31b59196c9fd44a3b",
        },
        {
          url: "games/game_1/game_1.png",
          revision: "a4588dff5277549238152c9c6561ef26",
        },
        {
          url: "games/game_2/game_2.css",
          revision: "2cb361b3f00c4c3a4671a03e4bb60fc5",
        },
        {
          url: "games/game_2/game_2.html",
          revision: "3396b3dc6613c73be3e906e9c6784924",
        },
        {
          url: "games/game_2/game_2.png",
          revision: "da3f0d6f474133887fd4fddc9e65a954",
        },
        { url: "index.html", revision: "70e2fae6ca8e0441fafc0724029a1ead" },
        { url: "menu.html", revision: "7a88f435a912eff31f2cefb99efced14" },
        {
          url: "package-lock.json",
          revision: "a4f3f8c9a79b944d1a4c988bca79f4b8",
        },
        { url: "package.json", revision: "5cfd591ca9edfa999f607824037ab108" },
        { url: "README.md", revision: "0e28616a54d816b2907bb77af952312e" },
        { url: "settings.html", revision: "330b4fa8eb97189c47a87c7118501634" },
        {
          url: "src/assets/favicon.ico",
          revision: "fb8385b4d6ce20d1b903e39d2c55ea2f",
        },
        {
          url: "src/assets/phone.png",
          revision: "e8eeb8d7c57affb4c66a6b6b74fd44a6",
        },
        {
          url: "src/assets/thalesboygif.gif",
          revision: "7b43c8f3e6b77c138b3c1c8352dea577",
        },
        { url: "src/main.ts", revision: "e4d0a7aa036878905e8915f9ffeb89f6" },
        { url: "src/menu.ts", revision: "7f75df0fa54bc3f07180fdf4938b69a6" },
        {
          url: "src/settings.ts",
          revision: "c36b939270eeaaa40b3516b8702f9605",
        },
        {
          url: "src/styles/index.css",
          revision: "08d5a61486c23d7fdc1a1c67c409df51",
        },
        {
          url: "src/styles/menu.css",
          revision: "8b7969cf1bf6d4ae4e5e52864f16ab34",
        },
        {
          url: "src/styles/settings.css",
          revision: "1ded2d9532f10bc066823fef6948e190",
        },
        { url: "tsconfig.json", revision: "e41a989ed21e7f12661ceb630c155864" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    );
});
//# sourceMappingURL=sw.js.map
