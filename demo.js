// Set Canvas height and width slightly larger than the window size
const extra = 100;
const canvas = document.getElementById("canvas");
canvas.height=window.innerHeight + extra;
canvas.width=window.innerWidth + extra;

// get Canvas Context
let ctx = canvas.getContext("2d");

// Create a blob 
const blob = new mrBlob();

// Activate the animation of the blob with the blob object (blob) and the context (ctx)
document.addEventListener("DOMContentLoaded", function (e) {
    blob.animateBlob(ctx);
});


//////// Handle button functions and events in the demo page ////////

document.addEventListener("input", function (e) {
    updateBlob(blob);
});

document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        updateBlob(blob);
    }
    if (e.code === "Space") { 
        invertBlob();
    }
});

function updateBlob(blob){
    var input_wave_speed = document.getElementById('input_waveSpeed');
    var input_rise_speed = document.getElementById('input_riseSpeed');
    var input_diameter = document.getElementById('input_diameter');
    var input_bumps = document.getElementById('input_bumps');
    var input_roughness = document.getElementById('input_roughness');

    var val_wave_speed = parseFloat(input_wave_speed.value);
    var val_rise_speed = parseFloat(input_rise_speed.value);
    var val_diameter = parseFloat(input_diameter.value);
    var val_bumps = parseInt(input_bumps.value);
    var val_roughness = parseFloat(input_roughness.value);
    
    blob.updateParams(val_wave_speed, val_rise_speed, val_diameter, val_bumps, val_roughness);
}

function invertBlob() {
    blob.invert();
}

function switchDirection() {
    blob.switchDirection();
}

function stopPlay() {
    const playBtn = document.getElementById("play");
    if(playBtn.textContent == "Play"){
        playBtn.textContent = "Stop";
    } else {
        playBtn.textContent = "Play";
    }
    blob.stopPlay();
}