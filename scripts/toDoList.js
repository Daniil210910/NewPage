let importantAndUrgent;
let importantAndNotUrgent;
let notImportantAndUrgent;
let notImportantAndNotUrgent;
let liInput;

(function () {
    importantAndUrgent = document.getElementById("importantAndUrgent");
    importantAndNotUrgent = document.getElementById("importantAndNotUrgent");
    notImportantAndUrgent = document.getElementById("notImportantAndUrgent");
    notImportantAndNotUrgent = document.getElementById("notImportantAndNotUrgent");
    liInput = document.getElementsByClassName("toDoList");

    quadrants = [importantAndUrgent, importantAndNotUrgent, notImportantAndUrgent, notImportantAndNotUrgent];
    quadrants.forEach(quadrant => {
        const button = quadrant.getElementsByTagName("button")[0];
        button.addEventListener("click", () => {
            addNewTask(quadrant);
        });


    });

    searchInput = liInput.getElementsByTagName("input")[0];
    searchInput.addEventListener("click");

    // console.log(liInput[2]);

    // searchInput.forEach(searchInput => {
    //     const doneInput = searchInput.getElementsByTagName("input")[0];
    //     doneInput.addEventListener("click");
    //     console.log(doneInput);
    // });

})();

function addNewTask(quadrant) {
    const value = getInputValue(quadrant);
    if (value) {
        addNewItem(value, quadrant);

    } else {
        alert("Please add value to input")
    }
}

function getInputValue(quadrant) {
    return quadrant.getElementsByClassName("form-control")[0].value;

}

function addNewItem(value, quadrant) {
    const list = quadrant.getElementsByClassName("toDoList")[0];
    const newLi = getLiWithText(value);
    list.appendChild(newLi);
}

function getLiWithText(value) {
    const newLiItem = document.createElement("li");
    const checkbox = getCheckBox();
    const text = document.createTextNode(value);
    const space = document.createTextNode(" ");
    const icon = getDeleteIcon();
    newLiItem.appendChild(checkbox);
    newLiItem.appendChild(text);
    newLiItem.appendChild(space);
    newLiItem.appendChild(icon);

    return newLiItem;
}

function getCheckBox() {
    const input = document.createElement("input");
    input.type = "checkbox";
    return input;

}

function getDeleteIcon() {
    const i = document.createElement("i");
    i.className = "fas fa-trash"
    return i;
}