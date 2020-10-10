'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "08ca2bf1b4b146733fd9bf7ce0f6cf26",
"/": "08ca2bf1b4b146733fd9bf7ce0f6cf26",
"main.dart.js": "03098569d7b4775c32e784670bae97ac",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "8dbcdec339243246f302f3203d3d6cd1",
"assets/images/memorial_day_icon.png": "4c83c21ff21660f3c34b53d9ccaffbe9",
"assets/images/add.png": "cf0d81c8a61c5c5e568e0ce236c0e99c",
"assets/images/link_icon.png": "b22ecaf125922ac5b11be07ba934cdf9",
"assets/images/icon_configuration.png": "73673010b63727ae8198959c51604b41",
"assets/images/mc_play.png": "49ee01dff602ee11466c5e6f78f3467d",
"assets/images/icon_hope.png": "9346dc61653b8fc13ed1ca5e1dfe8486",
"assets/images/hope_done.png": "51d7940a77b4a257f4b4d40b282f128b",
"assets/images/toolbar_edit.png": "2fcd14a564cf416cc683187be2e38373",
"assets/images/app_icon.png": "58c3999db472b9962be325a586630f12",
"assets/images/empty_icon.png": "2d4c0f9f2803d063475caa4f17c436be",
"assets/images/right_arrow.png": "9fb94c1e58219a20738d505b8c80aba6",
"assets/images/male.png": "9108c02633dd7968cf1819da37fafca5",
"assets/images/finish_hope.png": "8efb178168f6c6b463ff275c43baeb1a",
"assets/images/log_out.png": "6b144f997150c3f86a7d886a5a098b2f",
"assets/images/bottom_nav_me.png": "264f833f3977b62b8b89d7966dad24fa",
"assets/images/bottom_nav_love.png": "f6f6f59efbf758b19419c3a619f1d20e",
"assets/images/taobao_icon.png": "4c727c2b37a6dcbda7ba43444b0de333",
"assets/images/hope_star.png": "80b9b979c94fa0bf1d90b51345d1c389",
"assets/images/poetry_bg.png": "15d6d03012c77762125250afc73575a7",
"assets/images/comment_icon.png": "ba7ed90e5542f66fc348ac06b0f17668",
"assets/images/female.png": "e9287042abca2f60de9ff20137c31ddd",
"assets/images/share_qq_normal.png": "303592ad8510c8e6bf7483dfb9c724d6",
"assets/images/timo.jpeg": "7c35e6be8203421bfb84e85918e10843",
"assets/images/history_item_btn.png": "c42a4e3918344a88746af6516fc8d1fb",
"assets/images/mc_add.png": "47f735fb903f79078393a000931f3134",
"assets/images/hope_finish.png": "d3d42bfac5a8eae4fc6138ecddcab9ba",
"assets/images/share_qq.png": "54ddff556908cbf72b0d67632b64aa69",
"assets/images/tip_icon.png": "2ffe280b6a704b16c34faf1fe730598a",
"assets/images/ig_loading.png": "af636f85db52c43adbeddd5b53a4a95d",
"assets/images/hope_bg.jpg": "c43fa4328ca15d66f42bd087de2e1b91",
"assets/images/hope_star_choosed.png": "17a155610c1d47c84c2372e4248d60e8",
"assets/images/mc_pause.png": "69abcec370a20f428ae5ad23c589ea6c",
"assets/images/memorial_day_bg.png": "2fe05985fdae04245c8fcfb9cb11ba1f",
"assets/images/icon_mc.png": "086328dcee22ca29cea96aed83d49e90",
"assets/images/bottom_nav_home.png": "0a7eb02d640e575d3965825011481b07",
"assets/images/bg_home.jpg": "dbd3a2ab520dee0efb38b9c4742aa839",
"assets/images/travel_list.png": "6a3184940677ca2ffb8f01192a615e25",
"assets/images/about.png": "da3e7a8714687cfe7bc30a2e19510a29",
"assets/images/add_img_icon.png": "ab7503f17f281a4f35c1e249b421a85d",
"assets/images/white_taobao.png": "4a43cdef49a5a8109e698b8938bf6fb7",
"assets/images/mc_delete.png": "e52b152a60ba466b37a21566ebfa352f",
"assets/images/todo_list.png": "f853849233aa525d86ce886a8a5c6080",
"assets/images/net_err.png": "6d72cd9ce78e914cd565bac9e4cf2844",
"assets/images/toolbar_add.png": "15b688ed824ed0ab3dfd6c70a723aa88",
"assets/AssetManifest.json": "ae634ad329507190b3036bcb4e42137d",
"assets/NOTICES": "5194921f86d0bbaa93bbcfc48f44d50a",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }
  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
