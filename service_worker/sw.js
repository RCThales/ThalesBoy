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
          url: "../public/audio/inspect.wav",
          revision: "b812703017f41967a542ea6229bd6c26",
        },
        {
          url: "../public/audio/startgame.wav",
          revision: "8f80837487f0e4a83b15b85edfdf8a9c",
        },
        {
          url: "../public/audio/consoleOnAudio.mp3",
          revision: "d4d9a56ae74b9a8cc523690146b0523e",
        },
        {
          url: "../public/audio/powerButtonAudio.mp3",
          revision: "7ad17ae8901bb65bd51d2b3afad7f863",
        },
        {
          url: "../dist/client/games.js",
          revision: "28d0c83d65a3f9d47838f6c03c9cae98",
        },
        {
          url: "../dist/client/index.js",
          revision: "25641e65eaa30ce5fddcc48a3fa947a8",
        },
        {
          url: "../dist/client/menu.js",
          revision: "fee8f3af30e545d6fd65e75179828906",
        },
        {
          url: "../dist/client/settings.js",
          revision: "9c9ceaa636afdf209c4bdbb1857d8398",
        },
        { url: "../index.html", revision: "70e2fae6ca8e0441fafc0724029a1ead" },
        { url: "../menu.html", revision: "7a88f435a912eff31f2cefb99efced14" },
        {
          url: "../package-lock.json",
          revision: "a4f3f8c9a79b944d1a4c988bca79f4b8",
        },
        {
          url: "../package.json",
          revision: "5cfd591ca9edfa999f607824037ab108",
        },
        { url: "../README.md", revision: "0e28616a54d816b2907bb77af952312e" },
        {
          url: "../settings.html",
          revision: "330b4fa8eb97189c47a87c7118501634",
        },
        {
          url: "../public/assets/favicon.ico",
          revision: "fb8385b4d6ce20d1b903e39d2c55ea2f",
        },
        {
          url: "../public/assets/phone.png",
          revision: "e8eeb8d7c57affb4c66a6b6b74fd44a6",
        },
        {
          url: "../public/assets/thalesboygif.gif",
          revision: "7b43c8f3e6b77c138b3c1c8352dea577",
        },
        {
          url: "../src/client/index.ts",
          revision: "e4d0a7aa036878905e8915f9ffeb89f6",
        },
        {
          url: "../src/client/menu.ts",
          revision: "7f75df0fa54bc3f07180fdf4938b69a6",
        },
        {
          url: "../src/client/settings.ts",
          revision: "c36b939270eeaaa40b3516b8702f9605",
        },
        {
          url: "../src/styles/index.css",
          revision: "08d5a61486c23d7fdc1a1c67c409df51",
        },
        {
          url: "../src/styles/menu.css",
          revision: "8b7969cf1bf6d4ae4e5e52864f16ab34",
        },
        {
          url: "../src/styles/settings.css",
          revision: "1ded2d9532f10bc066823fef6948e190",
        },
        {
          url: "../tsconfig.json",
          revision: "e41a989ed21e7f12661ceb630c155864",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    );
});
//# sourceMappingURL=sw.js.map
