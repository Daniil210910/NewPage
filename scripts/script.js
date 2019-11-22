function onBulb() {
    const bulb = document.getElementsByTagName("i");
    const light = document.getElementsByTagName("body");
    const text = document.getElementsByTagName("h1");
    const newColor = document.getElementById("color").value;
    if (newColor) {
        bulb[0].style.color = newColor;
    } else {
        bulb[0].style.color = "#ffed00";
    }
    light[0].style.backgroundColor = "#ffffff";
    text[0].innerHTML = "Bulb is: ON";
}

function offBulb() {
    const bulb = document.getElementsByTagName("i");
    const light = document.getElementsByTagName("body");
    const text = document.getElementsByTagName("h1");
    bulb[0].style.color = "#000000";
    light[0].style.backgroundColor = "rgb(160, 160, 160)";
    text[0].innerHTML = "Bulb is: OFF";
}