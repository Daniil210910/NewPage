let importantAndUrgent;
let importantAndNotUrgent;
let notImportantAndUrgent;
let notImportantAndNotUrgent;

(function () {
    importantAndUrgent = document.getElementById("importantAndUrgent");
    importantAndNotUrgent = document.getElementById("importantAndNotUrgent");
    notImportantAndUrgent = document.getElementById("notImportantAndUrgent");
    notImportantAndNotUrgent = document.getElementById("notImportantAndNotUrgent");


    quadrants = [importantAndUrgent, importantAndNotUrgent, notImportantAndUrgent, notImportantAndNotUrgent];

    quadrants.forEach(quadrant => {
        const button = quadrant.getElementsByTagName("button")[0];
        button.addEventListener("click", () => {
            addNewTask(quadrant);
        });

        const toDoList = quadrant.getElementsByClassName("toDoList")[0];
        const getInput = Array.from(toDoList.getElementsByTagName("input"));
        getInput.forEach(check => {
            check.addEventListener("click", () => {
                markAsDone(check, quadrant, toDoList);
            });
        });

        const trash = Array.from(quadrant.getElementsByTagName("i"));
        trash.forEach(trashI => {
            trashI.addEventListener("click", () => {
                removeLi(trashI, quadrant);
            });
        });



    });

})();

function removeLi(i) {
    const deleteLi = i.parentElement;
    deleteLi.remove();

};

function markAsDone(check, quadrant) {
    const liTask = check.parentElement;
    check.addEventListener("click", () => {
        markNotDone(check, quadrant);
    });
    const done = quadrant.getElementsByClassName("done-list")[0];
    done.appendChild(liTask);

};

function markNotDone(check, quadrant) {
    const liTask = check.parentElement;
    check.addEventListener("click", () => {
        markAsDone(check, quadrant);
    });
    const toDoList = quadrant.getElementsByClassName("toDoList")[0];
    toDoList.appendChild(liTask);
};

function addNewTask(quadrant, check) {
    const value = getInputValue(quadrant);
    if (value) {
        addNewItem(value, check, quadrant);

    } else {
        alert("Please add value to input")
    }
}

function getInputValue(quadrant) {
    return quadrant.getElementsByClassName("form-control")[0].value;

}

function addNewItem(value, check, quadrant) {
    const list = quadrant.getElementsByClassName("toDoList")[0];
    const newLi = getLiWithText(value, quadrant);
    list.appendChild(newLi);
}

function getLiWithText(value, quadrant) {
    const newLiItem = document.createElement("li");
    const checkbox = getCheckBox(quadrant);
    const text = document.createTextNode(value);
    const space = document.createTextNode(" ");
    const icon = getDeleteIcon();

    newLiItem.appendChild(checkbox);
    newLiItem.appendChild(text);
    newLiItem.appendChild(space);
    newLiItem.appendChild(icon);

    return newLiItem;
}

function getCheckBox(quadrant) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("click", () => {
        markAsDone(input, quadrant);
    });
    return input;

}

function getDeleteIcon() {
    const i = document.createElement("i");
    i.className = "fas fa-trash"
    i.addEventListener("click", () => {
        removeLi(i);
    });

    return i;
}