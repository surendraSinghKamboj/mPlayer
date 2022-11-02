//App version
var appVersion = '1.0.3';

var urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/Style/style.css',
    '/Script/script.js',
    '/SVG/mic-svgrepo-com.svg',
    '/SVG/minus.svg',
    '/SVG/mute.svg',
    '/SVG/next.svg',
    '/SVG/pause.svg',
    '/SVG/play.svg',
    '/SVG/plus.svg',
    '/SVG/previous.svg',
    '/SVG/speaker.svg',
    '/SVG/vinyl-record-svgrepo-com.svg',
    '/images/logo.png',
    '/Music/ukulele-trip-version-60s-9893.mp3'
]

//=================================================>
/* self.addEventListener('install', event => {
    event.waitUntil(async()=>{
        const cache = await caches.open(appVersion)
        return cache.addAll(urlsToCache)
    })
    console.log(event);
}) */

// Install SW
//==================================================>

self.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(appVersion)
        .then(cache=>{
            cache.addAll(urlsToCache)
        }).catch(err=>{
            console.log('Not Cached',err)
        })
    )
})

//Activate
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all
                cacheNames.map(cache => {
                    if (cache !== appVersion) {
                        console.log("Deleting old Caches", cache);
                        return caches.delete(cache);
                    }
                })
            })
    )
    return self.clients.claim();
})

//fetch

self.addEventListener("fetch", event => {
    // console.info("SW fetching", event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                return res || fetch(event.request);
            })
    )
    // console.info('Files are fetched');
})
