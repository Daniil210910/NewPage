let randomNumber;
let input;

(function () {
    randomNumber = getRandomNumber(100);
    input = document.getElementById("checkField");
    const checkBtn = document.getElementById("checkBtn");

    console.log(randomNumber);

    checkBtn.addEventListener("click", () => {
        checkNumber(input.value, randomNumber);
    });

})();

function checkNumber(value, number) {
    if (value == " ") {
        alert("Please add number !");
    } else {
        checkValues(value, number);
    }
};

function checkValues(value, number) {
    const p = document.getElementById("status");
    if (value > number) {
        p.innerHTML = "Your number is greather than Random Number";
        p.className = "wrong"
    } else if (value < number) {
        p.innerHTML = "Your number is less than Random Number";
        p.className = "wrong"
    } else {
        p.innerHTML = `You won !!! I was thinking about ${number}`;
        p.className = "success"
        input.value = "";
        randomNumber = getRandomNumber(10);
        console.log(randomNumber);
    }
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n + 1);
}