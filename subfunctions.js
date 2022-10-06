const changeColor = (changeColorElement, color) => {
    document.getElementById(changeColorElement.id).style.backgroundColor = color;
};

const clearField = (event, clearFieldInput) => {
    event.preventDefault();
    document.getElementById(clearFieldInput.id).value = null;
};``


const readerReading = (pictureInputField) => {
    document.getElementById(pictureInputField) = reader.readAsDataURL(pictureInputField.files[0]);
};

let addReader = new FileReader();
let editReader = new FileReader();
const addPictureInput = document.getElementById('addPlayerPictureInput');
addPictureInput.onchange = () => {
    addReader.readAsDataURL(addPictureInput.files[0]);
};
let addDataURL;
let editDataURL;
addReader.onload = () => {
    addDataURL = addReader.result;
};
editReader.onload = () => {
    editDataURL = editReader.result;
};

let defaultImageURL = './media/default.png'

const useDefaultImage = (event, previewElementID) => {
    event.preventDefault();
    addDataURL= defaultImageURL;
    editDataURL= defaultImageURL;
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
        document.getElementById(errorPrintLocationID).style.display = "block"
        document.getElementById(errorPrintLocationID).innerHTML += "Fill All Fields";
        return true;
    };
    return false;
};    

const isPlayerHandleUnique = (isPlayerHandleUniqueInput) => {
    let uniqueTally = 0;
    playerArray.forEach((objInArray, i) => {
        if (isPlayerHandleUniqueInput.value === objInArray.player) {
            uniqueTally++;
        }
    });
    if (uniqueTally !== 0) {
        return false;
    };
    return true;
};

const isPlayerHandleValid = (playerHandleInput) => {
    //Here I want to check both that the handle is made up
    if (
        /^[A-Za-z0-9 -]+$/.test(playerHandleInput.value)
        ) {
        return true;
    };
    return false;
};

const isPlayerWinsOrLossesValid = (isPlayerWinsOrLossesValidInput) => {
    //Here I cam checking that the number entered is actually just a number
    if (/^[0-9]+$/.test(isPlayerWinsOrLossesValidInput.value)) {
        return true;
    };
    return false;
};

const validationSuite = (playerHandleInput, playerWinInput, playerLossInput, editBoolean) => {
    let errorTally = 0;
    
    //Need to validate the username as both valid and unique compared to previous entries
    if (isPlayerHandleValid(playerHandleInput)) {
    } else {
        changeColor(playerHandleInput, "pink")
        document.getElementById(playerHandleInput.id + "Error").innerHTML += "Handle needs to be only Letters, Numbers, and Spaces <br>";
        errorTally++;
    };
    if (!isPlayerHandleUnique(playerHandleInput)
        && 
        editBoolean === false) {
        changeColor(playerHandleInput, "pink")
        document.getElementById(playerHandleInput.id + "Error").innerHTML += "Handle needs to be unique<br>";
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

const percentage = (numerator, denominator) => {
    let wins = Number(numerator.value);
    let games = Number(numerator.value) + Number(denominator.value);
    let result = wins / games;
    result = result * 100;
    return result.toFixed(1);
};


const addPlayerToArray = (playerHandleInput, playerWinInput, playerLossInput, playerPictureInput, playerArray) => {
    if (!addDataURL) {
        playerArray.push({
            image: defaultImageURL,
            player: playerHandleInput.value,
            wins: playerWinInput.value,
            losses: playerLossInput.value,
            winPercentage: percentage(playerWinInput, playerLossInput)
        });
    } else {
        playerArray.push({
            image: addDataURL,
            player: playerHandleInput.value,
            wins: playerWinInput.value,
            losses: playerLossInput.value,
            winPercentage: percentage(playerWinInput, playerLossInput)
        })
    };
    clearField(event, playerHandleInput);
    clearField(event, playerWinInput);
    clearField(event, playerLossInput);
    clearField(event, playerPictureInput);
    addDataURL = null;
};

const editPlayerInArray = (editPlayerHandleInput, editPlayerWinInput, editPlayerLossInput, editPlayerPictureInput, playerArray, editedPlayerIndex) => {
    let originalPlayerPicture = playerArray[editedPlayerIndex].image;
    if (editDataURL) {
        playerArray.splice(editedPlayerIndex, 1, {
            image: editDataURL,
            player: editPlayerHandleInput.value,
            wins: editPlayerWinInput.value,
            losses: editPlayerLossInput.value,
            winPercentage: percentage(editPlayerWinInput, editPlayerLossInput)
        });
    } else {
        playerArray.splice(editedPlayerIndex, 1, {
            image: originalPlayerPicture,
            player: editPlayerHandleInput.value,
            wins: editPlayerWinInput.value,
            losses: editPlayerLossInput.value,
            winPercentage: percentage(editPlayerWinInput, editPlayerLossInput)
        });
    };
    clearField(event, editPlayerHandleInput);
    clearField(event, editPlayerWinInput);
    clearField(event, editPlayerLossInput);
    clearField(event, editPlayerPictureInput);
    document.getElementById("entryForm").style.display = "block";
    document.getElementById("editForm").style.display = "none";
    editDataURL = null;
};

const printList = () => {
    listOfPlayers = "";
    playerArray.forEach((objInArray, i) => {
        listOfPlayers += `
        <li class="listOfPlayers" id="player-index-${i}">
        <div class="imageHolder">
        <img class="playerImages" src="${objInArray.image}">
        </div>
        <div class="cardTextHolder">
            <div class="cardTitleBar">
                <div class="cardTitle">
                    <font size="+3">${objInArray.player}</font>
                </div>
                <div class="cardButtons">
                    <input type="image" class="iconButton" 
                    src="./media/editicon.png" 
                    onclick="revealEditForm(${i}, '${objInArray.player}', '${objInArray.wins}', '${objInArray.losses}', '${objInArray.image}')"
                    >
                    <input type="image" class="iconButton" 
                    src="./media/removeicon.png" 
                    onclick="removePlayer(${i})"
                    >
                </div>
            </div>
            <div class="cardStats">
                <div class="cardWLRatio">
                    <font size="+5"><strong>${objInArray.winPercentage}%</strong></font>
                </div>
                <div class="cardWAndL">
                    ${objInArray.wins} Win/s<br>
                    ${objInArray.losses} Loss/es
                </div>
            </div>
        </div>
        </li>
        `;
    });
    document.getElementById("playerTable").innerHTML = listOfPlayers;
    localStorage.setItem('playerArrayKey',JSON.stringify(playerArray));
};

const cancelEdit = (cancelEditIndex) => {
    document.getElementById("entryForm").style.display = "block";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("player-index-"+cancelEditIndex).style.backgroundColor = "white";

};