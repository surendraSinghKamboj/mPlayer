//Element Defines
var elem = document.documentElement;
// alert("Javascript working...........");
var player = document.getElementById('player');
//Add Key Event Listner
document.addEventListener('keydown', (event) => {
    var code = event.code;
    // Work With KeyCode
    if (code === "Space") {
        if (document.getElementById('pause').getAttribute("class") === "button pause hide") {
            play();
        } else {
            pause();
        }
    } else if (code === 'ArrowRight') {
        forward();
    } else if (code === 'ArrowLeft') {
        rewind();
    } else if (code === 'ArrowDown') {
        minus();
    } else if (code === 'ArrowUp') {
        plus();
    } else if (code === 'KeyM') {
        muteunmute();
    }
})

player.addEventListener("timeupdate", function () {
    var currentTime = player.currentTime;
    var duration = player.duration;
    if (player.volume === 1.3877787807814457e-16) {
        document.getElementById('mute-unmute').setAttribute("src", "SVG/mute.svg")
    } else {
        document.getElementById('mute-unmute').setAttribute("src", "SVG/speaker.svg")
    }
    if (currentTime === duration) {
        document.getElementById('pause').setAttribute("class", "button pause hide");
        document.getElementById('play').setAttribute("class", "button play");
        document.getElementById('disc').setAttribute("class", "disc");
    } else {
        var width = currentTime * 100 / duration;
        document.getElementById('progress').style.width = width + "%";
        durationMin = Math.round(duration / 60);
        durationSec = Math.round(duration % 60);
        var volume = document.getElementById('player').volume;
        document.getElementById('volumebar').style.width = volume * 100 + "px";
        if (durationMin < 10) {
            document.getElementById('dmin').innerHTML = '0' + durationMin + ":";
        } else {
            document.getElementById('dmin').innerHTML = durationMin + ":";
        }
        if (durationSec < 10) {
            document.getElementById('dsec').innerHTML = '0' + durationSec;
        } else {
            document.getElementById('dsec').innerHTML = durationSec;
        }
        currentTimeMin = Math.round(currentTime / 60);
        currentTimeSec = Math.round(currentTime % 60);
        if (currentTimeMin < 10) {
            document.getElementById('cmin').innerHTML = '0' + currentTimeMin + ":";
        } else {
            document.getElementById('cmin').innerHTML = currentTimeMin + ":";
        }
        if (currentTimeSec < 10) {
            document.getElementById('csec').innerHTML = '0' + currentTimeSec;
        } else {
            document.getElementById('csec').innerHTML = currentTimeSec;
        }
    }
});

function play() {
    document.getElementById('player').play();
    document.getElementById('play').setAttribute("class", "button play hide");
    document.getElementById('pause').setAttribute("class", "button pause");
    document.getElementById('disc').setAttribute("class", "disc discs");
}
function pause() {
    document.getElementById('player').pause();
    document.getElementById('pause').setAttribute("class", "button pause hide");
    document.getElementById('play').setAttribute("class", "button play");
    document.getElementById('disc').setAttribute("class", "disc");
}
// File Uploader Function
function fileUploader() {
    var imp = document.getElementById("get-files");
    //access and handle files

    for (i = 0; i < imp.isDefaultNamespace.length; i++) {
        let file = imp.files[i];
        // console.log(file.name);
        var player = document.getElementById('player').setAttribute("src", "Music/" + file.name);
        document.getElementById('name').innerHTML = file.name;
        document.getElementById('pause').setAttribute("class", "button pause hide");
        document.getElementById('play').setAttribute("class", "button play");
        document.getElementById('disc').setAttribute("class", "disc");
    }
    player.autoplay = true;
}
function forward() {
    document.getElementById('player').currentTime += 30.0;
}
function rewind() {
    document.getElementById('player').currentTime -= 30.0;
}
function plus() {
    document.getElementById('player').volume += 0.1;
}
function minus() {
    document.getElementById('player').volume -= 0.1;
}
function muteunmute() {
    var vol = document.getElementById('player').volume;
    if (vol === 0) {
        document.getElementById('player').volume += .6;
        document.getElementById('mute-unmute').setAttribute("src", "SVG/speaker.svg");
    } else {
        document.getElementById('player').volume = 0;
        document.getElementById('mute-unmute').setAttribute("src", "SVG/mute.svg");
    }
}


window.addEventListener('click', event => {
    let fetchMusic = async function () {
     return await fetch("./Music/ukulele-trip-version-60s-9893.mp3")
    }
    fetchMusic().then(res => console.log("From Script.js", res)).catch(err=>{
        console.log("error in fetching Music");
    })
})