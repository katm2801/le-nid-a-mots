/* Le Nid à mots : fonctionnement hors ligne */
var CACHE='nid-a-mots-202611131016';
var CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});}));}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  var req=e.request;if(req.method!=='GET'){return;}
  var url=new URL(req.url);
  if(req.mode==='navigate'){e.respondWith(fetch(req).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){c.put('./index.html',cp);});return r;}).catch(function(){return caches.match('./index.html');}));return;}
  if(/fonts\.(googleapis|gstatic)\.com/.test(url.host)){e.respondWith(caches.match(req).then(function(hit){return hit||fetch(req).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(req,cp);});return r;}).catch(function(){return hit;});}));return;}
  if(url.origin===location.origin){e.respondWith(caches.match(req).then(function(hit){return hit||fetch(req).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(req,cp);});return r;});}));}
});
