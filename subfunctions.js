const changeColor = (changeColorElement, color) => {
    document.getElementById(changeColorElement.id).style.backgroundColor = color;
};

const isNull = (isNullInput1, isNullInput2, isNullInput3, errorPrintLocationID) => {
    let isNullTally = 0;
    if (isNullInput1 == null || isNullInput1.value == '') {
        changeColor(isNullInput1, "pink");
        isNullTally++;
    };
    if (isNullInput2 == null || isNullInput2.value == '') {
        changeColor(isNullInput2, "pink");
        isNullTally++;
    };
    if (isNullInput3 == null || isNullInput3.value == '') {
        changeColor(isNullInput3, "pink");
        isNullTally++;
    }
    if (isNullTally !== 0) {
        document.getElementById(errorPrintLocationID).innerHTML += "Fill All Fields";
        return true;
    };
    return false;
};    

const isPlayerHandleValid = (playerHandleInput) => {
    //Here I want to check both that the handle is made up
    if (
        /^[A-Za-z0-9 ]+$/.test(playerHandleInput.value)
        // && checking it is unique
        ) {
        return true;
    };
    return false;
};

const isPlayerWinsOrLossesValid = (isPlayerWinsOrLossesValidInput) => {
    //Here I cam checking that the number entered is actually just a number
    if (/[0-9]+$/.test(isPlayerWinsOrLossesValidInput.value)) {
        return true;
    };
    return false;
};

const validationSuite = (playerHandleInput, playerWinInput, playerLossInput) => {
    let errorTally = 0;
    
    //Need to validate the username
    if (isPlayerHandleValid(playerHandleInput)) {
    } else {
        changeColor(playerHandleInput, "pink")
        document.getElementById(playerHandleInput.id + "Error").innerHTML += "Handle needs to be only Letters, Numbers, and Spaces <br>";
        errorTally++;
    };
    //Need to validate the wins and losses
    if (isPlayerWinsOrLossesValid(playerWinInput)) {
    } else {
        changeColor(playerWinInput, "pink")
        document.getElementById(playerWinInput.id + "Error").innerHTML += "Wins needs to be a number <br>";
        errorTally++;
    };
    if (isPlayerWinsOrLossesValid(playerLossInput)) {
    } else {
        changeColor(playerLossInput, "pink")
        document.getElementById(playerLossInput.id + "Error").innerHTML += "Losses needs to be number <br>";
        errorTally++;
    };
    if (errorTally !== 0) {
        return false;
    };
    return true;
    //Need two subfunctions, isPlayerHandleValid() and isPlayerWinsOrLossesValid()
};

const percentage = (numerator, demoninator) => {
    let result = numerator.value / demoninator.value;
    result = result * 100;
    return Math.trunc(result);
};

const addPlayerToArray = (playerHandleInput, playerWinInput, playerLossInput, playerArray) => {
    playerArray.push({
        Player: playerHandleInput.value,
        Wins: playerWinInput.value,
        Losses: playerLossInput.value,
        'Win%': percentage(playerWinInput, playerLossInput)
    });
};