
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth / 100 * 70;
canvas.height = window.innerHeight / 100 * 99.6;
var c = canvas.getContext('2d');
var totalOffset = 0;
var previousRPM = 0;
var previousTeeth = 0;
class gear {
    constructor(name) {
        this.module = 0;
        this.pcd = 50;
        this.teeth = 0;
        this.rpm = 0;
        
    }
    
}
document.getElementById("teeButton").onmouseover = function() {
    if(gears[selectedGear].module == 0 || gears[selectedGear].pcd == 0) {
        document.getElementById("teeButton").style.backgroundColor = "#939393";
    } else {
        document.getElementById("teeButton").style.backgroundColor = "#0ab34d";
    }
}
document.getElementById("teeButton").onmouseout = function() {
    document.getElementById("teeButton").style.backgroundColor = "#000a24";
}
document.getElementById("pcdButton").onmouseover = function() {
    if(gears[selectedGear].module == 0 || gears[selectedGear].teeth == 0) {
        document.getElementById("pcdButton").style.backgroundColor = "#939393";
    } else {
        document.getElementById("pcdButton").style.backgroundColor = "#0ab34d";
    }
}
document.getElementById("pcdButton").onmouseout = function() {
    document.getElementById("pcdButton").style.backgroundColor = "#000a24";
}
document.getElementById("modButton").onmouseover = function() {
    if(gears[selectedGear].teeth == 0 || gears[selectedGear].pcd == 0) {
        document.getElementById("modButton").style.backgroundColor = "#939393";
    } else {
        document.getElementById("modButton").style.backgroundColor = "#0ab34d";
    }
}
document.getElementById("modButton").onmouseout = function() {
    document.getElementById("modButton").style.backgroundColor = "#000a24";
}
var gears = [new gear()];
var selectedGear = 0;

function update() { 
    gears[selectedGear].module = document.getElementById("module").value;
    gears[selectedGear].teeth = document.getElementById("teeth").value;
    gears[selectedGear].pcd = document.getElementById("pcd").value;
    gears[selectedGear].rpm = document.getElementById("rpm").value;
    
    if(gears[selectedGear].rpm != previousRPM || gears[selectedGear].teeth != previousTeeth) {
        
        if(selectedGear != 0) {
            
            var i = selectedGear;
            while(i!=0) {
                i-=1;
                gears[i].rpm = gears[i+1].rpm * gears[i+1].teeth / gears[i].teeth;
                
            }
        }
        if(selectedGear != gears.length - 1) {
            var i = selectedGear;
            while(i != gears.length - 1) {
                i+=1;
                gears[i].rpm = gears[i-1].rpm * gears[i-1].teeth / gears[i].teeth;
            }
            
        }
    }
    previousRPM = gears[selectedGear].rpm;
    previousTeeth = gears[selectedGear].teeth

    changeColor();
    c.clearRect(0, 0, canvas.width, canvas.height);
    totalOffset = -100;
    for(i = 0; i < gears.length; i++) {
        if (i != 0) {
            totalOffset += Number(gears[i].pcd / 2 + 2); // add radius and add lineWidth / 2 but scales 2x
        }
        
        c.strokeStyle = "#2656BD";
        c.fillStyle = c.strokeStyle;
        c.lineWidth = 8;
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2 + totalOffset * 2, gears[i].pcd, 0, 2 * Math.PI);
        // takes in radius = pcd / 2 but scales 2x
        c.stroke();
        if(i == selectedGear) {
            c.fill();
        }
        totalOffset += Number(gears[i].pcd / 2 + 2); // add radius
    }
}

function newGear() {
    gears.push(new gear());
}

function higher(){
    if(selectedGear != gears.length - 1) {
        selectedGear += 1;
        document.getElementById("module").value = gears[selectedGear].module;
        document.getElementById("teeth").value = gears[selectedGear].teeth;
        document.getElementById("pcd").value = gears[selectedGear].pcd;
        document.getElementById("rpm").value = Math.round(gears[selectedGear].rpm * 100) / 100;
    }
}
function lower(){
    if(selectedGear != 0) {
        selectedGear -= 1;
        document.getElementById("module").value = gears[selectedGear].module;
        document.getElementById("teeth").value = gears[selectedGear].teeth;
        document.getElementById("pcd").value = gears[selectedGear].pcd;
        document.getElementById("rpm").value = Math.round(gears[selectedGear].rpm * 100) / 100;
    }
}

function changeColor() {
    if(gears[selectedGear].module == 0 || gears[selectedGear].pcd == 0) {
        document.getElementById("teeButton").style.borderColor = "#939393";
    } else {
        document.getElementById("teeButton").style.borderColor = "#0ab34d";
    }
    if(gears[selectedGear].module == 0 || gears[selectedGear].teeth == 0) {
        document.getElementById("pcdButton").style.borderColor = "#939393";
    } else {
        document.getElementById("pcdButton").style.borderColor = "#0ab34d";
    }
    if(gears[selectedGear].teeth == 0 || gears[selectedGear].pcd == 0) {
        document.getElementById("modButton").style.borderColor = "#939393";
    } else {
        document.getElementById("modButton").style.borderColor = "#0ab34d";
    }
}
function getPcd() {
    mod = gears[selectedGear].module;
    teeth = gears[selectedGear].teeth;
    document.getElementById("pcd").value = teeth * mod;
}
function getTee() {
    pcd = gears[selectedGear].pcd;
    mod = gears[selectedGear].module;
    document.getElementById("teeth").value = pcd / mod;
}
function getMod() {
    pcd = gears[selectedGear].pcd;
    teeth = gears[selectedGear].teeth;
    document.getElementById("module").value = pcd / teeth;
}

setInterval(update, 100);