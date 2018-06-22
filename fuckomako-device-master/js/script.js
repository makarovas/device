var link = document.querySelector(".write-us-btn");

var popup = document.querySelector(".modal-write-us");
var popup_close = popup.querySelector(".modal-close");

var form = popup.querySelector(".form-write-us");
var nickname = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=email]");
var letter = popup.querySelector("[name=letter]");

var map_link = document.querySelector(".map");
var map_modal = document.querySelector(".modal-map");
var map_close = map_modal.querySelector(".modal-close");

var storage_name = localStorage.getItem("name");
var storage_email = localStorage.getItem("email");

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("modal-show");

  if (storage_name) {
    nickname.value = storage_name;
    if (storage_email) {
      email.value = storage_email;
      letter.focus();
    } else {
      email.focus();
    }
  } else {
    nickname.focus();
  }

});

popup_close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }

    if (map_modal.classList.contains("modal-show")) {
      map_modal.classList.remove("modal-show");
    }
  }
});

form.addEventListener("submit", function(event) {
  if (!nickname.value || !email.value || !letter.value) {
    event.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    localStorage.setItem("name", nickname.value);
    localStorage.setItem("email", email.value);
  }
});

map_link.addEventListener("click", function(event) {
  event.preventDefault();
  map_modal.classList.add("modal-show");
});

map_close.addEventListener("click", function(event) {
  event.preventDefault();
  map_modal.classList.remove("modal-show");
});

//Далее идет исправление в скрипте карты Яндекса, т.к. протокол там задан по умолчанию и карта не загружается локально.

