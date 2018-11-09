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
    changeExportType('1')
}

function changeExportType(type) {
    let textBox = getById('screen-export')
    type = parseInt(type)
    hideById('import-button')
    if (type === 1) {
        textBox.value = state.screen.export_csv()
        showById('import-button')
    } else if (type === 2) {
        textBox.value = state.screen.export_basic()
    } else if (type === 3) {
        textBox.value = state.screen.export_assembly()
    }
    else (alert(type))
}

function importCsvData() {
    state.screen.import_csv(getById('screen-export').value);
    updateEditorWithData()
}