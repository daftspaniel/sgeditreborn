function clearScreen() {

    let newMode = getById('screen-mode').value
    state.initMode(newMode)

    if (getById('cls-option-basic').checked) {
        let requestedValue = getById('cls').value
        state.screen.reset_data(requestedValue)
    }
    else if (getById('cls-option-byte').checked) {
        let requestedValue = getById('cls-byte').value
        state.screen.reset_data(intToHex(requestedValue))
    }
    else if (getById('cls-test-card').checked) {
        state.screen.set_testcard()
    }
    main(state)
    updateEditorWithData()
    hideById('clear-dialog')
}

function startExport() {
    showById('export-dialog')
    getById('screen-export').value = state.screen.export_csv()
}