(function (c, a) { var b = { _modules: {}, require: function (j, k) { j = [].concat.call([], j); var f = 0, d = []; for (var h = 0, e = j.length; h < e; h++) { if (this._modules[j[h]]) { this._modules[j[h]](g(h)) } } function g(i) { return function (l) { d[i] = l; if (++f == j.length) { k.apply(null, d) } } } return this }, define: function (f, h, e) { var i = this, d; h = [].concat.call([], h); this._modules[f] = function (j) { if (!d) { g(j) } else { j(d) } }; function g(o) { var m = [], n = 0; if (h.length) { for (var l = 0; l < h.length; l++) { i.require(h[l], k(l)) } } else { j() } function k(p) { return function (q) { m[p] = q; if (++n === h.length) { j() } } } function j() { e.apply(null, [function (p) { o(d = p) }].concat(m)) } } return this } }; b.define("main", ["map-data", "params"], function (l, m, e) { if (!m.maps || !m.maps.length || !e.testUrl) { return } var f = document.getElementsByTagName("script"), j; for (var g = f.length - 1; g > -1; g--) { j = f[g]; if (j.src.indexOf(e.testUrl) !== -1 && !j.ctorInited) { j.ctorInited = true; break } } if (j) { b.require(["ymaps", "create-map"], function (o, i) { var n; var p = h(); if (e.elementId) { n = document.getElementById(e.elementId); if (!n) { k("DOMElement #" + e.elementId + " not found."); return } else { n.appendChild(p) } } else { if (!document.documentElement.contains(j)) { k("Script element was removed from document."); return } if (d(j)) { j.parentNode.insertBefore(p, j) } else { document.body.appendChild(p) } } i(p); if (j.parentNode) { j.parentNode.removeChild(j) } }) } function h() { var i = document.createElement("ymaps"); i.setAttribute("id", "ymaps" + e.tid); i.style.display = "block"; i.style.width = e.containerSize[0]; i.style.height = e.containerSize[1]; return i } function d(i) { while (i) { if (i.parentNode === document.body) { return true } i = i.parentNode } return false } function k(i) { if (console && console.error) { console.error(i) } } l({}) }); b.define("config", [], function (d) { d(a.config) }); b.define("map-data", [], function (d) { d(c) }); b.define("params", ["config", "map-data"], function (g, e, i) { var h = a.params; var d = e.originalUrl.match(/\/\/(.+)$/); h.testUrl = d && d[1]; h.containerSize = [f(h.size[0]), f(h.size[1])]; h.isEnterprise = (e.originalUrl.indexOf("//enterprise") > -1); h.lang = (h.lang || (i.maps[0] && i.maps[0].state && i.maps[0].state.lang) || "ru_RU").replace("-", "_"); h.tid = String(Number(new Date)) + String(Math.round(Math.random() * 1000000)); h.ns = [e.namespace, h.lang, h.key.replace(/\W/g, ""), h.apikey.replace(/\W/g, ""), (h.isEnterprise ? "_ntrp" : "")].join("__"); function f(j) { if (!j) { return "100%" } else { if (isNaN(Number(j))) { return j } } return j + "px" } g(h) }); b.define("ie-version", [], function (d) { d((function () { var g, e = 3, h = document.createElement("div"), f = h.getElementsByTagName("i"); while (h.innerHTML = "<!--[if gt IE " + (++e) + "]><i></i><![endif]-->", f[0]) { } return e > 4 ? e : g }())) }); b.define("js-loader", [], function (d) { d(function (f, i) { var g = document.getElementsByTagName("head")[0]; var e = document.createElement("script"); var h = function () { if (i) { i(); g.removeChild(e) } i = null }; e.charset = "utf-8"; e.src = f; g.insertBefore(e, g.firstChild); e.onreadystatechange = function () { if (this.readyState == "complete" || this.readyState == "loaded") { h() } }; e.onload = h; e.src = f; return e }) }); b.define("ymaps", ["config", "params", "js-loader"], function (n, f, i, h) { var m = i.ns, e = window[m], j = m + "loader"; if (e && !window[j]) { e.ready(d) } else { if (!window[j]) { var l = "fid" + i.tid, o = f.host; if (window.location.protocol === "file:" && o.indexOf(0) === "/") { o = "https:" + o } var g = o + f.apiVersion + "/", k = ["Map", "GeoObject", "geoObject.addon.balloon", "map.associate.serviceGeoObjects", "geoObject.addon.hint", "templateLayoutFactory", "domEvent.manager", "control.Button", "control.FullscreenControl", "control.GeolocationControl", "control.RouteEditor", "control.RulerControl", "control.SearchControl", "control.TrafficControl", "control.TypeSelector", "control.ZoomControl", "system.browser", "meta", "mapType.storage", "option.presetStorage"], g = [g, "?lang=", i.lang, "&coordorder=longlat&load=", k.join(","), "&wizard=constructor&ns=", i.ns].join(""); if (i.key) { g += "&key=" + i.key } if (i.apikey) { g += "&apikey=" + i.apikey } h(g + "&onload=" + l); window[l] = function (p) { p.ready(function () { q(); function q() { var t = window[j]; try { delete window[l]; delete window[j] } catch (u) { window[l] = window[j] = null } for (var s = 0, r = t.queue.length; s < r; s++) { t.queue[s]() } } }) }; window[j] = { queue: [d], callback: window[l] } } else { window[j].queue.push(d) } } function d() { n(window[m]) } }); b.define("check-size-component", ["config", "params", "distribution"], function (g, e, h, d) { var f; g(function (j) { j.container.events.add(["fullscreenenter", "fullscreenexit"], i); if (window.attachEvent) { window.attachEvent("onresize", i) } else { window.addEventListener("resize", i) } function i() { var o = document.documentElement, t = j.container.isFullscreen() ? [o.clientWidth, o.clientHeight] : j.container.getSize(), k = e.minContainerSize, p = t.toString() == "0,0", m = (t[0] < k[0]), r = !p && (m || (t[1] < k[1])), s = ["rulerControl", "routeEditor", "searchControl", "trafficControl", "geolocationControl"]; for (var q = 0, n = s.length; q < n; q++) { j.controls.get(s[q]).options.set("visible", !r) } if (j.state.get("narrowMode") || !j.options.get("suppressMapOpenBlock", false)) { if (j.state.get("narrowMode") !== m) { if (m) { d.show(j) } else { d.hide(j) } } else { if (m) { d.onResize(j) } } } if (j.state.get("compactMode") !== r) { if (r) { j.controls.remove("typeSelector"); j.controls.get("zoomControl").options.set({ position: { top: 10, left: 10 }, size: "small" }) } else { j.controls.add("typeSelector"); j.controls.get("zoomControl").options.unset(["position", "size"]) } } if (p) { if (!f) { f = window.setInterval(i, 200) } } else { if (f) { window.clearInterval(f); f = 0 } } j.state.set({ compactMode: r, narrowMode: m }) } i() }) }); b.define("create-map", ["config", "params", "map-data", "check-size-component", "ymaps"], function (g, f, j, e, d, i) { var h = e.maps[0]; g(function (l) { var o = i.templateLayoutFactory.createClass("{{ properties.iconContent }}", { build: function () { o.superclass.build.call(this); var y = this.getData().properties.get("iconContent"); if (y && String(y).length > 2) { var x = this.getElement(); x.style.fontSize = "9px"; x.style.lineHeight = "16px"; x.style.display = "block" } } }), m = { autoFitToViewport: "always", geoObjectStrokeOpacity: 1, geoObjectFillOpacity: 1, geoObjectStrokeColor: "ff0000e6", geoObjectStrokeWidth: 5, geoObjectFillColor: "ff000099", geoObjectBalloonContentLayout: i.templateLayoutFactory.createClass("{{ properties.name|raw }}"), geoObjectIconContentLayout: o, geoObjectZIndexActive: Math.pow(10, 9) + 10, geoObjectZIndexHover: Math.pow(10, 9) + 9 }; if (!j.isEnterprise) { m.searchControlProvider = "yandex#search" } var k = new i.Map(l, { center: h.state.center, zoom: Math.round(h.state.zoom), type: h.state.type, controls: ["fullscreenControl", "rulerControl", "routeEditor", "searchControl", "trafficControl", "typeSelector", "zoomControl", "geolocationControl"] }, m); d(k); k.state.set({ mapSid: h.properties.sid, mapSourceType: j.sourceType }); if (!j.scrollZoomBehavior) { k.behaviors.disable("scrollZoom") } var w = e.presetStorage; for (var u in w) { if (w.hasOwnProperty(u)) { i.option.presetStorage.add(u, w[u]) } } if (h.state.traffic && h.state.traffic.shown) { k.controls.get("trafficControl").state.set("trafficShown", true) } var q = h.geoObjects.features, p = i.map.associate.serviceGeoObjects.get(k); for (var n = 0, t = q.length; n < t; n++) { var s = q[n]; var v; if (s.options) { v = r(s.options.preset || "") } p.add(new i.GeoObject({ geometry: s.geometry, properties: s.properties }, { preset: v, zIndex: (s.options && s.options.zIndex) || (n + 1) })) } function r(y) { if (y.indexOf("___sport") > -1) { var x = y.split("___"); return ["islands#", x[1], "Run", x[0].indexOf("circle") > -1 ? "CircleIcon" : "Icon"].join("") } if (y[0] === "#") { return j.sid + "" + y } else { return y.replace(/^twirl#/, "islands#").replace(/^default#/, "islands#").replace(/Dot$/, "Icon").replace("white", "gray") } } }) }); b.define("distribution", ["config", "params", "ymaps", "ymaps-counter", "ie-version"], function (r, g, j, e, s, k) { var n = { ru_RU: "На большую карту", en_US: "See full-size map", ru_UA: "На большую карту", uk_UA: "На велику карту", tr_TR: "Haritalar'da aç" }; var q = n[j.lang] || n.ru_RU; var h = ["data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAxNCAyMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtLjUgLS4yMjIpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01LjUgMjMuMjIybDUuNTM1LTcuNTdzMS42LTIuMTg1IDIuNjEtNC4xNWMxLjAxLTEuOTY2Ljg0NS00LjI4Ljg0NS00LjI4TDggMTMuMiA1LjUgMjMuMjJ6IiBmaWxsPSIjQ0QwMDAwIi8+PGNpcmNsZSBmaWxsPSIjRTAwIiBjeD0iNy41IiBjeT0iNy4yMjIiIHI9IjciLz48ZWxsaXBzZSBmaWxsPSIjRkZGIiBjeD0iNy41IiBjeT0iNy4yMjIiIHJ4PSIzIiByeT0iMyIvPjwvZz48L3N2Zz4="].join(""); var o = "background-size: 10px 16px; background-repeat: no-repeat; background-position: left center;display: inline-block;"; if (k < 9) { o = "" } var d; var p; var t; r({ show: function (u) { u.options.set({ copyrightLogoVisible: false, suppressMapOpenBlock: true }); l(u); f(u); p.events.add("click", function () { window.open([g.mapHost, "?um=", j.sourceType, ":", j.sid, "&source=constructor"].join("")); v("mapsButton-constructor.smallMap") }); function v(w) { s.countByKey("distribution", [w, e.system.browser.platform, e.meta.version.replace(/\W/g, "_")].join(".")) } }, onResize: function (u) { m(u) }, hide: function (u) { if (p) { u.controls.remove(p) } i(u); u.panes.get("copyrights").getElement().style.marginBottom = "0px"; u.options.unset(["copyrightLogoVisible", "suppressMapOpenBlock"]); if (d) { d.removeAll(); d = null } } }); function l(v) { t = "cnst_" + (+(new Date())); p = new e.control.Button({ data: { content: '<ymaps style="display: block; text-align:center;"><ymaps class="' + t + '" style="' + o + '">' + q + "</ymaps></ymaps>" }, options: { maxWidth: "99999", selectOnClick: false } }); v.controls.add(p, { position: { left: 10, right: 10, bottom: 5 } }); if (p.getLayoutSync()) { u(p.getLayoutSync()) } else { p.getLayout().then(u) } function u(x) { var w = x.getElement(); if (w && w.firstChild && w.parentNode) { w.firstChild.style.width = "100%"; if (w.firstChild.firstChild) { w.firstChild.firstChild.style.padding = "0px" } } } v.panes.get("copyrights").getElement().style.marginBottom = "29px"; m(v) } function m(v) { if (k < 9) { return } if (p) { if (p.getLayoutSync()) { u(p.getLayoutSync()) } else { p.getLayout().then(u) } } function u(y) { var x = y.getElement().querySelector("." + t); var w = v.container.getSize(); if (w[0] < 175) { x.style.paddingLeft = "0px"; x.style.backgroundImage = null } else { x.style.paddingLeft = "18px"; x.style.backgroundImage = "url(" + h + ")" } } } function f(u) { u.controls.remove("fullscreenControl") } function i(u) { u.controls.add("fullscreenControl") } }); b.define("ymaps-counter", ["ymaps"], function (d, f) { var e; d({ countByKey: function (g, h) { if (e) { e.then(function (i) { i.countByKey(g, h) }) } else { e = f.modules.require("yandex.counter").then(function (j) { var i = j[0]; i.countByKey(g, h); return i }) } } }) }); b.require("main", function () { }) }({ "ymj": "1.0", "maps": [{ "properties": { "sid": "RDUQfAdTpPxf2D-3Zi5kxJBx49zXnQ6N", "authorUid": "45900345", "updated": 1473385000, "created": 1472197045, "favourite": 0, "access": "public", "name": "device-map", "description": "" }, "state": { "center": [37.53213918936342, 55.68725814973584], "zoom": 15, "size": [960, 560], "lang": "", "type": "yandex#map", "traffic": { "shown": false } }, "geoObjects": { "type": "FeatureCollection", "features": [{ "type": "Feature", "properties": { "name": "Россия, Москва, улица Строителей, 15", "description": "" }, "geometry": { "type": "Point", "coordinates": [37.529654, 55.68698] }, "options": { "preset": "islands#redDotIcon" } }] } }] }, { "config": { "host": "https://api-maps.yandex.ru/", "originalUrl": "https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=RDUQfAdTpPxf2D-3Zi5kxJBx49zXnQ6N&width=960&height=560&id=yandex-map&lang=ru_RU&sourceType=constructor&scroll=true", "namespace": "ymaps_ctor", "apiVersion": "2.1.41", "minContainerSize": [320, 200], "mapHost": "https://yandex.ru/maps/" }, "params": { "scrollZoomBehavior": true, "size": ["960", "560"], "sid": "RDUQfAdTpPxf2D-3Zi5kxJBx49zXnQ6N", "elementId": "yandex-map", "lang": "ru_RU", "sourceType": "constructor", "key": "", "apikey": "", "buttonType": 3 } }));
