function clearScreen() {
    if (getById('cls-option-basic').checked) {
        let requestedValue = getById('cls').value
        state.screen.reset_data(requestedValue)
        return
    }

    state.screen.reset_data('89')
    hideById('clear-dialog')
}