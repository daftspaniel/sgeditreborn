function clearScreen() {
    console.log('CLEAR SCREEN')
    if (getById('cls-option-basic').checked) {
        let requestedValue = getById('cls').value
        state.screen.reset_data(requestedValue)
        //return
        updateEditorWithData()
    }
    else if (getById('cls-option-byte').checked) {
        let requestedValue = getById('cls-byte').value
        state.screen.reset_data(intToHex(requestedValue))
        //return
        updateEditorWithData()
    }

    //state.screen.reset_data('89')
    hideById('clear-dialog')
}