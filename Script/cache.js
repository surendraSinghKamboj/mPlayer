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
    '/images/logo.png'
]
self.addEventListener('install', event => {
    event.waitUntil(async()=>{
        const cache = await caches.open("pwa-assets")
        return cache.addAll(urlsToCache)
    })
})

window.addEventListener('click',event=>{
    fetch("./Music/ukulele-trip-version-60s-9893.mp3")
    .then(res=>console.log("From Script.js",res))
})