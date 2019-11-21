function onBulp() {
    const bulp = document.getElementsByTagName("i");
    const light = document.getElementsByTagName("body");
    const text = document.getElementsByTagName("h1");
    bulp[0].style.color = "rgb(251, 255, 0)";
    light[0].style.backgroundColor = "#ffffff";
    text[0].innerHTML = "Bulb is: ON"
}

function offBulp() {
    const bulp = document.getElementsByTagName("i");
    const light = document.getElementsByTagName("body");
    const text = document.getElementsByTagName("h1");
    bulp[0].style.color = "#000000";
    light[0].style.backgroundColor = "rgb(160, 160, 160)";
    text[0].innerHTML = "Bulb is: OFF"

}