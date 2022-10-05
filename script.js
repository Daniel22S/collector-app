let playerArray = JSON.parse(localStorage.getItem('playerArrayKey')) || [];

function addPlayer(playerHandleInput, playerWinInput, playerLossInput, playerPictureInput, errorPrintLocationID) {
    //First need to set up the constants and basic formatting required later on
    changeColor(playerHandleInput, "white");
    changeColor(playerWinInput, "white");
    changeColor(playerLossInput, "white");
    document.getElementById(playerHandleInput.id + "Error").innerHTML = "";
    document.getElementById(playerWinInput.id + "Error").innerHTML = "";
    document.getElementById(playerLossInput.id + "Error").innerHTML = "";
    document.getElementById(errorPrintLocationID).style.display = "none"
    document.getElementById(errorPrintLocationID).innerHTML = "";

    //Then check that the boxes are not null (requires a subfunction)
    if (isNull(playerHandleInput, playerWinInput, playerLossInput, errorPrintLocationID)) {
        return false;
    };

    //Then need to do validation on the form (require a subfunction)
    if (!validationSuite(playerHandleInput, playerWinInput, playerLossInput, false)) {
        return false;
    };

    //Then need to add the player details to an array as an object (further subfunction)
    // + calculate the win/loss percentage and give that as a fourth key/value in the object
    addPlayerToArray(playerHandleInput, playerWinInput, playerLossInput, playerPictureInput, playerArray);
    //Finally need to list the array into the unordered list with id="playerTable"
    printList();

    //Then return true idk
};

const removePlayer = (removePlayerIndex) => {
    playerArray.splice(removePlayerIndex, 1);
    printList();
};

const clearPlayers = () => {
    playerArray = [];
    printList();
};


const editPlayer = (playerHandleInput, playerWinInput, playerLossInput, playerPictureInput, errorPrintLocationID, editedPlayerIndex) => {
    changeColor(playerHandleInput, "white");
    changeColor(playerWinInput, "white");
    changeColor(playerLossInput, "white");
    document.getElementById(playerHandleInput.id + "Error").innerHTML = "";
    document.getElementById(playerWinInput.id + "Error").innerHTML = "";
    document.getElementById(playerLossInput.id + "Error").innerHTML = "";
    document.getElementById(errorPrintLocationID).style.display = "none"
    document.getElementById(errorPrintLocationID).innerHTML = "";

    if (isNull(playerHandleInput, playerWinInput, playerLossInput, errorPrintLocationID)) {
        return false;
    };

    if (!validationSuite(playerHandleInput, playerWinInput, playerLossInput, true)) {
        return false;
    };

    editPlayerInArray(playerHandleInput, playerWinInput, playerLossInput, playerPictureInput, playerArray, editedPlayerIndex);
    //Finally need to list the array into the unordered list with id="playerTable"
    printList();
};

const revealEditForm = (revealEditFormIndex, playerHandle, playerWins, playerLosses, playerImage) => {
    document.getElementById("entryForm").style.display = "none";
    document.getElementById("editForm").style.display = "block";
    let editFormHTML = "";
    editFormHTML += `
        <h2>Edit Player<br><font size="+3">${playerHandle}</font></h2>
        <div class="imageHolder">
            <img class="playerImages" src="${playerImage}">
        </div>
        <p class="errorList" id="editNullErrorPrint"></p>
        <label for="editPlayerHandleInput">Player Handle</label><br>
        <input type="text name="editPlayerHandleInput" id="editPlayerHandleInput" 
            maxlength="20" value="${playerHandle}">
        <p class="errorList" id="editPlayerHandleInputError"></p><br>
        <label for="editPlayerWinInput">Player Wins</label><br>
        <input type="text" name="editPlayerWinInput" id="editPlayerWinInput"
            maxlength="10" value="${playerWins}">
        <p class="errorList" id="editPlayerWinInputError"></p><br>
        <label for="editPlayerLossInput">Player Losses</label><br>
        <input type="text" name="editPlayerLossInput" id="editPlayerLossInput"
            maxlength="10" value="${playerLosses}">
        <p class="errorList" id="editPlayerLossInputError"></p><br>
        <label for="editPlayerPictureInput">Player Picture</label><br>
        <input type="file" accept=".png, .jpg, .jpeg, .tiff, .svg, .ico"
        name="editPlayerPictureInput" id="editPlayerPictureInput">
        <input type="image" class="iconButton" src="./media/removeimageicon.png"
            onclick="clearField(event, editPlayerPictureInput)"><br><br>
        <input
            type="button"
            value="Confirm Edit"
            name="editPlayerButton"
            id="button-edit"
            onclick="editPlayer(editPlayerHandleInput, editPlayerWinInput, 
                editPlayerLossInput, editPlayerPictureInput, 'editNullErrorPrint', 
                ${revealEditFormIndex})">
        <input
            type="button"
            value="Cancel Edit"
            name="cancelEditPlayer"
            id="button-edit-cancel"
            onclick="cancelEdit()">
    `;
    document.getElementById("editForm").innerHTML = editFormHTML;
    const editPictureInput = document.getElementById('editPlayerPictureInput');
    editPictureInput.onchange = () => {
        editReader.readAsDataURL(editPictureInput.files[0]);
    };
};