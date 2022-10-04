function addPlayer (playerHandleInput, playerWinInput, playerLossInput, errorPrintLocationID) {
    //First need to set up the constants and basic formatting required later on
    let playerArray =[];
    changeColor(playerHandleInput, "white");
    changeColor(playerWinInput, "white");
    changeColor(playerLossInput, "white");
    document.getElementById(playerHandleInput.id + "Error").innerHTML = "";
    document.getElementById(playerWinInput.id + "Error").innerHTML = "";
    document.getElementById(playerLossInput.id + "Error").innerHTML = "";
    document.getElementById(errorPrintLocationID).innerHTML = "";

    //Then check that the boxes are not null (requires a subfunction)
    if(isNull(playerHandleInput, playerWinInput, playerLossInput, errorPrintLocationID)) {
        return false;
    };

    //Then need to do validation on the form (require a subfunction)
    if (!validationSuite(playerHandleInput, playerWinInput, playerLossInput)) {
        return false;
    };

    //Then need to add the player details to an array as an object (further subfunction)
    // + calculate the win/loss percentage and give that as a fourth key/value in the object
    addPlayerToArray = (playerHandleInput, playerWinInput, playerLossInput, playerArray);
    console.log(playerArray[0]);
    //Finally need to list the array into the unordered list with id="playerTable"


    //Then return true idk
};